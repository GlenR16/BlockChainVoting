import localforage from "localforage";
import localForage from "localforage";

localForage.config({
    driver: [
        localForage.INDEXEDDB,
        localForage.LOCALSTORAGE,
        localForage.WEBSQL,
    ],
    name: 'BlockchainVoting',
    version: 1.0,
});

export const GeneralStore = localforage.createInstance({
    name: "BlockchainVoting",
    storeName: "General"
});