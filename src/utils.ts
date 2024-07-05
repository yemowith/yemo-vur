import { balanceOfETH, sendETH } from "@utils/clients/transfers"
import { logg } from "@utils/core/logger"
import { toEther } from "@utils/tools"
import { BigNumber } from "ethers"
import { ethers } from "hardhat"

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

const checkBalance = async (deployer: string) => {
    const balanceD = await balanceOfETH(deployer)
    logg.success("Deployer balance: ", toEther(balanceD))
    if (balanceD.lt(toEther(0.1))) {
        throw new Error("Deployer balance is too low")
    }
}

const accounts = async () => {
    const [deployer, player] = await ethers.getSigners()
    return [deployer, player]
}

export { accounts, chargeC, checkBalance, sleep }
