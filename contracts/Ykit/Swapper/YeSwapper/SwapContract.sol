// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./base/ERC20SwapVault.sol"; // Assuming the vault contract is in the same directory

contract SwapContract is Ownable {
    ERC20SwapVault public vault;

    event Deposit(address indexed user, uint256 amount, string tokenType);
    event Withdraw(address indexed user, uint256 amount, string tokenType);
    event Swap(address indexed user, uint256 baseAmount, uint256 quoteAmount);

    constructor(address _vault) Ownable(msg.sender) {
        require(_vault != address(0), "Invalid vault address");
        vault = ERC20SwapVault(_vault);
    }

    function depositBase(uint256 amount) external {
        require(amount > 0, "Amount must be greater than 0");
        IERC20 baseToken = vault.baseToken();
        baseToken.transferFrom(msg.sender, address(this), amount);
        baseToken.approve(address(vault), amount);
        vault.deposit(address(baseToken), amount);
        emit Deposit(msg.sender, amount, "BASE");
    }

    function withdrawBase(uint256 amount) external {
        require(amount > 0, "Amount must be greater than 0");
        IERC20 baseToken = vault.baseToken();
        vault.withdraw(address(baseToken), amount);
        baseToken.transfer(msg.sender, amount);
        emit Withdraw(msg.sender, amount, "BASE");
    }

    function depositQuote(uint256 amount) external {
        require(amount > 0, "Amount must be greater than 0");
        IERC20 quoteToken = vault.quoteToken();
        quoteToken.transferFrom(msg.sender, address(this), amount);
        quoteToken.approve(address(vault), amount);
        vault.deposit(address(quoteToken), amount);
        emit Deposit(msg.sender, amount, "QUOTE");
    }

    function withdrawQuote(uint256 amount) external {
        require(amount > 0, "Amount must be greater than 0");
        IERC20 quoteToken = vault.quoteToken();
        vault.withdraw(address(quoteToken), amount);
        quoteToken.transfer(msg.sender, amount);
        emit Withdraw(msg.sender, amount, "QUOTE");
    }

    function swapBaseToQuote(uint256 baseAmount) external {
        require(baseAmount > 0, "Amount must be greater than 0");

        IERC20 baseToken = vault.baseToken();
        IERC20 quoteToken = vault.quoteToken();
        uint256 quoteAmount = baseAmount; // 1:1 swap rate

        baseToken.transferFrom(msg.sender, address(this), baseAmount);
        baseToken.approve(address(vault), baseAmount);
        vault.deposit(address(baseToken), baseAmount);

        vault.withdraw(address(quoteToken), quoteAmount);
        quoteToken.transfer(msg.sender, quoteAmount);

        emit Swap(msg.sender, baseAmount, quoteAmount);
    }

    function swapQuoteToBase(uint256 quoteAmount) external {
        require(quoteAmount > 0, "Amount must be greater than 0");

        IERC20 baseToken = vault.baseToken();
        IERC20 quoteToken = vault.quoteToken();
        uint256 baseAmount = quoteAmount; // 1:1 swap rate

        quoteToken.transferFrom(msg.sender, address(this), quoteAmount);
        quoteToken.approve(address(vault), quoteAmount);
        vault.deposit(address(quoteToken), quoteAmount);

        vault.withdraw(address(baseToken), baseAmount);
        baseToken.transfer(msg.sender, baseAmount);

        emit Swap(msg.sender, quoteAmount, baseAmount);
    }
}
