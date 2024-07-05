// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Relay {
    address public owner;
    address public target;

    modifier onlyOwner() {
        require(msg.sender == owner, 'Only owner can call this function.');
        _;
    }

    constructor(address _target) {
        owner = msg.sender;
        target = _target;
    }

    function updateTarget(address _newTarget) public onlyOwner {
        target = _newTarget;
    }

    fallback() external payable {
        // Delegate all calls to target
        _delegate(target);
    }

    function _delegate(address _target) internal {
        assembly {
            // Copy msg.data. We take full control of memory in this inline assembly
            // block because it will not return to Solidity code. We overwrite the
            // Solidity scratch pad at memory position 0.
            calldatacopy(0, 0, calldatasize())

            // Call the target with all gas and provided input.
            let result := delegatecall(gas(), _target, 0, calldatasize(), 0, 0)

            // Copy the returned data.
            returndatacopy(0, 0, returndatasize())

            switch result
            // delegatecall returns 0 on error.
            case 0 {
                revert(0, returndatasize())
            }
            default {
                return(0, returndatasize())
            }
        }
    }

    receive() external payable {
        // Custom function to receive ETH and call fallback function
    }
}
