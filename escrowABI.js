
export const escrowABI = [
  "function buyer() view returns (address)",
  "function seller() view returns (address)",
  "function deadline() view returns (uint256)",
  "function amount() view returns (uint256)",
  "function deposited() view returns (bool)",
  "function completed() view returns (bool)",
  "function refunded() view returns (bool)",

  "function deposit() payable",
  "function releaseFunds()",
  "function refundBuyer()",

  "function getBalance() view returns (uint256)",

  "event Deposited(address indexed buyer, uint256 amount)",
  "event Released(address indexed seller, uint256 amount)",
  "event Refunded(address indexed buyer, uint256 amount)"
];
