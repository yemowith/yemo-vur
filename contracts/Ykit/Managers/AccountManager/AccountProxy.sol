// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

import "@openzeppelin/contracts/access/Ownable.sol";

contract AccountProxy is Ownable {
    address public implementation;

    constructor() Ownable(payable(msg.sender)) {}

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

    receive() external payable {}

    function setImplementation(address _implementation) external onlyOwner {
        implementation = _implementation;
    }

    function executeStatic(
        address target,
        bytes calldata data
    ) external view returns (bool, bytes memory) {
        (bool success, bytes memory result) = target.staticcall(data);
        return (success, result);
    }

    function execute(
        address target,
        bytes calldata data
    ) external returns (bool, bytes memory) {
        (bool success, bytes memory result) = target.call(data);
        return (success, result);
    }
}
