import { NetworksUserConfig } from "hardhat/types"
import networksJson from "../../constants/networks.json"
import customNetworksJson from "../../constants/customNetworks.json"

const customNetworks: Network[] = customNetworksJson.customNetworks

type Network = {
    chainId: number
    code: string
    name: string
    isTest: boolean
    isForked: boolean
    rpcServer: string
    linkCode: string
    hasForking?: boolean
    active?: boolean
}

function getNetworks(): Network[] {
    return networksJson.networks
}

function getNetwork({ chainId, code, isTest, isForked }: Network) {
    const filteredNetwork = getNetworks().find(
        (network) =>
            network.chainId === chainId ||
            network.code === code ||
            network.isTest === isTest ||
            network.isForked === isForked
    )

    if (filteredNetwork) {
        return filteredNetwork
    } else {
        throw new Error("Network not found")
    }
}

function getAllNetworks() {
    return getNetworks().map((network: Network) => {
        network.rpcServer = network.rpcServer.replace("https://", "")
        return network
    })
}

function setRPCServer(network: Network) {
    const codes: string[] = ["ETH", "MATIC", "LINEA", "OVM", "AVAX", "ARBITRUM", "STARKNET"]
    const codesTest: string[] = [
        "GOERLI",
        "MUMBAI",
        "SEPOLIA",
        "OPTIMISMSEPOLIA",
        "ARBITRUMSEPOLIA",
    ]
    const isInfura = codes.includes(network.code) || codesTest.includes(network.code) ? true : false
    const infurKEY = process.env.INFURA_KEY
    if (isInfura) {
        network.rpcServer = `https://${network.linkCode}.infura.io/v3/${infurKEY}`
    } else {
        network.rpcServer = `#`
    }

    if (!network.rpcServer.startsWith("https://")) {
        return null
    }

    return network
}

const makeNetworkHardhat = (): NetworksUserConfig => {
    let networks = getAllNetworks().filter((network) => network.active === true)
    let networksModifed: NetworksUserConfig = {}
    networks.forEach((net) => {
        const network = setRPCServer(net)
        if (network !== null) {
            networksModifed[network.code] = {
                accounts: [process.env.PRIVATE_KEY || ""],
                url: net.rpcServer,
                gas: 10000000,
                ...net,
            }
        }
    })

    customNetworks.forEach((net) => {
        networksModifed[net.code] = {
            accounts: [process.env.PRIVATE_KEY || ""],
            url: net.rpcServer,
            gas: 10000000,
            ...net,
        }
    })

    return networksModifed
}

const getNetworkChainIDByCode = (code: string) => {
    const networks = makeNetworkHardhat()
    return networks[code]?.chainId || null
}

export {
    getNetwork,
    getAllNetworks,
    getNetworks,
    setRPCServer,
    makeNetworkHardhat,
    getNetworkChainIDByCode,
}
