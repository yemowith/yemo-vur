import { deploy, deployAndVerify } from "../../utils/tools"
import { Contract } from "ethers"
import hre, { ethers } from "hardhat"

async function deployEventter(): Promise<Contract> {
    const [deployer, player] = await ethers.getSigners()
    // Kontratın adresi
    const emitterAddress: string = process.env.EMMITER_ADDRESS || ""
    console.log(`Emitter Address: ${emitterAddress}`)

    return (await deploy("EventEmitter", [deployer.address])).contract
}

async function deployTesterEvents(ad: string): Promise<Contract> {
    // Kontratın adresi
    const emitterAddress: string = process.env.EMMITER_ADDRESS || ""
    console.log(`Emitter Address: ${emitterAddress}`)

    return (await deploy("TestEventSender", [ad])).contract
}

async function wt() {
    const ev = await deployEventter()
    const tev = await deployTesterEvents(ev.address)
    await ev.addAllowedSender(tev.address)
    console.log(ev.address, tev.address)
    return { ev, tev }
}

export { wt }
