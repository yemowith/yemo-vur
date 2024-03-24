import { ethers } from "hardhat"
import { deploy, toEther } from "../../utils/tools"
import { Contract } from "ethers"
import { balanceOfETH, sendETH } from "../../utils/clients/transfers"

let yemoVurContract: Contract
let py: string

const chargeC = async (a: string) => {
    const b = await balanceOfETH(a)
    if (b.toNumber() < toEther(1)) {
        const seth = await sendETH(a, toEther(1))
    }
    return b
}

const sleep = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

describe("Ddsp", function () {
    let deployer: any

    this.beforeAll(async function () {
        const [deployer, player] = await ethers.getSigners()

        const yv = await deploy("YemoVur")
        const yva = yv.address

        //const yva = "0x0b88Dc42000E530Cf45707566Bf80c5E2A6389Be"
        const yemoVur = await ethers.getContractAt("YemoVur", yva)
        await chargeC(yva)
        await sleep(1000)

        await yemoVur
            .vur({ gasLimit: 1000000 })
            .then(async (l) => {
                const gg = async () => {}
                //await gg()
                //  console.log(l)
            })
            .catch((e) => {
                throw e
            })
    })

    it("first make proxy", async function () {})
})
