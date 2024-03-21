import { YemoVur } from "./../../typechain-types/contracts/YemoVur/YemoVur.sol/YemoVur";
import { ethers } from "hardhat";
import { deployFirstContracts } from "./deploy";
import { logg } from "../../utils/core/logger";
import { deploy } from "../../utils/tools";
import { sendETH } from "../../utils/clients/transfers";

const firstDeploy = true;
let addresses = {
  DPLR: "",
  DSSP: "",
  Eventter: "",
  YemoVur: "",
};

const makeDeploying = async () => {
  if (firstDeploy) {
    let dpdrs = await deployFirstContracts();
    addresses = { ...dpdrs };
  }

  return {
    DPLR: await ethers.getContractAt("DPLR", addresses.DPLR),
    DSSP: await ethers.getContractAt("DSSProxyFactory", addresses.DSSP),
    Eventter: await ethers.getContractAt("EventEmitter", addresses.Eventter),
    YemoVur: await ethers.getContractAt("YemoVur", addresses.YemoVur),
  };
};

const calculateGas = async (tx: any) => {
  const receipt = await tx.wait();
  const gasUsed = receipt.gasUsed;
  const gasPrice = await ethers.provider.getGasPrice();
  return gasUsed.mul(gasPrice);
};

const setup = async () => {
  logg.info("Deploying contracts...");
  let { DPLR, DSSP, Eventter, YemoVur } = await makeDeploying();

  await new Promise((resolve) => setTimeout(resolve, 100));

  await Eventter.addAllowedSender(YemoVur.address);

  await YemoVur.init(DPLR.address, DSSP.address, Eventter.address);

  return {
    dldct: { DPLR, DSSP, Eventter, YemoVur },
  };
};

async function yemoVur() {
  const [deployer, player] = await ethers.getSigners();

  const { dldct } = await setup();

  // yemo buraya geldin
  // devam etmeden once eth gönder YemoVura

  /*
    const YemoVur = (await _deployers.YemoVur(_deployers.Deployer.address, DSSPADR, EventterADR)).contract
    const YemoVurADR = YemoVur.address

    await Eventter.addAllowedSender(YemoVurADR)
    logg.info('Eventter: addAllowedSender', YemoVurADR)

    */

  logg.info("Addresses: ");
  console.table(addresses);
}

yemoVur().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
