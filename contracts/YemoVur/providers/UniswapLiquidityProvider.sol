// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "@uniswap/v2-core/contracts/interfaces/IUniswapV2Factory.sol";
import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract UniswapLiquidityProvider {
    IUniswapV2Router02 public uniswapRouter;
    address public uniswapFactory;
    address public token1;
    address public token2;

    constructor(
        address _router,
        address _factory,
        address _token1,
        address _token2
    ) {
        uniswapRouter = IUniswapV2Router02(_router);
        uniswapFactory = _factory;
        token1 = _token1;
        token2 = _token2;
    }

    // Create liquidity pool
    function createPair() external returns (address pair) {
        pair = IUniswapV2Factory(uniswapFactory).createPair(token1, token2);
    }

    // Add liquidity to the pool
    function addLiquidity(uint amountToken1, uint amountToken2) external {
        IERC20(token1).approve(address(uniswapRouter), amountToken1);
        IERC20(token2).approve(address(uniswapRouter), amountToken2);

        uniswapRouter.addLiquidity(
            token1,
            token2,
            amountToken1,
            amountToken2,
            0, // Min amount of token1 to receive
            0, // Min amount of token2 to receive
            address(this), // Liquidity provider address
            block.timestamp + 300 // Expiration (5 minutes)
        );
    }
}
