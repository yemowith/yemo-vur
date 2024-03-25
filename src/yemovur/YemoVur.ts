import { ethers, tenderly } from "hardhat"
import { deploy, fromEther, toEther } from "../../utils/tools"
import { balanceOfETH, sendETH } from "../../utils/clients/transfers"
import { logg } from "../../utils/core/logger"
import { BigNumber, ContractReceipt } from "ethers"
import { Adrs, adrsG } from "../addressesG"

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

    const adrsb = "0x7827d55109484686340c63a48360f8938c4f37bb"
    await ckblnc(deployer.address)

    let amount = toEther(0.1)

    /*
  const yv = await deploy("YemoVur", [deployer.address, adrsb])
    const yemoVur = await ethers.getContractAt("YemoVur", yv.address)
    await chargeC(yv.address, toEther(1))
     let defa = await yemoVur.newDefa(aAdrs("weth"), deployer.address, amount, "Yemo", {
        gasLimit: 100000000,
        gasPrice: 10000000000,
    })
    await defa
        .wait()
        .then((t: ContractReceipt) => {
            logg.silent("Status: ", t.status)
            logg.silent("Gas used: ", t.gasUsed)
            logg.silent("Transaction hash: ", t.transactionHash)
            logg.silent("Contract address: ", t.contractAddress)
            logg.silent("Cumulative gas used: ", t.cumulativeGasUsed)
            logg.silent("Logs: ", t.logs)
            logg.silent("Events: ", t.events)
        })
        .catch((e: any) => {
            logg.error("Error: ", e)
        })

    let defa = await yv.deployed.gDefa(defaID)
    logg.success("Defa: ", defa)
    */
}

yemoVur().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
