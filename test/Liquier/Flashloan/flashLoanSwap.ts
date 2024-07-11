import { expect } from "chai"
import { ethers } from "hardhat"
import { Contract } from "ethers"

describe("FlashLoanSwap", function () {
    let owner: any
    let user1: any
    let flashLoanContract: Contract
    let uniSwapContract: Contract
    const wethAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2" // Example WETH address
    const usdcAddress = "0x3c499c542cef5e3811e1192ce70d8cc03d5c3359" // Example USDC address
    const uniswapRouterAddress = "0xE592427A0AEce92De3Edee1F18E0157C05861564" // Uniswap V3 router
    const providerAddress = "0xa97684ead0e402dC232d5A977953DF7ECBaB3CDb" // Price provider

    const gasLimit = 500000

    beforeEach(async function () {
        ;[owner, user1] = await ethers.getSigners()

        // Deploy FlashLoanContract
        const FlashLoanContract = await ethers.getContractFactory("FlashLoanContract")
        flashLoanContract = await FlashLoanContract.deploy(providerAddress, { gasLimit }) // Use actual address provider address
        await flashLoanContract.deployed()

        // Deploy UniSwapContract
        const UniSwapContract = await ethers.getContractFactory("UniSwapContract")
        uniSwapContract = await UniSwapContract.deploy(
            uniswapRouterAddress,
            wethAddress,
            usdcAddress,
            { gasLimit }
        )
        await uniSwapContract.deployed()
    })

    it("should request a flash loan and swap tokens", async function () {
        // Simulate receiving a flash loan in WETH and swapping to USDC
        const flashLoanAmount = ethers.utils.parseEther("10")

        // Call requestFlashLoan on FlashLoanContract
        await flashLoanContract.requestFlashLoan(wethAddress, flashLoanAmount, { gasLimit })

        // Simulate swap in UniSwapContract
        const swapAmountOutMinimum = 0 // For simplicity, set this to 0 in the example
        const fee = 3000 // 0.3% fee tier
        const sqrtPriceLimitX96 = 0 // No price limit

        await uniSwapContract.swapExactInputSingle(
            flashLoanAmount,
            swapAmountOutMinimum,
            fee,
            sqrtPriceLimitX96,
            { gasLimit }
        )

        const usdcContract = await ethers.getContractAt("IERC20", usdcAddress)
        const usdcBalance = await usdcContract.balanceOf(owner.address)
        console.log("USDC Balance after swap:", ethers.utils.formatUnits(usdcBalance, 6))

        expect(usdcBalance).to.be.gt(0) // Ensure that some USDC was received from the swap
    })
})
