// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract YOperator {
    address public factory;
    address public owner;
    address public YVault;
    address public YEscrowVault;

    modifier onlyOwner() {
        require(msg.sender == owner, "Caller is not the owner");
        _;
    }

    constructor(address _factory) {
        factory = _factory;
        owner = msg.sender;
    }

    function setFactory(address _factory) external onlyOwner {
        require(_factory != address(0), "Factory address cannot be null");
        factory = _factory;
    }

    function setYVault(address _YVault) external onlyOwner {
        require(_YVault != address(0), "YVault address cannot be null");
        YVault = _YVault;
    }
}
