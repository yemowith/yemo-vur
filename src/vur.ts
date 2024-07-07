import { ethers } from "hardhat"
import { toEther } from "../utils/tools"

import { accounts } from "./utils"
import { logg } from "@utils/core/logger"

const minETH = toEther(0.1)

async function makeYSpace() {
    const [deployer] = await accounts()
    const deploys = [
        {
            name: "YProxy",
            params: [deployer.address],
            address: "",
        },
        {
            name: "YSpace",
            params: [],
            address: "",
        },
    ]

    for (const deploy of deploys) {
        const contract = await ethers.getContractFactory(deploy.name, deployer)
        const instance = await contract.deploy(...deploy.params)
        deploy.address = instance.address
        logg.success(`Deployed ${deploy.name}: ${instance.address}`)
    }

    const getContractOf = (name: string): string => {
        const contractAddress = deploys.find((d) => d.name === name)?.address
        if (!contractAddress) {
            throw new Error(`Contract with name ${name} not found`)
        }
        return contractAddress
    }

    /*
        set proxy of YSpace
    */
    const _YProxy = getContractOf("YProxy")
    await (await ethers.getContractAt("YProxy", _YProxy)).setImplementation(getContractOf("YSpace"))

    logg.info(`Proxy Address: ${_YProxy}`)
    logg.info(`Space Address: ${getContractOf("YSpace")}`)

    return {
        proxy: _YProxy,
        space: getContractOf("YSpace"),
    }
}
async function yemoVur() {
    const [deployer, player] = await ethers.getSigners()
    /* 
    const _VLTFLS = (await contactAt("VLTFLS", VLTFLS)).connect(deployer)
    //const _VLTFLS = await deploy("VLTFLS", [adrs.appProvider, adrs.weth])
    await chargeC(VLTFLS, toEther(0.111))
    await depositWETH(toEther(0.111), adrs.weth, VLTFLS)
    await approve(VLTFLS, toEther(20), adrs.weth)
    await _VLTFLS.start(adrs.weth, toEther(2), { gasLimit: 30000000 })

    return

    const _PY = contactAt("PY", PY)

    const setDDs = async () => {
        const _DDSPF = contactAt("DDSPF", DDSPF)
        await chargeC(DDSPF, minETH)
        const _ddsCache = (await _DDSPF).connect(deployer)
        await _ddsCache.build(deployer.address)
        const ddsCache = await _ddsCache.getProxy(deployer.address)
        logg.success("DDS Cache: ", ddsCache)
        return ddsCache
    }

    await setDDs()

    yemo vur 
    const _yemoVur = await deploy("YemoVur", [
        deployer.address,
        adrsb,
        adrs.weth,
        adrs.appProvider,
        VLTFLS,  
    ])
    await chargeC(_yemoVur.address, minETH)
    await _yemoVur.contract.init({ gasLimit: 30000000 })

    */
}

;(async () => {
    const [deployer, player] = await ethers.getSigners()
    await makeYSpace()
    // await qucickSetup(deployer.address)
    //  await setup("0xf52dbD4300950fB5139becF10F81e94F37cE9074")
})()
