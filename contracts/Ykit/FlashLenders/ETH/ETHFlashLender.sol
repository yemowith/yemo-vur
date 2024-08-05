// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ETHFlashLender {
    receive() external payable {}

    uint256 public feeRate = 10; // Örneğin, 0.1% fee (10 bps)

    event LoanProvided(address borrower, uint256 amount);
    event LoanRepaid(address borrower, uint256 amount, uint256 fee);

    // Flash loan almak için fonksiyon
    function flashBorrow(uint256 amount) external {
        require(amount > 0, "Amount must be greater than zero");
        require(
            address(this).balance >= amount,
            "Insufficient ETH balance in lender"
        );

        uint256 initialBalance = address(this).balance;

        // Borrower'a ETH transferi
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "ETH transfer failed");

        // Borrower'dan callback bekleniyor
        bytes memory data = abi.encodeWithSignature(
            "onFlashLoan(uint256)",
            amount
        );
        (success, ) = msg.sender.call(data);
        require(success, "Callback failed");

        // Geri ödeme kontrolü
        uint256 finalBalance = address(this).balance;
        uint256 fee = (amount * feeRate) / 10000; // feeRate bps cinsinden
        require(
            finalBalance >= initialBalance + fee,
            "Flash loan not paid back properly"
        );

        emit LoanProvided(msg.sender, amount);
        emit LoanRepaid(msg.sender, amount, fee);
    }
}
