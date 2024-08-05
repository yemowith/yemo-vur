// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ETHFlashLender.sol";

contract ETHFlashBorrower {
    ETHFlashLender public flashLender;

    constructor(ETHFlashLender _flashLender) {
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

        // Borrowed ETH ile bir şeyler yap (başka bir kontratı çağır)
        (bool success, ) = targetContract.call{value: amount}(data);
        require(success, "External call failed");

        // Geri ödeme için işlem ücreti hesaplanır
        uint256 fee = (amount * flashLender.feeRate()) / 10000;
        uint256 totalRepayment = amount + fee;

        // Geri ödeme yapılır
        (bool successRepay, ) = address(flashLender).call{
            value: totalRepayment
        }("");
        require(successRepay, "Repayment transfer failed");
    }

    // Immediate repayment için callback fonksiyonu
    function onFlashLoan(uint256 amount) external payable {
        require(
            msg.sender == address(flashLender),
            "Only flash lender can call this function"
        );

        // Geri ödeme işlemi initiateBorrow fonksiyonunda yapılır
    }

    // Fallback function to accept ether
    receive() external payable {}
}
