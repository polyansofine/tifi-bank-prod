import React from "react";
import { useWalletModal } from "@pancakeswap/uikit";
import useAuth from "./utils/useAuth";
import { Button } from "@mui/material";
import useTranslation from "./../../context/Localization/useTranslation";

const WalletConnectButton = (props) => {
  // const web3Modal = new Web3Modal({
  //   providerOptions, // required
  // });
  const { t } = useTranslation();
  const { login, logout } = useAuth();
  const { onPresentConnectModal } = useWalletModal(login, logout, t);

  return (
    <Button onClick={onPresentConnectModal} {...props}>
      {t("Connect Wallet")}
    </Button>
  );
};

export default WalletConnectButton;
