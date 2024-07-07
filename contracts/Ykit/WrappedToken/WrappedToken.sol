// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract WrappedToken is ERC20, Ownable {
    IERC20 public underlying;

    event Wrap(address indexed user, uint256 amount);
    event Unwrap(address indexed user, uint256 amount);

    constructor(
        string memory name,
        string memory symbol,
        address _underlying
    ) ERC20(name, symbol) Ownable(msg.sender) {
        require(_underlying != address(0), "Invalid underlying asset address");
        underlying = IERC20(_underlying);
    }

    function wrap(uint256 amount) external {
        require(amount > 0, "Amount must be greater than 0");
        require(
            underlying.transferFrom(msg.sender, address(this), amount),
            "Transfer failed"
        );

        _mint(msg.sender, amount);
        emit Wrap(msg.sender, amount);
    }

    function unwrap(uint256 amount) external {
        require(amount > 0, "Amount must be greater than 0");
        require(
            balanceOf(msg.sender) >= amount,
            "Insufficient wrapped token balance"
        );

        _burn(msg.sender, amount);
        require(underlying.transfer(msg.sender, amount), "Transfer failed");

        emit Unwrap(msg.sender, amount);
    }
}
