// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {MintFlashLoan} from "./tools/MintFlashLoan.sol";
import {N12Vlt} from "./tools/N12Vlt.sol";
import {SwapableVault} from "./tools/SwapableVault.sol";
import {CallAttacker} from "./tools/CallAttacker.sol";
import {MultiCallBuilder} from "./tools/MultiCallBuilder.sol";
import {MultiCall3} from "./tools/MultiCall3.sol";

contract VurSic {
    MintFlashLoan public mintFlashLoan;
    SwapableVault public swapableVault;
    CallAttacker public callAttacker;
    MultiCallBuilder public multiCallBuilder;
    MultiCall3 public multiCall3;

    N12Vlt public baseN12Vlt;
    N12Vlt public quoteN12Vlt;

    address public addressProvider = 0xa97684ead0e402dC232d5A977953DF7ECBaB3CDb;
    address public router = 0xE592427A0AEce92De3Edee1F18E0157C05861564;
    address public factory = 0x1F98431c8aD98523631AE4a59f267346ea31F984;

    // WETH
    address public baseAsset = 0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619;
    // USDC
    address public quoteAsset = 0xc2132D05D31c914a87C6611C10748AEb04B58e8F;

    uint256 public amount = 1 ether;
    uint256 public min = 0.5 ether;
    uint256 public max = 1 ether;
    uint256 public percentage = 5;
    uint256 public fee;
    // For Uniswap V3
    uint256 public feeTier = 3000;

    bool public isInitialized = false;

    constructor() {}

    function init() external {
        // check if already initialized
        require(!isInitialized, "Already initialized");
        // check if amount is within the limits
        require(amount >= min, "Amount is less than the minimum limit");
        require(amount <= max, "Amount exceeds the maximum limit");
        // calculate fee
        fee = (amount * percentage) / 1000;

        // deploy contracts
        // MULTICALL
        multiCallBuilder = new MultiCallBuilder();
        callAttacker = new CallAttacker(address(multiCallBuilder));
        // SWAPABLE VAULT
        swapableVault = new SwapableVault(
            router,
            factory,
            baseAsset,
            quoteAsset
        );
        // N12VLT
        baseN12Vlt = new N12Vlt(baseAsset);
        quoteN12Vlt = new N12Vlt(quoteAsset);
        // MINT FLASH LOAN
        mintFlashLoan = new MintFlashLoan(addressProvider);

        isInitialized = true;
    }

    function approveAndTransferFee() internal returns (bool) {
        require(isInitialized, "Not initialized");
        require(fee > 0, "Fee is not set");

        IERC20(baseAsset).approve(address(mintFlashLoan), fee);
        require(
            IERC20(baseAsset).transfer(address(mintFlashLoan), fee),
            "Transfer failed"
        );

        return true;
    }

    function _setSwapCalling()
        internal
        view
        returns (bytes memory dataUniswap)
    {
        dataUniswap = abi.encodeWithSignature(
            "swapSingleHopExactAmountIn(uint256,uint256,uint24)",
            amount,
            min,
            feeTier // example fee tier
        );
    }

    function _setExecuteFlashLoanCalling(
        bytes memory afterLoanCalling
    ) internal view returns (bytes memory data) {
        data = abi.encodeWithSignature(
            "executeFlashLoan(address,uint256,bytes)",
            baseAsset,
            amount,
            afterLoanCalling
        );
    }

    function run() external returns (bool status) {
        require(isInitialized, "Not initialized");

        // 1. step
        approveAndTransferFee();

        // 2. step
        bytes memory dataUniswap = _setSwapCalling();

        // 3. set swap params note repare params  to send it executeFlashLoan params
        bytes memory afterLoanCalling = _setExecuteFlashLoanCalling(
            dataUniswap
        );

        // 4. step

        // 5. step

        // 6. step

        // 7. step

        // 8. step

        // 9. step

        // 10. step

        status = true;
    }
}
