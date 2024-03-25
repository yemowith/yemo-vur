// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

interface IMDLR {
    function execute() external;
}

contract MDLR {
    address public admin;
    mapping(string => address) private modules;

    event ModuleRegistered(string moduleName, address moduleAddress);
    event ModuleExecuted(string moduleName);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    function registerModule(
        string memory moduleName,
        address moduleAddress
    ) external onlyAdmin {
        require(modules[moduleName] == address(0), "Module already registered");
        modules[moduleName] = moduleAddress;
        emit ModuleRegistered(moduleName, moduleAddress);
    }

    function executeModule(string memory moduleName) external {
        require(modules[moduleName] != address(0), "Module not registered");
        IMDLR(modules[moduleName]).execute();
        emit ModuleExecuted(moduleName);
    }

    function transferAdmin(address newAdmin) external onlyAdmin {
        admin = newAdmin;
    }
}
