// SPDX-License-Identifier: agpl-3.0
pragma solidity ^0.8.10;

import "@aave/core-v3/contracts/flashloan/base/FlashLoanSimpleReceiverBase.sol";
import "@aave/core-v3/contracts/interfaces/IPoolAddressesProvider.sol";
import "@aave/core-v3/contracts/dependencies/openzeppelin/contracts/IERC20.sol";

contract MintFlashLoan is FlashLoanSimpleReceiverBase {
    constructor(
        address _addressProvider
    ) FlashLoanSimpleReceiverBase(IPoolAddressesProvider(_addressProvider)) {}

    function executeOperation(
        address asset,
        uint256 amount,
        uint256 premium,
        address initiator,
        bytes calldata params
    ) external override returns (bool) {
        // Logic go here.

        // Decode the params and perform the custom logic
        (address target, bytes memory data) = abi.decode(
            params,
            (address, bytes)
        );
        (bool success, ) = target.call(data);
        require(success, "External call failed");

        // Approve the LendingPool contract allowance to *pull* the owed amount
        uint256 amountOwed = amount + premium;
        IERC20(asset).approve(address(POOL), amountOwed);

        return true;
    }

    function executeFlashLoan(
        address asset,
        uint256 amount,
        address target,
        bytes memory data
    ) public {
        address receiverAddress = address(this);

        // Encode the target and data into params
        bytes memory params = abi.encode(target, data);
        uint16 referralCode = 0;

        POOL.flashLoanSimple(
            receiverAddress,
            asset,
            amount,
            params,
            referralCode
        );
    }

    function getBalance(address _tokenAddress) external view returns (uint256) {
        return IERC20(_tokenAddress).balanceOf(address(this));
    }
}
