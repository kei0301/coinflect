import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

const POLLING_INTERVAL = 12000;
const RPC_URL = "https://bsc-dataseed.binance.org/";
// const RPC_URL = "https://data-seed-prebsc-1-s1.binance.org:8545";

export const injected = new InjectedConnector({
    supportedChainIds: [56],
});

export const walletconnect = new WalletConnectConnector({
    rpc: { 56: RPC_URL },
    bridge: "https://bridge.walletconnect.org",
    qrcode: true,
    pollingInterval: POLLING_INTERVAL,
});

