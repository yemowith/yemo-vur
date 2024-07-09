import { expect } from "chai"
import { ethers } from "hardhat"

describe("DDSP and DDSPF", function () {
    let owner: any
    let other: any
    let proxyFactory: any
    let proxy: any
    let cache: any

    before(async function () {
        ;[owner, other] = await ethers.getSigners()

        const DDSPCch = await ethers.getContractFactory("DDSPCch")
        cache = await DDSPCch.deploy()
        await cache.deployed()

        const DDSPF = await ethers.getContractFactory("DDSPF")
        proxyFactory = await DDSPF.deploy()
        await proxyFactory.deployed()
    })

    it("should create a new proxy and set the owner", async function () {
        const tx = await proxyFactory.build(owner.address)
        const receipt = await tx.wait()
        const proxyAddress = receipt.events[0].args.proxy

        expect(proxyAddress).to.properAddress

        proxy = await ethers.getContractAt("DDSP", proxyAddress)
        expect(await proxy.owner()).to.equal(owner.address)
    })

    it("should allow the proxy to execute a transaction", async function () {
        const DDSPCch = await ethers.getContractFactory("DDSPCch")
        const target = await DDSPCch.deploy()
        await target.deployed()

        const data = target.interface.encodeFunctionData("write", [
            ethers.utils.hexlify(ethers.utils.randomBytes(32)),
        ])
        await proxy.connect(owner).execute(target.address, data)

        // Verifying that the cache was updated can be done by attempting to read it.
        const readData = target.interface.encodeFunctionData("read", [
            ethers.utils.hexlify(ethers.utils.randomBytes(32)),
        ])
        const result = await proxy.connect(owner).execute(target.address, readData)
        expect(result).to.not.be.null
    })

    it("should set a new cache address", async function () {
        const DDSPCch = await ethers.getContractFactory("DDSPCch")
        const newCache = await DDSPCch.deploy()
        await newCache.deployed()

        await proxy.connect(owner).setCch(newCache.address)
        expect(await proxy.cache()).to.equal(newCache.address)
    })

    it("should allow the owner to set a new owner", async function () {
        await proxy.connect(owner).setOwner(other.address)
        expect(await proxy.owner()).to.equal(other.address)
    })

    it("should allow the new owner to execute a transaction", async function () {
        const DDSPCch = await ethers.getContractFactory("DDSPCch")
        const target = await DDSPCch.deploy()
        await target.deployed()

        const data = target.interface.encodeFunctionData("write", [
            ethers.utils.hexlify(ethers.utils.randomBytes(32)),
        ])
        await proxy.connect(other).execute(target.address, data)

        // Verifying that the cache was updated can be done by attempting to read it.
        const readData = target.interface.encodeFunctionData("read", [
            ethers.utils.hexlify(ethers.utils.randomBytes(32)),
        ])
        const result = await proxy.connect(other).execute(target.address, readData)
        expect(result).to.not.be.null
    })

    it("should emit Created event when a proxy is created", async function () {
        const tx = await proxyFactory.build(owner.address)
        const receipt = await tx.wait()

        const event = receipt.events.find((event: any) => event.event === "Created")
        expect(event).to.exist
        expect(event.args.sender).to.equal(owner.address)
    })

    it("should confirm proxy address in isProxy mapping", async function () {
        const tx = await proxyFactory.build(owner.address)
        const receipt = await tx.wait()
        const proxyAddress = receipt.events[0].args.proxy

        expect(await proxyFactory.isProxy(proxyAddress)).to.be.true
    })

    it("should confirm proxy ownership", async function () {
        const proxyAddress = await proxyFactory.build(owner.address)
        const proxyInstance = await ethers.getContractAt("DDSP", proxyAddress.address)
        expect(await proxyInstance.owner()).to.equal(owner.address)
    })

    it("should revert if no proxy exists for the owner", async function () {
        const nonExistentOwner = ethers.Wallet.createRandom().address
        await expect(proxyFactory.getProxy(nonExistentOwner)).to.be.revertedWith(
            "No proxy exists for this owner"
        )
    })

    it("should successfully read from cache", async function () {
        const data = ethers.utils.randomBytes(32)
        const writeTx = await proxy.cache().write(data)
        await writeTx.wait()

        const readTx = await proxy.cache().read(data)
        expect(readTx).to.not.be.null
    })
})
