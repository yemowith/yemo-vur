import { ethers } from "hardhat"
import { deploy } from "../../utils/tools"
import { Contract } from "ethers"
import { YemoKit, IYemoKit } from "../../utils/clients/yk"

let yemoVurContract: Contract
let yemoVur: IYemoKit
let py: string

describe("Ddsp", function () {
    let deployer: any

    this.beforeAll(async function () {
        // get owner (first account)
        ;[deployer] = await ethers.getSigners()
        yemoVurContract = (await deploy("YemoVur", [deployer.address])).contract
        await yemoVurContract.init()
        yemoVur = await YemoKit(yemoVurContract.address)
    })

    it("first make proxy", async function () {
        py = await yemoVur.YK.dplyPY(deployer.address)
    })
})
