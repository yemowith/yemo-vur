import { expect } from "chai"
import { ethers } from "hardhat"
import { YESpace } from "../../typechain-types"

describe("YESpace", function () {
    let yespace: YESpace
    let owner: any
    let addr1: any
    let addr2: any

    beforeEach(async function () {
        ;[owner, addr1, addr2] = await ethers.getSigners()

        const YESpace = await ethers.getContractFactory("YESpace")
        yespace = await YESpace.deploy()
        await yespace.deployed()
    })

    it("Should change the salt value", async function () {
        const newSalt = ethers.utils.formatBytes32String("newSalt")
        await yespace.changeSalt(newSalt)
        expect(await yespace.getSalt()).to.equal(newSalt)
    })

    it("Should store and retrieve data", async function () {
        const key = "testKey"
        const value = ethers.utils.toUtf8Bytes("testValue")

        await yespace.setData(key, value)
        const storedValue = await yespace.getData(key)
        expect(storedValue).to.equal(ethers.utils.hexlify(value))
    })

    it("Should store and retrieve addresses", async function () {
        const key = "testAddress"
        await yespace.setAddress(key, addr1.address)
        const storedAddress = await yespace.getAddress(key)
        expect(storedAddress).to.equal(addr1.address)
    })

    it("Should encode and decode data correctly", async function () {
        const data = ethers.utils.toUtf8Bytes("testData")
        const encodedData = await yespace.encode(data)
        const decodedData = await yespace.decode(encodedData)
        expect(decodedData).to.equal(ethers.utils.hexlify(data))
    })

    it("Should deploy a contract", async function () {
        const ContractFactory = await ethers.getContractFactory("YESpace")
        const bytecode = ContractFactory.bytecode

        const deployedAddress = await yespace.deploy(bytecode)
        expect(deployedAddress).to.properAddress
    })

    it("Should execute a function call on a target contract", async function () {
        const ContractFactory = await ethers.getContractFactory("YESpace")
        const contractInstance = await ContractFactory.deploy()
        await contractInstance.deployed()

        const callData = contractInstance.interface.encodeFunctionData("setData", [
            "key",
            ethers.utils.toUtf8Bytes("value"),
        ])

        await yespace.execute(contractInstance.address, callData)

        const storedData = await contractInstance.getData("key")
        expect(storedData).to.equal(ethers.utils.hexlify(ethers.utils.toUtf8Bytes("value")))
    })

    it("Should execute multiple function calls on target contracts", async function () {
        const ContractFactory = await ethers.getContractFactory("YESpace")
        const contractInstance1 = await ContractFactory.deploy()
        const contractInstance2 = await ContractFactory.deploy()
        await contractInstance1.deployed()
        await contractInstance2.deployed()

        const callData1 = contractInstance1.interface.encodeFunctionData("setData", [
            "key1",
            ethers.utils.toUtf8Bytes("value1"),
        ])
        const callData2 = contractInstance2.interface.encodeFunctionData("setData", [
            "key2",
            ethers.utils.toUtf8Bytes("value2"),
        ])

        await yespace.multiExecute(
            [contractInstance1.address, contractInstance2.address],
            [callData1, callData2]
        )

        const storedData1 = await contractInstance1.getData("key1")
        const storedData2 = await contractInstance2.getData("key2")
        expect(storedData1).to.equal(ethers.utils.hexlify(ethers.utils.toUtf8Bytes("value1")))
        expect(storedData2).to.equal(ethers.utils.hexlify(ethers.utils.toUtf8Bytes("value2")))
    })

    it("Should execute a static function call on a target contract", async function () {
        const ContractFactory = await ethers.getContractFactory("YESpace")
        const contractInstance = await ContractFactory.deploy()
        await contractInstance.deployed()

        const callData = contractInstance.interface.encodeFunctionData("getData", ["key"])

        await contractInstance.setData("key", ethers.utils.toUtf8Bytes("value"))
        const result = await yespace.executeStatic(contractInstance.address, callData)
        expect(result).to.equal(ethers.utils.hexlify(ethers.utils.toUtf8Bytes("value")))
    })

    it("Should aggregate multiple calls", async function () {
        const ContractFactory = await ethers.getContractFactory("YESpace")
        const contractInstance = await ContractFactory.deploy()
        await contractInstance.deployed()

        const calls = [
            {
                target: contractInstance.address,
                callData: contractInstance.interface.encodeFunctionData("setData", [
                    "key",
                    ethers.utils.toUtf8Bytes("value"),
                ]),
            },
            {
                target: contractInstance.address,
                callData: contractInstance.interface.encodeFunctionData("getData", ["key"]),
            },
        ]

        const [blockNumber, returnData] = await yespace.aggregate(calls)
        expect(returnData[1]).to.equal(ethers.utils.hexlify(ethers.utils.toUtf8Bytes("value")))
    })

    it("Should aggregate multiple calls with failure handling", async function () {
        const ContractFactory = await ethers.getContractFactory("YESpace")
        const contractInstance = await ContractFactory.deploy()
        await contractInstance.deployed()

        const calls = [
            {
                target: contractInstance.address,
                allowFailure: true,
                callData: contractInstance.interface.encodeFunctionData("setData", [
                    "key",
                    ethers.utils.toUtf8Bytes("value"),
                ]),
            },
            {
                target: contractInstance.address,
                allowFailure: true,
                callData: contractInstance.interface.encodeFunctionData("getData", ["key"]),
            },
        ]

        const results = await yespace.aggregate3(calls)
        expect(results[1].returnData).to.equal(
            ethers.utils.hexlify(ethers.utils.toUtf8Bytes("value"))
        )
    })
})
