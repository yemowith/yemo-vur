import { expect } from "chai"
import { ethers } from "hardhat"
import { Contract } from "ethers"

const USDT_ADDRESS = "0xdac17f958d2ee523a2206206994597c13d831ec7"
const WETH_ADDRESS = "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619"
const SWAP_ROUTER_ADDRESS = "0xE592427A0AEce92De3Edee1F18E0157C05861564"
const IERC20 = "@aave/core-v3/contracts/dependencies/openzeppelin/contracts/IERC20.sol:IERC20"

describe("UniSwapper", function () {
    let UniSwapper: Contract
    let uniSwapper: Contract
    let owner: any
    let addr1: any
    let addr2: any
    let usdt: Contract
    let weth: Contract

    before(async function () {
        ;[owner, addr1, addr2] = await ethers.getSigners()

        usdt = await ethers.getContractAt(IERC20, USDT_ADDRESS)
        weth = await ethers.getContractAt(IERC20, WETH_ADDRESS)

        // Deploy UniSwapper contract
        const UniSwapperFactory = await ethers.getContractFactory("UniSwapper")
        uniSwapper = await UniSwapperFactory.deploy(SWAP_ROUTER_ADDRESS)
    })

    describe("swapExactInputSingle", function () {
        it("should swap exact input WETH for USDT", async function () {
            const ownerWethBalance = await weth.balanceOf(owner.address)
            console.log("ownerWethBalance", ownerWethBalance.toString())

            const amountIn = ownerWethBalance.div(2)

            console.log("ownerWethBalance", ownerWethBalance.toString())

            const tokenIn = weth.address
            const tokenOut = usdt.address
            const fee = 0

            // Approve UniSwapper contract to spend WETH
            await weth.approve(uniSwapper.address, amountIn)

            // Perform the swap
            const tx = await uniSwapper.swapExactInputSingle(tokenIn, tokenOut, fee, amountIn, {
                gasLimit: 300000000,
            })
            const receipt = await tx.wait()

            const amountOut = receipt.events?.find(
                (event: any) => event.event === "SwapExactInputSingle"
            )?.args?.amountOut

            expect(amountOut).to.be.gt(0)
        })
    })

    describe("swapExactOutputSingle", function () {
        it("should swap WETH for exact output USDT", async function () {
            const amountOut = ethers.utils.parseEther("10")
            const amountInMaximum = ethers.utils.parseEther("100")
            const tokenIn = weth.address
            const tokenOut = usdt.address
            const fee = 0

            // Approve UniSwapper contract to spend WETH
            await weth.approve(uniSwapper.address, amountInMaximum)

            // Perform the swap
            const tx = await uniSwapper.swapExactOutputSingle(
                tokenIn,
                tokenOut,
                fee,
                amountOut,
                amountInMaximum,
                { gasLimit: 300000000 }
            )
            const receipt = await tx.wait()

            const amountIn = receipt.events?.find(
                (event: any) => event.event === "SwapExactOutputSingle"
            )?.args?.amountIn

            expect(amountIn).to.be.lte(amountInMaximum)
        })
    })
})
