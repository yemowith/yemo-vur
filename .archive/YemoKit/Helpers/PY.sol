// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

interface IPY {
    function setImplementation(address _implementation) external;
}

contract PY {
    address public owner;
    address public implementation;

    event Received(uint indexed value, address indexed sender, bytes data);

    modifier onlyOwner() {
        require(msg.sender == owner, "Caller is not the owner");
        _;
    }

    constructor(address _owner) {
        owner = _owner;
    }

    fallback() external payable {
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

    function setImplementation(address _implementation) external onlyOwner {
        implementation = _implementation;
    }
}
