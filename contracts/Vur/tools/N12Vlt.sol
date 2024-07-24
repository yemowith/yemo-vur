// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./Able.sol";

// Vaults
contract N12Vlt is ownbl, Pausable, Lockable {
    mapping(address => uint256) public balances;
    address public mainAsset;
    constructor(address _mainAsset) {
        mainAsset = _mainAsset;
    }

    function deposit(
        uint256 amount
    ) external whenNotPaused whenNotLocked onlOwnr {
        require(
            IERC20(mainAsset).transferFrom(msg.sender, address(this), amount),
            "Transfer failed"
        );
        balances[msg.sender] += amount;
    }

    function withdraw(
        uint256 amount
    ) external whenNotPaused whenNotLocked onlOwnr {
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
