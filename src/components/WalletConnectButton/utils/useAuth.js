import { useCallback } from "react";
import { UnsupportedChainIdError } from "@web3-react/core";
import { NoBscProviderError } from "@binance-chain/bsc-connector";
import {
    NoEthereumProviderError,
    UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from "@web3-react/injected-connector";
import {
    UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
    WalletConnectConnector,
} from "@web3-react/walletconnect-connector";
import { connectorLocalStorageKey } from "@pancakeswap/uikit";
import { connectorsByName } from "./web3React";
import { setupNetwork } from "./wallet";
import useActiveWeb3React from "./useActiveWeb3React";

const useAuth = () => {
    // const { t } = useTranslation();
    // const dispatch = useAppDispatch();
    const { activate, deactivate } = useActiveWeb3React();
    // const { toastError } = useToast();

    const login = useCallback(
        (connectorID) => {
            const connector = connectorsByName[connectorID];
            if (connector) {
                activate(connector, async (error) => {
                    if (error instanceof UnsupportedChainIdError) {
                        const hasSetup = await setupNetwork();
                        if (hasSetup) {
                            activate(connector);
                        }
                    } else {
                        window.localStorage.removeItem(connectorLocalStorageKey);
                        if (
                            error instanceof NoEthereumProviderError ||
                            error instanceof NoBscProviderError
                        ) {
                        } else if (
                            error instanceof UserRejectedRequestErrorInjected ||
                            error instanceof UserRejectedRequestErrorWalletConnect
                        ) {
                            if (connector instanceof WalletConnectConnector) {
                                const walletConnector = connector;
                                walletConnector.walletConnectProvider = null;
                            }
                        }
                    }
                });
            }
        },
        [activate]
    );

    const logout = useCallback(() => {
        // dispatch(profileClear());
        deactivate();
        // This localStorage key is set by @web3-react/walletconnect-connector
        if (window.localStorage.getItem("walletconnect")) {
            connectorsByName.walletconnect.close();
            connectorsByName.walletconnect.walletConnectProvider = null;
        }
    }, [deactivate]);

    return { login, logout };
};

export default useAuth;
