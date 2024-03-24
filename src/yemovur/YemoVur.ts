import { ethers, tenderly } from "hardhat"
import { deploy, fromEther, toEther } from "../../utils/tools"
import { balanceOfETH, sendETH } from "../../utils/clients/transfers"
import { logg } from "../../utils/core/logger"
import { BigNumber } from "ethers"

const chargeC = async (c: string, a: BigNumber) => {
    const b = await balanceOfETH(c)
    if (b < a) {
        logg.info(`Charge ${a} ETH to ${c}`)
        await sendETH(c, toEther(1))
    }
    return b
}

const sleep = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

const setup = async () => {
    logg.info("Deploying YSetup")
    const stp = await deploy("YSetup")

    logg.info("Call Setup ", stp.address)
    await stp.contract.stp()

    logg.info("Get Adreses")
    const [dplr, ddsp, eemt] = await stp.contract.gA()

    logg.success("DPLR address: ", dplr)
    logg.success("DDSP address: ", ddsp)
    logg.success("EEMT address: ", eemt)

    const stpA = stp.address

    return { stpA, dplr, ddsp, eemt }
}

async function yemoVur() {
    const [deployer, player] = await ethers.getSigners()

    const balanceD = await balanceOfETH(deployer.address)
    logg.success("Deployer balance: ", toEther(balanceD))
    if (balanceD.lt(toEther(1))) {
        throw new Error("Deployer balance is too low")
    }
    // const { stpA, dplr, ddsp, eemt } = await setup()

    const yv = await deploy("YemoVur")
    const yva = yv.address
    await chargeC(yva, toEther(1))

    //const yva = "0x0b88Dc42000E530Cf45707566Bf80c5E2A6389Be"
    const yemoVur = await ethers.getContractAt("YemoVur", yva)
    // await chargeC(yva)

    const vur = (await yemoVur.vur({ gasLimit: 500000000 })).wait(1)
    const r = await yemoVur.vurR()
    console.log(r)
}

yemoVur().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
