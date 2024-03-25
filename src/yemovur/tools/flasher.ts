import { ethers, tenderly } from "hardhat"
import { deploy, fromEther, toEther } from "../../../utils/tools"
import { balanceOfETH, sendETH } from "../../../utils/clients/transfers"
import { logg } from "../../../utils/core/logger"
import { BigNumber } from "ethers"
import { approve, balanceOf } from "@utils/clients/erc20"
import { Adrs, adrsb, adrsG, dlprA, wethA } from "../../addressesG"
import { chargeC, rndmNum } from "@utils/helpers"
import { depositWETH, getWETH } from "@utils/clients/weth"

const adrs: Adrs = adrsG

async function flash() {
    const [deployer, player] = await ethers.getSigners()

    const minAmt = 0.001
    const maxAmtFlash = 0.50013045,
        minmtFlash = 0.4040025

    const _weth = await wethA()

    const yv = await deploy("VLTFLS", [adrs.appProvider, adrsb])
    await ethers.getContractAt("VLTFLS", yv.address)

    await chargeC(yv.address, toEther(minAmt))

    await depositWETH(toEther(minAmt), yv.address, _weth)

    const balanceETH = await balanceOfETH(yv.address)
    const balancWETH = await balanceOf(yv.address, _weth)

    const iste = await yv.contract.start(_weth, toEther(rndmNum(minmtFlash, maxAmtFlash)), {
        gasLimit: 10000000,
    })
    //   await iste.wait()
    // logg.success("Iste: ", iste)
}

flash().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
