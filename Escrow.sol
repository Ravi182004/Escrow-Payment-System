
 // SPDX-License-Identifier: MIT
 pragma solidity ^0.8.20;

 contract Escrow {
     address public immutable buyer;
     address payable public immutable seller;

     uint256 public immutable deadline;
     uint256 public amount;

     bool public deposited;
     bool public completed;
     bool public refunded;

     event Deposited(address indexed buyer, uint256 amount);
     event Released(address indexed seller, uint256 amount);
     event Refunded(address indexed buyer, uint256 amount);

     constructor(
         address payable _seller,
         uint256 _durationInMinutes
     ) {
         require(_seller != address(0), "Invalid seller");
         require(_seller != msg.sender, "Buyer cannot be seller");
         require(_durationInMinutes > 0, "Duration must be positive");

         buyer = msg.sender;
         seller = _seller;
         deadline = block.timestamp + (_durationInMinutes * 1 minutes);
     }

     modifier onlyBuyer() {
         require(msg.sender == buyer, "Only buyer allowed");
         _;
     }

     function deposit() external payable onlyBuyer {
         require(!deposited, "Already deposited");
         require(!completed && !refunded, "Escrow closed");
         require(block.timestamp < deadline, "Deadline passed");
         require(msg.value > 0, "Deposit must be positive");

         amount = msg.value;
         deposited = true;

         emit Deposited(msg.sender, msg.value);
     }

     function releaseFunds() external onlyBuyer {
         require(deposited, "No deposit");
         require(!completed && !refunded, "Escrow closed");

         completed = true;

         uint256 payment = amount;
         (bool success, ) = seller.call{value: payment}("");
         require(success, "Payment failed");

         emit Released(seller, payment);
     }

     function refundBuyer() external onlyBuyer {
         require(deposited, "No deposit");
         require(!completed && !refunded, "Escrow closed");
         require(block.timestamp >= deadline, "Deadline not passed");

         refunded = true;

         uint256 payment = amount;
         (bool success, ) = payable(buyer).call{value: payment}("");
         require(success, "Refund failed");

         emit Refunded(buyer, payment);
     }

     function getBalance() external view returns (uint256) {
         return address(this).balance;
     }
 }
