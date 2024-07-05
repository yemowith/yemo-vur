// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@aave/core-v3/contracts/flashloan/base/FlashLoanSimpleReceiverBase.sol';
import '@aave/core-v3/contracts/interfaces/IPoolAddressesProvider.sol';
import '@aave/core-v3/contracts/dependencies/openzeppelin/contracts/IERC20.sol';

contract YemoFlash is FlashLoanSimpleReceiverBase {
    address payable owner;

    constructor(
        address _addressProvider
    ) FlashLoanSimpleReceiverBase(IPoolAddressesProvider(_addressProvider)) {}

    function fn_RequestFlashLoan(
        address _token,
        uint256 _amount,
        address _target,
        bytes memory _data
    ) public {
        address receiverAddress = address(this);
        address asset = _token;
        uint256 amount = _amount;
        uint16 referralCode = 0;

        bytes memory params = abi.encode(_target, _data);

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
        uint256 totalAmount = amount + premium;
        if (
            IERC20(asset).allowance(address(this), address(POOL)) < totalAmount
        ) {
            IERC20(asset).approve(address(POOL), totalAmount);
        }

        return true;
    }

    receive() external payable {}

    function invoker(
        address _token,
        uint256 _amount,
        address _target,
        bytes memory _data
    ) public pure returns (bytes memory) {
        return
            abi.encodeWithSignature(
                'fn_RequestFlashLoan(address,uint256,address,bytes)',
                _token,
                _amount,
                _target,
                _data
            );
    }
}
