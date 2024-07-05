// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";
import "@uniswap/v2-core/contracts/interfaces/IUniswapV2Factory.sol";
import "@uniswap/v2-core/contracts/interfaces/IUniswapV2Pair.sol";
import "@uniswap/v2-periphery/contracts/interfaces/IERC20.sol";

contract YSwapper {
    address private owner;
    IUniswapV2Router02 public uniswapRouter;
    address public WETH;
    address public fixedToken; // Fixed token address

    event SwapExecuted(
        address indexed sender,
        address indexed tokenIn,
        address indexed tokenOut,
        uint256 amountIn,
        uint256 amountOut
    );

    modifier onlyOwner() {
        require(msg.sender == owner, "Caller is not the owner");
        _;
    }

    constructor(address _uniswapRouter, address _fixedToken) {
        owner = msg.sender;
        uniswapRouter = IUniswapV2Router02(_uniswapRouter);
        WETH = uniswapRouter.WETH();
        fixedToken = _fixedToken; // Initialize fixed token
    }

    function swap(
        address tokenIn,
        uint256 amountIn,
        uint256 amountOutMin,
        address to,
        uint256 deadline
    ) external returns (uint256[] memory amounts) {
        return _swap(tokenIn, fixedToken, amountIn, amountOutMin, to, deadline);
    }

    function reswap(
        address tokenOut,
        uint256 amountIn,
        uint256 amountOutMin,
        address to,
        uint256 deadline
    ) external returns (uint256[] memory amounts) {
        return
            _swap(fixedToken, tokenOut, amountIn, amountOutMin, to, deadline);
    }

    function _swap(
        address tokenIn,
        address tokenOut,
        uint256 amountIn,
        uint256 amountOutMin,
        address to,
        uint256 deadline
    ) internal returns (uint256[] memory amounts) {
        require(
            IERC20(tokenIn).transferFrom(msg.sender, address(this), amountIn),
            "Transfer of tokenIn failed"
        );
        require(
            IERC20(tokenIn).approve(address(uniswapRouter), amountIn),
            "Approval of tokenIn failed"
        );

        address[] memory path;
        if (tokenIn == WETH || tokenOut == WETH) {
            path = new address[](2);
            path[0] = tokenIn;
            path[1] = tokenOut;
        } else {
            path = new address[](3);
            path[0] = tokenIn;
            path[1] = WETH;
            path[2] = tokenOut;
        }

        amounts = uniswapRouter.swapExactTokensForTokens(
            amountIn,
            amountOutMin,
            path,
            to,
            deadline
        );

        emit SwapExecuted(
            msg.sender,
            tokenIn,
            tokenOut,
            amountIn,
            amounts[amounts.length - 1]
        );
    }

    function withdrawTokens(
        address token,
        uint256 amount,
        address to
    ) external onlyOwner {
        require(IERC20(token).transfer(to, amount), "Transfer failed");
    }

    function withdrawETH(
        uint256 amount,
        address payable to
    ) external onlyOwner {
        to.transfer(amount);
    }

    receive() external payable {}
}
