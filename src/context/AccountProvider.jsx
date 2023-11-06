import { createContext,useContext,useCallback,useMemo,useState } from "react";
import { GeneralStore } from "./StorageProvider";

var accountsList = await GeneralStore.getItem("accountsList") || []

const AccountContext = createContext(accountsList);

export function useAccount() {
    const account = useContext(AccountContext);
    return account;
}

export function AccountProvider({ children }) {
    const [account, setAccount] = useState(accountsList);

    const changeAccount = useCallback((newAccount) => {
        if (!newAccount){
            throw Error("No accounts connected !")
        }
        accountsList = newAccount
        GeneralStore.setItem("accountsList",accountsList)
        setAccount(accountsList);
    }, []);

    const deleteAllAccount = useCallback(() => {
        accountsList = []
        GeneralStore.removeItem("accountsList")
        setAccount(accountsList);
    },[])

    const value = useMemo(
        () => ({ account, changeAccount,deleteAllAccount }),
        [account, changeAccount,deleteAllAccount]
    );

    return (
        <AccountContext.Provider value={value}>
            {children}
        </AccountContext.Provider>
    );
}