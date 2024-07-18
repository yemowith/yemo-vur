// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract VaultTest {
    mapping(address => uint256) public balances;
    address public mainAsset;
    address public owner;

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    constructor(address _mainAsset) {
        mainAsset = _mainAsset;
        owner = msg.sender;
    }

    function deposit(uint256 amount) external {
        require(
            IERC20(mainAsset).transferFrom(msg.sender, address(this), amount),
            "Transfer failed"
        );
        balances[msg.sender] += amount;
    }

    function withdraw(uint256 amount) external {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        require(
            IERC20(mainAsset).balanceOf(address(this)) >= amount,
            "Contract balance is insufficient"
        );
        balances[msg.sender] -= amount;
        require(
            IERC20(mainAsset).transfer(msg.sender, amount),
            "Transfer failed"
        );
    }
}
