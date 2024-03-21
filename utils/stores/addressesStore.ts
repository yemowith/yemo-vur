import { ethers } from "hardhat";
import addresses from "../../constants/addresses.json";
import { Contract } from "ethers";
import { getChainId } from "../tools";
import { logg } from "../core/logger";

interface Address {
  _address: string;
  chainID: string;
  code: string;
}

function getByChainID(chainID: string): Address[] {
  return addresses.filter((address: Address) => address.chainID === chainID);
}

function getByAddress(contractAddress: string): Address | undefined {
  return addresses.find(
    (address: Address) => address._address === contractAddress
  );
}

function getByCode(code: string): Address | undefined {
  return addresses.find((address: Address) => address.code === code);
}

function getAddress(code: string, chainID: string): Address | undefined {
  return addresses.find(
    (address: Address) => address.code === code && address.chainID === chainID
  );
}

function printAddressInfo(address: Address | undefined) {
  if (!address) {
    console.log("Address not found.");
    return;
  }
  console.log(
    `Address Address: ${address._address}, Chain ID: ${address.chainID}, Code: ${address.code}`
  );
}

async function getOrDeploy(
  contractCode: string,
  chainId: string,
  fun: () => Promise<any>
): Promise<Contract> {
  const savedAddress = getAddress(contractCode, chainId);
  if (!savedAddress) {
    let deployed = (await fun()).contracts[0];
    let sdk = await addressHelperSDK(deployed);
    await sdk?.addAddress(contractCode, deployed.address, chainId);
    return deployed;
  } else {
    let contract = await ethers.getContractAt(
      contractCode,
      savedAddress._address
    );
    return contract;
  }
}

async function createContractFactory(
  contractCode: string,
  chainId: string
): Promise<Contract | undefined> {
  const savedAddress = getAddress(contractCode, chainId);
  if (!savedAddress) {
    return undefined;
  } else {
    return await ethers.getContractAt(contractCode, savedAddress._address);
  }
}

// functions to connect to the contract
async function addressHelperSDK(contract?: Contract) {
  let _contract: Contract | undefined = contract;
  if (!contract) {
    _contract = await createContractFactory(
      "AddressesHelpers",
      (
        await getChainId()
      ).chainIdStr
    );
  }

  if (!_contract) {
    logg.error("Address not found for AddressesHelpers");
    return;
  }

  const addressByCode = async (code: string, chainID?: string) => {
    const getAddress = await _contract?.getAAddress(
      code,
      chainID ? chainID : (await getChainId()).chainIdStr
    );

    if (!getAddress) {
      throw new Error("Address not found for code:" + code);
    }
    return getAddress;
  };

  const addAddress = async (
    code: string,
    addressC: string,
    chainID?: string
  ) => {
    const addedNew = await _contract?.addAAddress(
      code,
      addressC,
      chainID ? chainID : (await getChainId()).chainIdStr
    );
    if (!addedNew || addedNew.chainID <= 0) {
      logg.error("Address not found for code:", code);
      return;
    }
    return addedNew;
  };

  const syncAddresses = async () => {
    if (!addresses || addresses.length <= 0) {
      logg.error("no saved addresses found.");
      return;
    }

    logg.info("Syncing addresses... with count addresses: ", addresses.length);
    for (let i = 0; i < addresses.length; i++) {
      const isSynced = await _contract?.isSaved(
        addresses[i].code,
        addresses[i].chainID
      );
      if (isSynced) {
        logg.info("Address already synced for code:", addresses[i].code);
        continue;
      }

      const addedC = await addAddress(
        addresses[i].code,
        addresses[i]._address,
        addresses[i].chainID
      );

      if (!addedC) {
        logg.error("Address not added for code:", addresses[i].code);
        return false;
      } else {
        logg.info("Address added for code:", addresses[i].code);
      }
    }
    return true;
  };

  return { contract, addressByCode, addAddress, syncAddresses };
}

export {
  getByChainID,
  getByAddress,
  getByCode,
  getAddress,
  printAddressInfo,
  getOrDeploy,
  addressHelperSDK,
};
