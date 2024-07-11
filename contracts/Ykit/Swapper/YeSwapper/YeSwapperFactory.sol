// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./base/ERC20SwapVault.sol";
import "./SwapContract.sol";
import "../../Tokens/WrappedToken/WrappedTokenFactory.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract YeSwapperFactory is Ownable {
    WrappedTokenFactory public wrappedTokenFactory;

    event VaultCreated(address indexed vaultAddress);
    event SwapperCreated(address indexed swapperAddress);
    event TokenCreated(address indexed tokenAddress);

    constructor(address _wrappedTokenFactory) Ownable(msg.sender) {
        require(_wrappedTokenFactory != address(0), "Invalid factory address");
        wrappedTokenFactory = WrappedTokenFactory(_wrappedTokenFactory);
    }

    function _createVault(
        address _baseToken,
        address _quoteToken
    ) internal onlyOwner returns (address) {
        ERC20SwapVault vault = new ERC20SwapVault(_baseToken, _quoteToken);
        vault.transferOwnership(msg.sender);
        emit VaultCreated(address(vault));
        return address(vault);
    }

    function _createSwapper(
        address _vault,
        uint256 _exchangeRate
    ) internal onlyOwner returns (address) {
        SwapContract swapper = new SwapContract(_vault);
        swapper.transferOwnership(msg.sender);
        emit SwapperCreated(address(swapper));
        return address(swapper);
    }

    function _createTokenAndSetupSwap(
        string memory _name,
        string memory _symbol,
        uint8 _decimals,
        IERC20 _underlying,
        uint256 _exchangeRate
    ) internal onlyOwner returns (address, address, address) {
        // Create Wrapped Token
        address wrappedToken = wrappedTokenFactory.createWrappedToken(
            _name,
            _symbol,
            _decimals,
            _underlying
        );
        emit TokenCreated(wrappedToken);

        // Create Vault
        address vault = _createVault(wrappedToken, address(_underlying));

        // Create Swapper
        address swapper = _createSwapper(vault, _exchangeRate);

        return (wrappedToken, vault, swapper);
    }

    function createVault(
        address _baseToken,
        address _quoteToken
    ) external onlyOwner returns (address) {
        return _createVault(_baseToken, _quoteToken);
    }

    function createSwapper(
        address _vault,
        uint256 _exchangeRate
    ) external onlyOwner returns (address) {
        return _createSwapper(_vault, _exchangeRate);
    }

    function createVaultAndSetupSwap(
        address _wrappedToken,
        IERC20 _underlying,
        uint256 _exchangeRate
    ) external onlyOwner returns (address, address) {
        address vault = _createVault(_wrappedToken, address(_underlying));
        address swapper = _createSwapper(vault, _exchangeRate);
        return (vault, swapper);
    }
}
