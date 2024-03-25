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

async function swapper() {
    const [deployer, player] = await ethers.getSigners()
    const _weth = await wethA()

    const yv = await deploy("VSWP")
    await ethers.getContractAt("VSWP", yv.address)
    /*
    const swap = await yv.contract.swapTo(_weth, toEther(rndmNum(minmtFlash, maxAmtFlash)), {
        gasLimit: 10000000,
    }),
    */
    //   await iste.wait()
    // logg.success("Iste: ", iste)
}

swapper().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
