// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./SimpleSwapper.sol";
import "./base/ERC20SwapVault.sol";
import "./base/CustomWrappedToken.sol";
import "./base/TokenProxy.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SimpleSwapperFactory is Ownable {
    event CustomWrappedTokenCreated(
        address indexed owner,
        address indexed proxy,
        address underlying
    );

    event ERC20SwapVaultCreated(
        address indexed owner,
        address indexed vault,
        address baseToken,
        address quoteToken
    );

    event SimpleSwapperCreated(
        address indexed owner,
        address indexed swapper,
        address vault,
        uint256 exchangeRate
    );

    address[] public swappers;
    address[] public vaults;
    address[] public wrappedTokens;

    constructor() Ownable(msg.sender) {}

    function createCustomWrappedToken(
        string memory name,
        string memory symbol,
        address underlying,
        address implementation
    ) external returns (address) {
        require(implementation != address(0), "Invalid implementation address");

        // Deploy the proxy
        TokenProxy proxy = new TokenProxy(msg.sender);
        proxy.setImplementation(implementation);

        // Initialize the wrapped token via the proxy
        bytes memory initData = abi.encodeWithSelector(
            CustomWrappedToken(address(0)).initialize.selector,
            name,
            symbol,
            underlying
        );
        (bool success, ) = address(proxy).call(initData);
        require(success, "Initialization failed");

        wrappedTokens.push(address(proxy));

        emit CustomWrappedTokenCreated(msg.sender, address(proxy), underlying);

        return address(proxy);
    }

    function createERC20SwapVault(
        address baseToken,
        address quoteToken
    ) external returns (address) {
        ERC20SwapVault vault = new ERC20SwapVault(baseToken, quoteToken);
        vault.transferOwnership(msg.sender);

        vaults.push(address(vault));

        emit ERC20SwapVaultCreated(
            msg.sender,
            address(vault),
            baseToken,
            quoteToken
        );

        return address(vault);
    }

    function createSimpleSwapper(
        address vault,
        uint256 exchangeRate
    ) external returns (address) {
        require(vault != address(0), "Invalid vault address");
        require(exchangeRate > 0, "Invalid exchange rate");

        SimpleSwapper swapper = new SimpleSwapper(vault, exchangeRate);
        swapper.transferOwnership(msg.sender);

        swappers.push(address(swapper));

        emit SimpleSwapperCreated(
            msg.sender,
            address(swapper),
            vault,
            exchangeRate
        );

        return address(swapper);
    }

    function getSwappers() external view returns (address[] memory) {
        return swappers;
    }

    function getVaults() external view returns (address[] memory) {
        return vaults;
    }

    function getWrappedTokens() external view returns (address[] memory) {
        return wrappedTokens;
    }
}
