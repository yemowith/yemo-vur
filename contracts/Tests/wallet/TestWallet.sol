// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.3;

import "@openzeppelin/contracts/access/Ownable.sol";

contract TestWallet is Ownable {
    address public module;
    mapping(address => bool) public authorised;

    event Executed(address indexed target, uint indexed value, bytes data);
    event ModuleChanged(address indexed oldModule, address indexed newModule);
    event AuthorisedModule(address indexed module, bool authorised);

    constructor() Ownable(msg.sender) {}

    fallback() external payable {
        require(module != address(0), "Module not set");
        (bool success, bytes memory returnData) = module.delegatecall(msg.data);
        require(success, "Transaction failed");
        emit Executed(module, msg.value, msg.data);
    }

    receive() external payable {
        emit Executed(msg.sender, msg.value, "");
    }

    function setModule(address _module) external onlyOwner {
        address oldModule = module;
        module = _module;
        emit ModuleChanged(oldModule, _module);
    }

    function authoriseModule(address _module, bool _value) external onlyOwner {
        authorised[_module] = _value;
        emit AuthorisedModule(_module, _value);
    }

    function execute(
        address target,
        uint256 value,
        bytes calldata data
    ) external returns (bytes memory) {
        require(authorised[msg.sender], "Not authorised");
        (bool success, bytes memory result) = target.call{value: value}(data);
        require(success, "Transaction failed");
        emit Executed(target, value, data);
        return result;
    }
}
