// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "../Ykit/imprt.sol";

import "@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol";
import "@uniswap/swap-router-contracts/contracts/interfaces/IV3SwapRouter.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IWETH2 {
    function deposit() external payable;
    function withdraw(uint256) external;

    function transfer(address dst, uint wad) external returns (bool);
}

abstract contract BVat {
    receive() external payable {}

    // Deposit ERC20 tokens
    function deposit(address token, uint256 amount) external {
        require(
            IERC20(token).allowance(msg.sender, address(this)) >= amount,
            "Allowance not enough"
        );
        IERC20(token).transferFrom(msg.sender, address(this), amount);
    }

    // Withdraw ERC20 tokens
    function withdraw(
        address token,
        uint256 amount,
        address receiver
    ) external {
        require(
            IERC20(token).allowance(msg.sender, address(this)) >= amount,
            "Allowance not enough"
        );
        IERC20(token).transfer(receiver, amount);
    }
}

abstract contract VSWP is WYK, BVat {
    // Define events
    event SwapExecuted(
        address indexed tokenIn,
        address indexed tokenOut,
        uint256 amountIn,
        uint256 amountOut
    );
    // Save the last swap details
    struct LastSwap {
        address tokenIn;
        address tokenOut;
        uint256 amountIn;
        uint256 amountOut;
    }
    LastSwap public lastSwap;

    ISwapRouter public immutable router;

    constructor() {
        address routerAddress = IADRSB(adrsb).gAdrs("swapRouter");
        router = ISwapRouter(routerAddress);
    }

    function swapTo(
        address tokenIn,
        address tokenOut,
        uint24 poolFee,
        uint256 amountIn
    ) external returns (uint256 amountOut) {
        ISwapRouter.ExactInputSingleParams memory params = ISwapRouter
            .ExactInputSingleParams({
                tokenIn: tokenIn,
                tokenOut: tokenOut,
                fee: poolFee,
                recipient: address(this),
                deadline: block.timestamp,
                amountIn: amountIn,
                amountOutMinimum: 0,
                sqrtPriceLimitX96: 0
            });

        amountOut = router.exactInputSingle(params);
        // Emit the SwapExecuted event
        emit SwapExecuted(tokenIn, tokenOut, amountIn, amountOut);
        // Update the lastSwap details
        lastSwap = LastSwap(tokenIn, tokenOut, amountIn, amountOut);

        return amountOut;
    }
}
