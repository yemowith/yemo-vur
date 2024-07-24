// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol";
import "@uniswap/v3-core/contracts/interfaces/IUniswapV3Factory.sol";
import "./Able.sol";

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

contract SwapableVault is ownbl, Pausable, Lockable {
    using SafeMath for uint256;

    mapping(address => uint256) public balances;
    ISwapRouter private router;
    IERC20 private inToken;
    IERC20 private outToken;
    IUniswapV3Factory private factory;

    event Deposit(address indexed user, uint256 amount);
    event Withdraw(address indexed user, uint256 amount);
    event SwapIn(address indexed user, uint256 amountIn, uint256 amountOut);
    event SwapOut(address indexed user, uint256 amountIn, uint256 amountOut);

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

    function deposit(
        uint256 amount
    ) public whenNotPaused whenNotLocked onlOwnr {
        require(
            inToken.transferFrom(msg.sender, address(this), amount),
            "Transfer failed"
        );
        balances[msg.sender] = balances[msg.sender].add(amount);
        emit Deposit(msg.sender, amount);
    }

    function withdraw(
        uint256 amount
    ) public whenNotPaused whenNotLocked onlOwnr {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        require(
            inToken.balanceOf(address(this)) >= amount,
            "Contract balance is insufficient"
        );
        balances[msg.sender] = balances[msg.sender].sub(amount);
        require(inToken.transfer(msg.sender, amount), "Transfer failed");
        emit Withdraw(msg.sender, amount);
    }

    function depositAll() external whenNotPaused whenNotLocked onlOwnr {
        uint256 balance = inToken.balanceOf(msg.sender);
        deposit(balance);
    }

    function withdrawAll() external whenNotPaused whenNotLocked onlOwnr {
        uint256 balance = balances[msg.sender];
        withdraw(balance);
    }

    function swapIn(uint256 amountIn, uint256 amountOutMin, uint24 fee) public {
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

        emit SwapIn(msg.sender, amountIn, amountOut);
    }

    function swapOut(
        uint256 amountOutDesired,
        uint256 amountInMax,
        uint24 fee
    ) public {
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

        emit SwapOut(msg.sender, amountIn, amountOutDesired);
    }

    function depositAndSwapIn(
        uint256 amountOutMin,
        uint24 fee
    ) external whenNotPaused whenNotLocked onlOwnr {
        uint256 balance = inToken.balanceOf(msg.sender);
        deposit(balance);
        swapIn(balance, amountOutMin, fee);
    }

    function withdrawAndSwapOut(
        uint256 amountOutDesired,
        uint24 fee
    ) external whenNotPaused whenNotLocked onlOwnr {
        uint256 balance = balances[msg.sender];
        withdraw(balance);
        swapOut(amountOutDesired, balance, fee);
    }

    function getEncodedFunctionSignature(
        string memory functionSignature
    ) external pure returns (bytes memory) {
        return abi.encodeWithSignature(functionSignature);
    }
}
