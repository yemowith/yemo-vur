import { expect } from "chai"
import { ethers } from "hardhat"
import { Contract } from "ethers"

const WETH_ADDRESS = "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619" // WETH mainnet address
const USDT_ADDRESS = "0xc2132d05d31c914a87c6611c10748aeb04b58e8f" // USDT mainnet address
const SWAP_ROUTER_ADDRESS = "0xE592427A0AEce92De3Edee1F18E0157C05861564" // Uniswap V3 Router mainnet address
const SWAP_FACTORY_ADDRESS = "0x1F98431c8aD98523631AE4a59f267346ea31F984" // Uniswap V3 Factory mainnet address
const IERC20 = "@openzeppelin/contracts/token/ERC20/IERC20.sol:IERC20"

describe("UniSwapper", function () {
    let uniSwapper: Contract
    let owner: any
    let addr1: any
    let addr2: any
    let weth: Contract
    let usdt: Contract

    const WETH_DECIMALS = 18
    const USDT_DECIMALS = 6
    const FEE = 100 // Uniswap V3 fee tier

    before(async function () {
        ;[owner, addr1, addr2] = await ethers.getSigners()

        weth = await ethers.getContractAt(IERC20, WETH_ADDRESS)
        usdt = await ethers.getContractAt(IERC20, USDT_ADDRESS)

        // Deploy UniSwapper contract
        const UniSwapperFactory = await ethers.getContractFactory("UniSwapper", owner)
        uniSwapper = await UniSwapperFactory.deploy(
            SWAP_ROUTER_ADDRESS,
            SWAP_FACTORY_ADDRESS,
            weth.address,
            usdt.address,
            { gasLimit: 3000000 }
        )
    })

    describe("swapSingleHopExactAmountIn", function () {
        it("should swap exact input WETH for USDT", async function () {
            const ownerWethBalance = await weth.balanceOf(owner.address)
            const amountIn = ownerWethBalance.div(10) // Swap 10% of owner's WETH balance
            const amountOutMin = ethers.utils.parseUnits("1", USDT_DECIMALS) // Set a minimum amount of 1 USDT

            // Approve UniSwapper contract to spend WETH
            await weth.approve(uniSwapper.address, amountIn)

            // Perform the swap
            const tx = await uniSwapper.swapSingleHopExactAmountIn(amountIn, amountOutMin, FEE, {
                gasLimit: 3000000,
            })
            const receipt = await tx.wait()

            const amountOut = receipt.events?.find(
                (event: any) => event.event === "SwapExactAmountIn"
            )?.args?.amountOut

            expect(amountOut).to.be.gt(0)
        })
    })
})
