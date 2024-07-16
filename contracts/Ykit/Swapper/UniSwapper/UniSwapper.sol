// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@uniswap/v2-periphery/contracts/UniswapV2Router02.sol";
import "openzeppelin-solidity/contracts/math/SafeMath.sol";

contract UniSwapper {
    using SafeMath for uint256;

    IUniswapV2Router02 private router;
    IERC20 private inToken;
    IERC20 private outToken;

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

    constructor(address _router, address _inToken, address _outToken) {
        router = IUniswapV2Router02(_router);
        inToken = IERC20(_inToken);
        outToken = IERC20(_outToken);
    }

    function swapSingleHopExactAmountIn(
        uint256 amountIn,
        uint256 amountOutMin
    ) external {
        require(amountIn > 0, "Amount in must be greater than 0");

        inToken.transferFrom(msg.sender, address(this), amountIn);
        inToken.approve(address(router), amountIn);

        address[] memory path = new address[](2);
        path[0] = address(inToken);
        path[1] = address(outToken);

        uint[] memory amounts = router.swapExactTokensForTokens(
            amountIn,
            amountOutMin,
            path,
            msg.sender,
            block.timestamp
        );

        emit SwapExactAmountIn(msg.sender, amountIn, amounts[1]);
    }

    function swapSingleHopExactAmountOut(
        uint256 amountOutDesired,
        uint256 amountInMax
    ) external {
        require(
            amountOutDesired > 0,
            "Amount out desired must be greater than 0"
        );

        inToken.transferFrom(msg.sender, address(this), amountInMax);
        inToken.approve(address(router), amountInMax);

        address[] memory path = new address[](2);
        path[0] = address(inToken);
        path[1] = address(outToken);

        uint[] memory amounts = router.swapTokensForExactTokens(
            amountOutDesired,
            amountInMax,
            path,
            msg.sender,
            block.timestamp
        );

        if (amounts[0] < amountInMax) {
            inToken.transfer(msg.sender, amountInMax.sub(amounts[0]));
        }

        emit SwapExactAmountOut(msg.sender, amounts[0], amountOutDesired);
    }
}
