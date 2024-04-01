// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@aave/core-v3/contracts/flashloan/base/FlashLoanSimpleReceiverBase.sol";
import "@aave/core-v3/contracts/interfaces/IPoolAddressesProvider.sol";
import "@aave/core-v3/contracts/dependencies/openzeppelin/contracts/IERC20.sol";

contract SimpleFlashLoan is FlashLoanSimpleReceiverBase {
    address payable owner;
    address public ap = 0xa97684ead0e402dC232d5A977953DF7ECBaB3CDb;

    constructor() FlashLoanSimpleReceiverBase(IPoolAddressesProvider(ap)) {}

    function fn_RequestFlashLoan(address _token, uint256 _amount) public {
        address receiverAddress = address(this);
        address asset = _token;
        uint256 amount = _amount;
        bytes memory params = "";
        uint16 referralCode = 0;

        POOL.flashLoanSimple(
            receiverAddress,
            asset,
            amount,
            params,
            referralCode
        );
    }

    //This function is called after your contract has received the flash loaned amount

    function executeOperation(
        address asset,
        uint256 amount,
        uint256 premium,
        address initiator,
        bytes calldata params
    ) external override returns (bool) {
        //Logic goes here

        uint256 totalAmount = amount + premium;
        IERC20(asset).approve(address(POOL), totalAmount);

        return true;
    }

    receive() external payable {}
}
