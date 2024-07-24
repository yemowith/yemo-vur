// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract MultiCallBuilder {
    struct Call {
        address target;
        bytes callData;
    }

    struct CallResult {
        bool success;
        bytes data;
    }

    function multiCall(
        Call[] memory calls
    ) public returns (CallResult[] memory) {
        CallResult[] memory results = new CallResult[](calls.length);
        for (uint256 i = 0; i < calls.length; i++) {
            (bool success, bytes memory data) = calls[i].target.call(
                calls[i].callData
            );
            results[i] = CallResult(success, data);
        }
        return results;
    }

    function encodeDeposit(
        address vault,
        uint256 amount
    ) public pure returns (Call memory) {
        return
            Call({
                target: vault,
                callData: abi.encodeWithSignature("deposit(uint256)", amount)
            });
    }

    function encodeWithdraw(
        address vault,
        uint256 amount
    ) public pure returns (Call memory) {
        return
            Call({
                target: vault,
                callData: abi.encodeWithSignature("withdraw(uint256)", amount)
            });
    }

    function encodeDepositAll(address vault) public pure returns (Call memory) {
        return
            Call({
                target: vault,
                callData: abi.encodeWithSignature("depositAll()")
            });
    }

    function encodeWithdrawAll(
        address vault
    ) public pure returns (Call memory) {
        return
            Call({
                target: vault,
                callData: abi.encodeWithSignature("withdrawAll()")
            });
    }

    function encodeSwapIn(
        address vault,
        uint256 amountIn,
        uint256 amountOutMin,
        uint24 fee
    ) public pure returns (Call memory) {
        return
            Call({
                target: vault,
                callData: abi.encodeWithSignature(
                    "swapIn(uint256,uint256,uint24)",
                    amountIn,
                    amountOutMin,
                    fee
                )
            });
    }

    function encodeSwapOut(
        address vault,
        uint256 amountOutDesired,
        uint256 amountInMax,
        uint24 fee
    ) public pure returns (Call memory) {
        return
            Call({
                target: vault,
                callData: abi.encodeWithSignature(
                    "swapOut(uint256,uint256,uint24)",
                    amountOutDesired,
                    amountInMax,
                    fee
                )
            });
    }

    function encodeDepositAndSwapIn(
        address vault,
        uint256 amountOutMin,
        uint24 fee
    ) public pure returns (Call memory) {
        return
            Call({
                target: vault,
                callData: abi.encodeWithSignature(
                    "depositAndSwapIn(uint256,uint24)",
                    amountOutMin,
                    fee
                )
            });
    }

    function encodeWithdrawAndSwapOut(
        address vault,
        uint256 amountOutDesired,
        uint24 fee
    ) public pure returns (Call memory) {
        return
            Call({
                target: vault,
                callData: abi.encodeWithSignature(
                    "withdrawAndSwapOut(uint256,uint24)",
                    amountOutDesired,
                    fee
                )
            });
    }

    function encodeExecuteFlashLoan(
        address flashLoanContract,
        address asset,
        uint256 amount,
        address target,
        bytes memory data
    ) public pure returns (Call memory) {
        bytes memory afterLoanCalling = abi.encode(target, data);
        return
            Call({
                target: flashLoanContract,
                callData: abi.encodeWithSignature(
                    "executeFlashLoan(address,uint256,address,bytes)",
                    asset,
                    amount,
                    target,
                    afterLoanCalling
                )
            });
    }
}
