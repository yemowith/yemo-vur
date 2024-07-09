// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./base/ERC20SwapperVault.sol";

contract SimpleSwapper is Ownable {
    ERC20Vault public vault;
    uint256 public exchangeRate; // Exchange rate from baseToken to quoteToken (e.g., 1 baseToken = X quoteToken)

    event Swapped(
        address indexed user,
        address indexed fromToken,
        address indexed toToken,
        uint256 amount
    );

    constructor(address _vault, uint256 _exchangeRate) Ownable(msg.sender) {
        require(_vault != address(0), "Invalid vault address");
        require(_exchangeRate > 0, "Invalid exchange rate");
        vault = ERC20Vault(_vault);
        exchangeRate = _exchangeRate;
    }

    function swapBaseToQuote(uint256 amount) external {
        require(amount > 0, "Amount must be greater than 0");
        require(
            vault.getDeposit(address(vault.baseToken()), msg.sender) >= amount,
            "Insufficient balance in vault"
        );

        // Calculate the amount of quote tokens to receive based on the exchange rate
        uint256 amountToReceive = (amount * exchangeRate) / 1e18;

        // Withdraw the base token from the user's vault balance
        vault.withdraw(address(vault.baseToken()), amount);
        // Deposit the quote token into the user's vault balance
        vault.deposit(address(vault.quoteToken()), amountToReceive);

        emit Swapped(
            msg.sender,
            address(vault.baseToken()),
            address(vault.quoteToken()),
            amount
        );
    }

    function swapQuoteToBase(uint256 amount) external {
        require(amount > 0, "Amount must be greater than 0");
        require(
            vault.getDeposit(address(vault.quoteToken()), msg.sender) >= amount,
            "Insufficient balance in vault"
        );

        // Calculate the amount of base tokens to receive based on the exchange rate
        uint256 amountToReceive = (amount * 1e18) / exchangeRate;

        // Withdraw the quote token from the user's vault balance
        vault.withdraw(address(vault.quoteToken()), amount);
        // Deposit the base token into the user's vault balance
        vault.deposit(address(vault.baseToken()), amountToReceive);

        emit Swapped(
            msg.sender,
            address(vault.quoteToken()),
            address(vault.baseToken()),
            amount
        );
    }

    function setExchangeRate(uint256 _exchangeRate) external onlyOwner {
        require(_exchangeRate > 0, "Invalid exchange rate");
        exchangeRate = _exchangeRate;
    }
}
