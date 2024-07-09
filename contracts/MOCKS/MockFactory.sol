// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ERC/ERC20Token.sol";
contract MockFactory {
    event ERC20TokenCreated(
        address indexed tokenAddress,
        string name,
        string symbol,
        uint8 decimals,
        uint256 initialSupply
    );

    address public lastCreatedToken;

    function createERC20Token(
        string memory name,
        string memory symbol,
        uint8 decimals
    ) public {}

    function getLastCreatedToken() public view returns (address) {
        return lastCreatedToken;
    }
}
