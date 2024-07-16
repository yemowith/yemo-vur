import { Contract } from "ethers"
import { ethers } from "hardhat"
import { deploy } from "@utils/tools"

describe("N12", function () {
    let deployer: any
    let n12: Contract
    let mockToken: Contract
    this.beforeAll(async function () {
        ;[deployer] = await ethers.getSigners()

        mockToken = await (
            await deploy("ERC20Token", ["Mock Token", "Mock", deployer.address])
        ).deployed
        await mockToken.mint(deployer.address, ethers.utils.parseUnits("1000000", 18))

        n12 = await (await deploy("N12", [])).deployed

        console.log(n12.address)
    })

    it("creates a new ERC20SwapVault", async function () {})
})
