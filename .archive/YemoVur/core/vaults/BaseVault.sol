// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {Ownable, Initializable, AdminAble, Pausable} from "../abilities.sol"; // MngdC kontratının yolu doğru olmalıdır.

contract BaseVault is Ownable, Pausable, AdminAble {
    mapping(address => uint256) private etherBalances;
    mapping(address => mapping(address => uint256)) private tokenBalances;

    event Deposit(address indexed token, uint256 amount);
    event Withdrawal(address indexed token, uint256 amount);

    // Deposit ETH
    function depositEther() public payable whenNotPaused {
        require(msg.value > 0, "Deposit amount must be greater than zero");
        etherBalances[msg.sender] += msg.value;
        emit Deposit(address(0), msg.value);
    }

    // Withdraw ETH
    function withdrawEther(uint256 amount) public whenNotPaused {
        require(amount <= etherBalances[msg.sender], "Insufficient balance");
        etherBalances[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
        emit Withdrawal(address(0), amount);
    }

    // Deposit ERC20 Tokens
    function depositToken(
        address token,
        uint256 amount
    ) external whenNotPaused {
        require(amount > 0, "Deposit amount must be greater than zero");
        require(
            IERC20(token).transferFrom(msg.sender, address(this), amount),
            "Transfer failed"
        );
        tokenBalances[token][msg.sender] += amount;
        emit Deposit(token, amount);
    }

    // Withdraw ERC20 Tokens
    function withdrawToken(
        address token,
        uint256 amount
    ) external whenNotPaused {
        require(
            amount <= tokenBalances[token][msg.sender],
            "Insufficient balance"
        );
        require(IERC20(token).transfer(msg.sender, amount), "Transfer failed");
        tokenBalances[token][msg.sender] -= amount;
        emit Withdrawal(token, amount);
    }

    // Get the balance of ETH for the caller
    function getEtherBalance() external view returns (uint256) {
        return etherBalances[msg.sender];
    }

    // Get the balance of ERC20 Tokens for the caller
    function getTokenBalance(address token) external view returns (uint256) {
        return tokenBalances[token][msg.sender];
    }
}
