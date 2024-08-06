// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ERC20FlashLender.sol";

contract ERC20FlashBorrower {
    ERC20FlashLender public flashLender;

    constructor(ERC20FlashLender _flashLender) {
        flashLender = _flashLender;
    }

    // Dinamik miktarda flash loan almak için çağrılan fonksiyon
    function initiateBorrow(
        uint256 amount,
        address targetContract,
        bytes calldata data
    ) external {
        // Flash loan'u başlat
        flashLender.flashBorrow(amount);

        // Borrowed token ile bir şeyler yap (başka bir kontratı çağır)
        (bool success, ) = targetContract.call(data);
        require(success, "External call failed");

        // Geri ödeme için işlem ücreti hesaplanır
        uint256 fee = (amount * flashLender.feeRate()) / 10000;
        uint256 totalRepayment = amount + fee;

        // Geri ödeme yapılır
        require(
            flashLender.token().transfer(address(flashLender), totalRepayment),
            "Repayment transfer failed"
        );
    }

    // Immediate repayment için callback fonksiyonu
    function onFlashLoan(uint256 amount) external {
        require(
            msg.sender == address(flashLender),
            "Only flash lender can call this function"
        );

        // Geri ödeme işlemi initiateBorrow fonksiyonunda yapılır
    }
}
