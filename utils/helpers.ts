import { BigNumber } from "ethers"
import { balanceOfETH, sendETH } from "./clients/transfers"
import { toEther } from "./tools"
import { logg } from "./core/logger"

const chargeC = async (c: string, a: BigNumber) => {
    const b = await balanceOfETH(c)
    if (b < a) {
        logg.info(`Charge ${a} ETH to ${c}`)
        await sendETH(c, toEther(1))
    }
    return b
}

const rndmNum = (maxAmtFlash, minmtFlash) => Math.random() * (maxAmtFlash - minmtFlash) + minmtFlash

export { chargeC, rndmNum }
