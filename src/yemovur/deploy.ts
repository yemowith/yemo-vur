import { ethers } from "hardhat";
import { deploy, DeployResult } from "../../utils/tools";
import { logg } from "../../utils/core/logger";
import { Contract } from "ethers";

const createDeployers = async () => {
  const getDeployer = async () => {
    const [deployer] = await ethers.getSigners();
    return deployer;
  };

  const Deployer = await getDeployer();

  const DPLR = async () => {
    // Code for FactoryAssemblyFactory goes here
    return await deploy("DPLR", []);
  };

  const DSSP = async () => {
    // Code for FactoryAssemblyFactory goes here
    return await deploy("DSSProxyFactory", []);
  };

  const Eventter = async () => {
    // Code for FactoryAssemblyFactory goes here
    return await deploy("EventEmitter", [Deployer.address]);
  };

  // @ts-ignore
  const YemoVur = async () => {
    // Code for FactoryAssemblyFactory goes here
    return await deploy("YemoVur", [Deployer.address]);
  };

  return {
    deployers: {
      DPLR: DPLR,
      DSSP: DSSP,
      Eventter: Eventter,
      YemoVur: YemoVur,
    },

    Deployer: Deployer,
  };
};

const deployFirstContracts = async () => {
  const created_deployers = await createDeployers();

  return {
    DPLR: (await created_deployers.deployers.DPLR()).address,
    DSSP: (await created_deployers.deployers.DSSP()).address,
    Eventter: (await created_deployers.deployers.Eventter()).address,
    YemoVur: (await created_deployers.deployers.YemoVur()).address,
  };
};

export { deployFirstContracts };
