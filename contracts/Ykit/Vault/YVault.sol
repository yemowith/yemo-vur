// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SimpleVault is Ownable {
    IERC20 public asset;
    mapping(address => uint256) public deposits;
    mapping(address => uint256) public borrows;

    event Deposit(address indexed user, uint256 amount);
    event Withdraw(address indexed user, uint256 amount);
    event Borrow(address indexed user, uint256 amount);
    event Redeem(address indexed user, uint256 amount);

    constructor(address _asset) Ownable(msg.sender) {
        require(_asset != address(0), "Invalid asset address");
        asset = IERC20(_asset);
    }

    function deposit(uint256 amount) external {
        require(amount > 0, "Amount must be greater than 0");
        require(
            asset.transferFrom(msg.sender, address(this), amount),
            "Transfer failed"
        );

        deposits[msg.sender] += amount;
        emit Deposit(msg.sender, amount);
    }

    function withdraw(uint256 amount) external {
        require(amount > 0, "Amount must be greater than 0");
        require(deposits[msg.sender] >= amount, "Insufficient balance");

        deposits[msg.sender] -= amount;
        require(asset.transfer(msg.sender, amount), "Transfer failed");

        emit Withdraw(msg.sender, amount);
    }

    function borrow(uint256 amount) external {
        require(amount > 0, "Amount must be greater than 0");
        // Add your collateralization checks and logic here

        borrows[msg.sender] += amount;
        require(asset.transfer(msg.sender, amount), "Transfer failed");

        emit Borrow(msg.sender, amount);
    }

    function redeem(uint256 amount) external {
        require(amount > 0, "Amount must be greater than 0");
        require(borrows[msg.sender] >= amount, "Insufficient borrowed balance");

        borrows[msg.sender] -= amount;
        require(
            asset.transferFrom(msg.sender, address(this), amount),
            "Transfer failed"
        );

        emit Redeem(msg.sender, amount);
    }
}
