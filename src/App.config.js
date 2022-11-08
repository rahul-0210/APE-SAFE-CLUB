export const BASE_URL = 'http://localhost:3000'

export const COINGECKO_PRICE_END_POINT =
    'https://raw.githubusercontent.com/ForwardProtocol/TokenList/main/token-list.json'

export const VALID_APP_NETWORK = 56
export const VALID_APP_NETWORK_NAME = 'BSC'
export const VALID_APP_NETWORK_HEX = '0x56'
export const CURRENT_CHAIN_BLOCK_TIME = 3

export const ALLOWED_NETWORKS = {
    FARMING: VALID_APP_NETWORK,
    STAKING: VALID_APP_NETWORK,
}

export const PATH_HEADER_TEXT_MAPPING = {
    '/staking': 'Ape Farms',
    '/lottery': 'Lottery',
    '/coin-flip': 'Coin Flip',
}

export const CONTRACT_ADDRESS = {
    TGC_BNB: {
        STAKING: process.env.REACT_APP_TGC_BNB_STAKING_CONTRACT_ADDRESS,
        TOKEN: process.env.REACT_APP_TGC_BNB_TOKEN_ADDRESS,
    },
    TGC_USDT: {
        STAKING: process.env.REACT_APP_TGC_USDT_STAKING_CONTRACT_ADDRESS,
        TOKEN: process.env.REACT_APP_TGC_USDT_TOKEN_ADDRESS,
    },
    TGC_BUSD: {
        FARMING: process.env.REACT_APP_TGC_BUSD_FARMING_CONTRACT_ADDRESS,
        LPTOKEN: process.env.REACT_APP_TGC_BUSD_LPTOKEN_CONTRACT_ADDRESS,
        STAKING: process.env.REACT_APP_TGC_BUSD_STAKING_CONTRACT_ADDRESS,
        TOKEN: process.env.REACT_APP_TGC_BUSD_TOKEN_ADDRESS,
    },
    DRIP: {
        STAKING: process.env.REACT_APP_TGC_DRIP_STAKING_CONTRACT_ADDRESS,
        TOKEN: process.env.REACT_APP_TGC_DRIP_TOKEN_ADDRESS,
    },
}
export const SUPPORTED_CHAINID = process.env.REACT_APP_SUPPORTED_CHAINID
    ? JSON.parse(process.env.REACT_APP_SUPPORTED_CHAINID)
    : []

export const FARMING_CONTRACT = '0x21C2f287ccA66205249dBBE513175E3BceB1b31d'
export const LPTOKEN_CONTRACT = '0xccBcf7Cb22C7327734160274f11e348c6eE97518'
