import { Contract } from "ethers"
import { ethers } from "hardhat"

export interface IYemoKit {
    YK: Contract
    eemt: Contract
    dplr: Contract
    dsspf: Contract
    stg: Contract
    adrsb: Contract
}

const YemoKit = async (address: string): Promise<IYemoKit> => {
    const YK = await ethers.getContractAt("YemoKit", address)

    let eemt = await ethers.getContractAt("EEMT", await YK.eemt())
    let dplr = await ethers.getContractAt("DPLR", await YK.dplr())
    let dsspf = await ethers.getContractAt("DDSP", await YK.dsspf())
    let stg = await ethers.getContractAt("STG", await YK.stg())
    let adrsb = await ethers.getContractAt("ADRSB", await YK.adrsb())

    return {
        YK,
        eemt,
        dplr,
        dsspf,
        stg,
        adrsb,
    }
}
export { YemoKit }
