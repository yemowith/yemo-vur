// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract ERC20FlashLender {
    IERC20 public token;
    uint256 public feeRate = 10; // Örneğin, 0.1% fee (10 bps)

    event LoanProvided(address borrower, uint256 amount);
    event LoanRepaid(address borrower, uint256 amount, uint256 fee);

    constructor(IERC20 _token) {
        token = _token;
    }

    // Flash loan almak için fonksiyon
    function flashBorrow(uint256 amount) external {
        uint256 initialBalance = token.balanceOf(address(this));
        require(amount > 0, "Amount must be greater than zero");
        require(
            initialBalance >= amount,
            "Insufficient token balance in lender"
        );

        // Borrower'a token transferi
        require(token.transfer(msg.sender, amount), "Token transfer failed");

        // Borrower'dan callback bekleniyor
        bytes memory data = abi.encodeWithSignature(
            "onFlashLoan(uint256)",
            amount
        );
        (bool success, ) = msg.sender.call(data);
        require(success, "Callback failed");

        // Geri ödeme kontrolü
        uint256 finalBalance = token.balanceOf(address(this));
        uint256 fee = (amount * feeRate) / 10000; // feeRate bps cinsinden
        require(
            finalBalance >= initialBalance + fee,
            "Flash loan not paid back properly"
        );

        emit LoanProvided(msg.sender, amount);
        emit LoanRepaid(msg.sender, amount, fee);
    }
}
