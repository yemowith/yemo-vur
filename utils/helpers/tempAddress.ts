import { logg } from "../core/logger";

class TempAddresses {
  private init: boolean = false;

  addresses: { [key: string]: string } = {};

  constructor() {
    this.init = true;
  }

  initWallets(): void {
    this.init = true;
  }

  addWallet(code: string, address: string): void {
    this.addresses[code] = address;
    logg.info(`Added wallet ${code} with address ${address}`);
    ("");
  }

  addWallets(wallets: { code: string; address: string }[]): void {
    wallets.forEach((wallet) => {
      this.addWallet(wallet.code, wallet.address);
    });
  }

  getWallet(codeOrAddress: string): string | undefined {
    return (
      this.addresses[codeOrAddress] ||
      Object.entries(this.addresses).find(
        ([key, value]) => value === codeOrAddress
      )?.[0]
    );
  }

  printWallet(address: string): string | undefined {
    return Object.entries(this.addresses).find(
      ([key, value]) => value === address
    )?.[0];
  }
}

export default TempAddresses;
