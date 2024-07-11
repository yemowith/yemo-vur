// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IYeSwapperFactory {
    // Event declarations
    event VaultCreated(address indexed vaultAddress);
    event SwapperCreated(address indexed swapperAddress);

    // Function to create a new ERC20SwapVault
    function createVault(
        address _baseToken,
        address _quoteToken
    ) external returns (address);

    // Function to create a new YeSwapper
    function createSwapper(
        address _vault,
        uint256 _exchangeRate
    ) external returns (address);

    // Function to create a wrapped token and set up vault and swapper
    function createTokenAndSetupSwap(
        string memory _name,
        string memory _symbol,
        uint8 _decimals,
        IERC20 _underlying,
        address _quoteToken,
        uint256 _exchangeRate
    ) external returns (address, address, address);
}
