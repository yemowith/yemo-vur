// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract UniSwapContract {
    ISwapRouter public immutable swapRouter;
    address public immutable weth;
    address public immutable usdc;

    constructor(address _swapRouter, address _weth, address _usdc) {
        swapRouter = ISwapRouter(_swapRouter);
        weth = _weth;
        usdc = _usdc;
    }

    function swapExactInputSingle(
        uint256 amountIn,
        uint256 amountOutMinimum,
        uint24 fee,
        uint160 sqrtPriceLimitX96
    ) external returns (uint256 amountOut) {
        IERC20(weth).transferFrom(msg.sender, address(this), amountIn);
        IERC20(weth).approve(address(swapRouter), amountIn);

        ISwapRouter.ExactInputSingleParams memory params = ISwapRouter
            .ExactInputSingleParams({
                tokenIn: weth,
                tokenOut: usdc,
                fee: fee,
                recipient: msg.sender,
                deadline: block.timestamp + 15,
                amountIn: amountIn,
                amountOutMinimum: amountOutMinimum,
                sqrtPriceLimitX96: sqrtPriceLimitX96
            });

        amountOut = swapRouter.exactInputSingle(params);
    }
}
