// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {IERC20} from "../interfaces/Interfaces.sol";
import {MngdC} from "../core/modifers/MngdC.sol";

contract BaseVault is MngdC {
    mapping(address => uint256) private etherBalances;
    mapping(address => mapping(address => uint256)) private tokenBalances;
    mapping(address => mapping(address => uint256)) public balances;
    event Deposit(address indexed user, address indexed token, uint256 amount);
    event Withdrawal(
        address indexed user,
        address indexed token,
        uint256 amount
    );
    event Transfer(
        address indexed from,
        address indexed to,
        address indexed token,
        uint256 amount
    );

    function deposit(address token, uint256 amount) external whenNotPaused {
        require(amount > 0, "Deposit amount must be greater than zero");
        require(
            IERC20(token).transferFrom(msg.sender, address(this), amount),
            "Transfer failed"
        );
        balances[msg.sender][token] += amount;
        emit Deposit(msg.sender, token, amount);
    }

    function withdraw(address token, uint256 amount) external whenNotPaused {
        require(
            amount > 0 && amount <= balances[msg.sender][token],
            "Invalid withdrawal amount"
        );
        balances[msg.sender][token] -= amount;
        require(IERC20(token).transfer(msg.sender, amount), "Transfer failed");
        emit Withdrawal(msg.sender, token, amount);
    }

    function transfer(
        address token,
        address to,
        uint256 amount
    ) external whenNotPaused {
        require(to != address(0), "Invalid recipient address");
        require(
            amount > 0 && amount <= balances[msg.sender][token],
            "Invalid transfer amount"
        );
        balances[msg.sender][token] -= amount;
        balances[to][token] += amount;
        emit Transfer(msg.sender, to, token, amount);
    }

    function depositEther() public payable whenNotPaused {
        require(msg.value > 0, "Deposit amount must be greater than zero.");
        etherBalances[msg.sender] += msg.value;
    }

    function withdrawEther(uint256 amount) public whenNotPaused {
        require(amount <= etherBalances[msg.sender], "Insufficient balance.");
        etherBalances[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
    }

    function getBalance(
        address user,
        address token
    ) external view returns (uint256) {
        return balances[user][token];
    }

    function withdrawFunds(address token, uint256 amount) external onlyOwner {
        require(
            amount <= IERC20(token).balanceOf(address(this)),
            "Insufficient contract balance"
        );
        require(IERC20(token).transfer(owner, amount), "Transfer failed");
    }

    receive() external payable {
        depositEther();
    }
}
