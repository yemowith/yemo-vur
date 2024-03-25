import { ethers } from "hardhat"
import { fromEther } from "../tools"
import { BigNumber } from "ethers"
import { TransactionResponse } from "@ethersproject/providers"
import { logg } from "@utils/core/logger"

const balanceOfETH = async (address: string): Promise<any> => {
    logg.info(`Fetching ETH balance for address ${address}`)
    const balance = await ethers.provider.getBalance(address)
    const ethAmount = ethers.utils.formatEther(balance)
    logg.info(`ETH Balance for address ${address}: ${ethAmount}`)
    return balance
}

const sendETH = async (to: string, amount: BigNumber): Promise<TransactionResponse | null> => {
    const [deployer, player] = await ethers.getSigners()
    const ethAmount = ethers.utils.formatEther(amount)
    console.log(`Sending ETH amount ${ethAmount} to ${to} using signer`)

    const transaction = {
        to: to,
        value: amount,
        gasLimit: 1000000,
    }
    const sendResult = await deployer.sendTransaction(transaction)
    console.log(`Sent ETH amount ${ethAmount} to ${to} using signer`)
    return sendResult
}

export { balanceOfETH, sendETH }
