import { consola, createConsola } from "consola";

const logg = consola;

const logBalance = (balance: number) => {
    logg.info(`Balance: ${balance}`);
}

export  {logg,logBalance};