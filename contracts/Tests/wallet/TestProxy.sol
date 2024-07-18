// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract TestProxy is Ownable {
    address public implementation;

    event Received(uint indexed value, address indexed sender, bytes data);

    constructor() Ownable(msg.sender) {}

    fallback() external payable {
        address target = implementation;
        require(target != address(0), "Implementation not set");
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
