// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "./Able.sol";

contract YProxy is ownbl, Pausable {
    address public implementation;

    event Received(uint indexed value, address indexed sender, bytes data);

    constructor(address _owner) {
        ownr = payable(_owner);
    }

    fallback() external payable whenNotPaused {
        address target = implementation;
        require(target != address(0), "Implementation not setted");
        assembly {
            calldatacopy(0, 0, calldatasize())
            let result := delegatecall(gas(), target, 0, calldatasize(), 0, 0)
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

    function setImplementation(address _implementation) external onlOwnr {
        implementation = _implementation;
    }
}
