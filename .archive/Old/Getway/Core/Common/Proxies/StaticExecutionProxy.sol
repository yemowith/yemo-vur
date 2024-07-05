// SPDX-License-Identifier: GPL-3.0-only
pragma solidity ^0.8.3;

/**
 * @title Static Execution Proxy
 * @notice Proxy that delegates all calls to a fixed implementing contract using staticcall.
 * This proxy is strictly for view and pure functions, as it does not allow state modifications.
 */
contract StaticExecutionProxy {
    address public immutable implementation;

    event Received(uint indexed value, address indexed sender, bytes data);

    constructor(address _implementation) {
        implementation = _implementation;
    }

    fallback() external payable {
        address target = implementation;
        assembly {
            calldatacopy(0, 0, calldatasize())
            let result := staticcall(gas(), target, 0, calldatasize(), 0, 0)
            returndatacopy(0, 0, returndatasize())
            switch result
            case 0 {
                revert(0, returndatasize())
            }
            default {
                return(0, returndatasize())
            }
        }
    }

    receive() external payable {
        emit Received(msg.value, msg.sender, "");
    }
}
