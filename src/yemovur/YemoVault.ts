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
    const minAmt = 0.1

    const dplr = "0x6645061974017B5138Bfc64FC2C584703CeD7cC4"
    const ddsp = "0x7C33316a158B81bEBf9570879F10a44271006561"
    const eemt = "0x7C33316a158B81bEBf9570879F10a44271006561"
    const appInsta = "0xa97684ead0e402dC232d5A977953DF7ECBaB3CDb"
    const weth = "0x4200000000000000000000000000000000000006"

    const balanceD = await balanceOfETH(deployer.address)
    if (balanceD.lt(toEther(minAmt))) {
        throw new Error("Deployer balance is too low")
    }
    // const { stpA, dplr, ddsp, eemt } = await setup()

    const yv = await deploy("YemoVault", [deployer.address, dplr, ddsp, eemt, appInsta])
    const yva = yv.address
    const yemoV = await ethers.getContractAt("YemoVault", yva)
    await chargeC(yemoV.address, toEther(minAmt))
}

yemoVur().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
