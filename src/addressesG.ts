import { ethers } from "hardhat"

const adrsb = "0x7827d55109484686340c63a48360f8938c4f37bb"

const adrs: Adrs = {
    appProvider: "0xa97684ead0e402dc232d5a977953df7ecbab3cdb",
    swapRouter: "0xe592427a0aece92de3edee1f18e0157c05861564",
    appInsta: "0xa97684ead0e402dC232d5A977953DF7ECBaB3CDb",
    weth: "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
}

export interface Adrs {
    [key: string]: string
}

const aAdrs = (k: string): string => {
    return adrs[k as keyof typeof adrs] as string
}

const dlprA = async () => {
    const [deployer, player] = await ethers.getSigners()
    return await (await ethers.getContractAt("ADRSB", adrsb)).connect(deployer).gAdrs("dplr")
}

const wethA = async () => {
    const [deployer, player] = await ethers.getSigners()
    return await (await ethers.getContractAt("ADRSB", adrsb)).connect(deployer).gAdrs("weth")
}

export { adrsb, aAdrs, adrs as adrsG, dlprA, wethA }
