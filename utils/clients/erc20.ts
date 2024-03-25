import { ethers } from "hardhat"
import { fromEther } from "../tools"
import { BigNumber } from "ethers"
import { logg } from "../core/logger"

const IERC20 = "@openzeppelin/contracts/token/ERC20/IERC20.sol:IERC20"

const balanceOf = async (address: string, token: string): Promise<any> => {
    const tokenContract = await ethers.getContractAt(IERC20, token)
    const balance = await tokenContract.balanceOf(address)
    const balanceAmount = ethers.utils.formatEther(balance)

    logg.info(`Balance is ${balanceAmount} for address ${address} for token ${token}`)
    return balance
}

const allowance = async (owner: string, spender: string, token: string): Promise<any> => {
    const tokenContract = await ethers.getContractAt(IERC20, token)
    const allowance = await tokenContract.allowance(owner, spender)
    logg.info(
        `Allowance for owner ${owner}, spender ${spender}, token ${token}: ${fromEther(allowance)}`
    )
    return allowance
}

const approve = async (
    spender: string,
    amount: BigNumber,
    token: string,
    gasLimit: number = 500000
): Promise<any> => {
    const tokenContract = await ethers.getContractAt(IERC20, token)
    const approvalResult = await tokenContract.approve(spender, amount, { gasLimit: gasLimit })
    logg.info(
        `Approved spender ${spender} for amount ${ethers.utils.formatEther(
            amount
        )} for token ${token} with a gas limit of ${gasLimit}`
    )
    return approvalResult
}

const transfer = async (
    to: string,
    amount: string,
    token: string,
    gasLimit: number = 500000
): Promise<any> => {
    const tokenContract = await ethers.getContractAt(IERC20, token)
    const transferResult = await tokenContract.transfer(to, amount, { gasLimit: gasLimit })
    logg.info(
        `Transferred amount ${ethers.utils.formatEther(
            amount
        )} to ${to} for token ${token} with a gas limit of ${gasLimit}`
    )
    return transferResult
}
const transferFrom = async (
    from: string,
    to: string,
    amount: string,
    token: string
): Promise<any> => {
    const tokenContract = await ethers.getContractAt(IERC20, token)
    const transferFromResult = await tokenContract.transferFrom(from, to, amount)
    logg.info(
        `Transferred from ${from} to ${to} amount ${ethers.utils.formatEther(
            amount
        )} for token ${token}`
    )
    return transferFromResult
}

export { balanceOf, allowance, approve, transfer, transferFrom }
