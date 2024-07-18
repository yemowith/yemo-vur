// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol";
import "@uniswap/v3-core/contracts/interfaces/IUniswapV3Factory.sol";
import "@uniswap/v3-core/contracts/interfaces/IUniswapV3Pool.sol";

library SafeMath {
    function add(uint x, uint y) internal pure returns (uint z) {
        require((z = x + y) >= x, "ds-math-add-overflow");
    }

    function sub(uint x, uint y) internal pure returns (uint z) {
        require((z = x - y) <= x, "ds-math-sub-underflow");
    }

    function mul(uint x, uint y) internal pure returns (uint z) {
        require(y == 0 || (z = x * y) / y == x, "ds-math-mul-overflow");
    }
}

contract UniSwapper {
    using SafeMath for uint256;

    ISwapRouter private router;
    IERC20 private inToken;
    IERC20 private outToken;
    IUniswapV3Factory private factory;

    event SwapExactAmountIn(
        address indexed user,
        uint256 amountIn,
        uint256 amountOut
    );
    event SwapExactAmountOut(
        address indexed user,
        uint256 amountIn,
        uint256 amountOut
    );

    constructor(
        address _router,
        address _factory,
        address _inToken,
        address _outToken
    ) {
        router = ISwapRouter(_router);
        factory = IUniswapV3Factory(_factory);
        inToken = IERC20(_inToken);
        outToken = IERC20(_outToken);
    }

    function swapSingleHopExactAmountIn(
        uint256 amountIn,
        uint256 amountOutMin,
        uint24 fee
    ) external {
        require(amountIn > 0, "Amount in must be greater than 0");

        inToken.transferFrom(msg.sender, address(this), amountIn);
        inToken.approve(address(router), amountIn);

        ISwapRouter.ExactInputSingleParams memory params = ISwapRouter
            .ExactInputSingleParams({
                tokenIn: address(inToken),
                tokenOut: address(outToken),
                fee: fee,
                recipient: msg.sender,
                deadline: block.timestamp,
                amountIn: amountIn,
                amountOutMinimum: amountOutMin,
                sqrtPriceLimitX96: 0
            });

        uint256 amountOut = router.exactInputSingle(params);

        emit SwapExactAmountIn(msg.sender, amountIn, amountOut);
    }

    function swapSingleHopExactAmountOut(
        uint256 amountOutDesired,
        uint256 amountInMax,
        uint24 fee
    ) external {
        require(
            amountOutDesired > 0,
            "Amount out desired must be greater than 0"
        );

        inToken.transferFrom(msg.sender, address(this), amountInMax);
        inToken.approve(address(router), amountInMax);

        ISwapRouter.ExactOutputSingleParams memory params = ISwapRouter
            .ExactOutputSingleParams({
                tokenIn: address(inToken),
                tokenOut: address(outToken),
                fee: fee,
                recipient: msg.sender,
                deadline: block.timestamp,
                amountOut: amountOutDesired,
                amountInMaximum: amountInMax,
                sqrtPriceLimitX96: 0
            });

        uint256 amountIn = router.exactOutputSingle(params);

        if (amountIn < amountInMax) {
            inToken.transfer(msg.sender, amountInMax.sub(amountIn));
        }

        emit SwapExactAmountOut(msg.sender, amountIn, amountOutDesired);
    }
}
