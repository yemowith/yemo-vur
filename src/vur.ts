import { ethers, tenderly } from "hardhat"
import { deploy, fromEther, toEther } from "../utils/tools"
import { balanceOfETH, sendETH } from "../utils/clients/transfers"
import { logg } from "../utils/core/logger"
import { BigNumber, ContractReceipt } from "ethers"
import { Adrs, adrsG } from "./addressesG"
import { getWETH } from "@utils/clients/weth"

const adrs: Adrs = adrsG
const chargeC = async (c: string, a: BigNumber) => {
    const b = await balanceOfETH(c)
    if (b < a) {
        logg.info(`Charge ${a} ETH to ${c}`)
        await sendETH(c, a)
    }
    return b
}

const sleep = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

const aAdrs = (k: string): string => {
    return adrs[k as keyof typeof adrs] as string
}

const setup = async (owner: string) => {
    logg.info("Deploying YSetup")
    const _stp = await deploy("YSetup", [owner])
    const stp = await ethers.getContractAt("YSetup", _stp.address)

    logg.info("Call Setup ", stp.address)
    await stp.stp()

    logg.info("Get Adreses")
    const [adrsb, dplr, ddsp, eemt] = await stp.gA()

    logg.success("ADRSB address: ", adrsb)
    logg.success("DPLR address: ", dplr)
    logg.success("DDSP address: ", ddsp)
    logg.success("EEMT address: ", eemt)

    for (const [k, v] of Object.entries(adrs)) {
        await stp.addAddress(k, v, { gasLimit: 1000000000 })
        logg.info(`Adding ${v} to ${k}`)
    }

    const stpA = stp.address

    return { stpA, adrsb, dplr, ddsp, eemt }
}

const ckblnc = async (deployer: string) => {
    const balanceD = await balanceOfETH(deployer)
    logg.success("Deployer balance: ", toEther(balanceD))
    if (balanceD.lt(toEther(1))) {
        throw new Error("Deployer balance is too low")
    }
}

async function yemoVur() {
    const [deployer, player] = await ethers.getSigners()

    const dep = await deploy("Vur")
    const minAmt = 0.1
    await ckblnc(deployer.address)

    const balanceD = await balanceOfETH(deployer.address)
    if (balanceD.lt(toEther(minAmt))) {
        throw new Error("Deployer balance is too low")
    }

    const weth  = await getWETH(aAdrs("weth"))
}

yemoVur().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
