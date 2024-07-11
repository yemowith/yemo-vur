// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@aave/core-v3/contracts/flashloan/base/FlashLoanSimpleReceiverBase.sol";
import "@aave/core-v3/contracts/interfaces/IPoolAddressesProvider.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract FlashLoanContract is FlashLoanSimpleReceiverBase {
    address payable owner;
    bytes public callbackData; // Declare callbackData at the contract level

    event FlashLoanInitiated(address indexed token, uint256 amount);

    constructor(
        address _addressProvider
    ) FlashLoanSimpleReceiverBase(IPoolAddressesProvider(_addressProvider)) {
        owner = payable(msg.sender);
    }

    receive() external payable {}

    function requestFlashLoan(
        address token,
        uint256 amount,
        bytes calldata data
    ) public {
        callbackData = data; // Store the data
        POOL.flashLoanSimple(address(this), token, amount, "", 0);
    }

    function executeOperation(
        address asset,
        uint256 amount,
        uint256 premium,
        address initiator,
        bytes calldata params
    ) external override returns (bool) {
        uint256 totalAmount = amount + premium;

        // Ensure the contract has enough balance to repay the flash loan
        require(
            IERC20(asset).balanceOf(address(this)) >= totalAmount,
            "Insufficient balance to repay flash loan"
        );

        // Approve the Pool contract allowance to pull the owed amount
        IERC20(asset).approve(address(POOL), totalAmount);

        emit FlashLoanInitiated(asset, amount);

        // Call the virtual function to handle logic after flash loan
        _afterFlashLoan(asset, amount, premium, initiator, callbackData); // Convert callbackData to memory

        return true;
    }

    // Virtual function to be overridden by derived contracts
    function _afterFlashLoan(
        address asset,
        uint256 amount,
        uint256 premium,
        address initiator,
        bytes memory params
    ) internal virtual {
        // Logic after flash loan can be added here
    }
}
