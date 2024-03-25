// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "./MDLR.sol";

interface IERC20 {
    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);
    function transfer(
        address recipient,
        uint256 amount
    ) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

contract LNDC {
    address public owner;
    // Kullanıcıların her bir token için bakiyeleri. ETH için adres olarak address(0) kullanılır.
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

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(
            msg.sender == owner,
            "Only contract owner can call this function"
        );
        _;
    }

    function deposit(address token, uint256 amount) external {
        require(amount > 0, "Deposit amount must be greater than zero");
        require(
            IERC20(token).transferFrom(msg.sender, address(this), amount),
            "Transfer failed"
        );
        balances[msg.sender][token] += amount;
        emit Deposit(msg.sender, token, amount);
    }

    // ETH yatırma işlevselliği için yeni bir payable fonksiyon.
    function depositETH() external payable {
        require(msg.value > 0, "Deposit amount must be greater than zero");
        balances[msg.sender][address(0)] += msg.value; // ETH için adres olarak address(0) kullanılır.
        emit Deposit(msg.sender, address(0), msg.value);
    }

    function withdraw(address token, uint256 amount) external {
        require(
            amount > 0 && amount <= balances[msg.sender][token],
            "Invalid withdrawal amount"
        );
        if (token == address(0)) {
            // ETH çekme işlemi.
            payable(msg.sender).transfer(amount);
        } else {
            // ERC-20 token çekme işlemi.
            require(
                IERC20(token).transfer(msg.sender, amount),
                "Transfer failed"
            );
        }
        balances[msg.sender][token] -= amount;
        emit Withdrawal(msg.sender, token, amount);
    }

    function transfer(address token, address to, uint256 amount) external {
        require(to != address(0), "Invalid recipient address");
        require(
            amount > 0 && amount <= balances[msg.sender][token],
            "Invalid transfer amount"
        );
        balances[msg.sender][token] -= amount;
        balances[to][token] += amount;
        emit Transfer(msg.sender, to, token, amount);
    }

    function getBalance(
        address user,
        address token
    ) external view returns (uint256) {
        return balances[user][token];
    }

    function withdrawFunds(address token, uint256 amount) external onlyOwner {
        require(
            amount <=
                (
                    token == address(0)
                        ? address(this).balance
                        : IERC20(token).balanceOf(address(this))
                ),
            "Insufficient balance"
        );
        if (token == address(0)) {
            // ETH çekme işlemi.
            payable(owner).transfer(amount);
        } else {
            // ERC-20 token çekme işlemi.
            require(IERC20(token).transfer(owner, amount), "Transfer failed");
        }
    }

    receive() external payable {
        require(msg.value > 0, "Deposit amount must be greater than zero");
        balances[msg.sender][address(0)] += msg.value; // ETH için adres olarak address(0) kullanılır.
        emit Deposit(msg.sender, address(0), msg.value);
    }
}
