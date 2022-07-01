export const Currencys = ['USD', 'CAD', "GBP", "EUR", "JPY", "CNY", "BRL", 'IDR', 'ETB', 'NGN', 'INR', 'VND'];


export const netId = 56;
export const TotalPoolNum = 16;

export const reward_test = {
    abi: {
        CFLT: require("../config/abis/cflt-test.json"),
        AER: require("../config/abis/aer-test.json"),
        PFT: require("../config/abis/pft-test.json"),
        FFT: require("../config/abis/fft-test.json"),
        WNOW: require("../config/abis/wnow-test.json"),
        LLN: require("../config/abis/lln-test.json"),
        FCF: require("../config/abis/fcf-test.json"),
    },
    address: {
        CFLT: "0x083C90716e55463f6518d6FF9c15683F46F7C2bc",
        AER: "0x8FaF7982314271B86125EA8AEB3A10Ced7287428",
        PFT: "0x71e3764a8B13a2c795d4554762e379E4dc2Fd60b",
        FFT: "0xb05bBB828e6b39Bf9676F099d311ca9e12d4F077",
        WNOW: "0x8Fb6aeD7529438fb0364ccDAf86046fbb01DCC86",
        LLN: "0xc192283FE4D98f1B3b94fe772a63F64F93F6D581",
        FCF: "0x2BBF44A2BC4406B3DBBAD68FBd1273aB6E7d4Aee"
    }
}


export const Tokens = {
    abi: {
        CFLT: require("../config/abis/cflt-main.json"),
        AER: require("../config/abis/aer-main.json"),
        PFT: require("../config/abis/pft-main.json"),
        FFT: require("../config/abis/fft-main.json"),
        WNOW: require("../config/abis/wnow-main.json"),
        LLN: require("../config/abis/lln-main.json"),
        FCF: require("../config/abis/fcf-main.json"),
        WRAITH: require("../config/abis/wraith-main.json"),
        DAPES: require("../config/abis/dapes-main.json"),
        ADREAM: require("../config/abis/adream-main.json")
    },
    address: {
        CFLT: "0x04305e84400F70B778868FD5226A6135D8Fe151D",
        AER: "0xc7Ad2CE38f208eED77a368613C62062fCE88f125",
        PFT: "0x8806A68Bc665baaefaE1f716da42A2443c15bb2f",
        FFT: "0x32B20aC6A7f14d334dFc77bd818e1D80F5E49D7e",
        WNOW: "0x56AA0237244C67B9A854B4Efe8479cCa0B105289",
        LLN: "0x2A354f59ED1dd485129891E718865eB55ebdB8b3",
        FCF: "0x4673f018cc6d401AAD0402BdBf2abcBF43dd69F3",
        WRAITH: '0x8690cb98496ef0f8c6417d78b5e0e29907668808',
        DAPES: '0x1758ADe7ef6Ef753E6BfF91BaCeB06af4404014e',
        ADREAM: '0x45c4b4b718f7e2df5c22eff8a2bb79e9090a428d'
    },
}

export const Pools = {
    pools: {
        cfltAer: "0x8f67C86F9002a90e3e02C28FF330a6E69c93B0A2",
        aerCflt: "0xEED3971151d94Ddc5A7A0d9563b473CbFb189DCf",
        cfltPft: "0xc566B132598E209d6C167DB67A5eee3415428718",
        pftCflt: "0xe7a58261F56bbf01E4533e73E069A409e760B508",
        cfltFft: "0xdC51648C7d87990C30Ab5377a09c8ED73D5f3433",
        fftCflt: "0x5208945591D48fb5c1236EfaC37A0075ceE7F840",
        cfltWnow: "0x4276aaa00c23E64f788297cb9ED074aF9C6AA3CD",
        wnowCflt: "0x36131f06CfEb6E2C5a4E0e6d89d0F724CA639F5A",
        cfltLln: "0x517e8f49feb129De21bc9346a72B642af5D1422D",
        llnCflt: "0x6d03d28390EED163e4Ac9F67Fc2DF3B1850A0Fe7",
        cfltFcf: "0x1D144d201297f96A512A574Edb9f817A7e37C4Ef",
        fcfCflt: "0x9c0afee569B2c253f8B575C291a7c32E92D060c4",
        cfltWraith: "0x0903149213f3a0a1573E0F82b88bE54c7E8432a5",
        wraithCflt: "0x5B84e5Ef8A1F2eB781C9e2e23F64086865f423f9",
        cfltDapes: "0x83Bbf9c57C4Ed80DB132756B4d714257B86C6825",
        dapesCflt: "0x1Fdcad36186dB1B148D2c70AbC2aa9B9340Fe483",
    }
}

export const Pools_test = {
    abi: {
        cflt_aer: require("../config/abis/cflt-aer.json"),
        aer_cflt: require("../config/abis/aer-cflt.json"),
        cflt_fcf: require("../config/abis/cflt-fcf.json"),
        fcf_cflt: require("../config/abis/fcf-cflt.json"),
        cflt_pft: require("../config/abis/cflt-pft.json"),
        pft_cflt: require("../config/abis/pft-cflt.json"),
        cflt_lln: require("../config/abis/cflt-lln.json"),
        lln_cflt: require("../config/abis/lln-cflt.json"),
        cflt_fft: require("../config/abis/cflt-fft.json"),
        fft_cflt: require("../config/abis/fft-cflt.json"),
        cflt_wnow: require("../config/abis/cflt-wnow.json"),
        wnow_cflt: require("../config/abis/wnow-cflt.json")
    },
    address: {
        cflt_aer: "0xeAA4A4d71bcD62C0369618128F612D9eED3C21AA",
        aer_cflt: "0x08A637596042e2006785F077a79bccfb23d26D7F",
        cflt_fcf: "0xBEe698ED44be0E465649CcC670Dfe83A6321b924",
        fcf_cflt: '0x374126E8d743D04a7e1cD6Ab49ce3eA0CE1A69E8',
        cflt_pft: '0x27fEdc59793c3aD7d0afFA3c37E2DDFd32B1b691',
        pft_cflt: '0x83ee95715998345412eaDb0b61076963ab90E1c2',
        cflt_lln: '0x0b2C0e573967c2a2f548dd2882c1b3dc34DCe782',
        lln_cflt: '0xDD352C54FBE9462621248114552456C380851da7',
        cflt_fft: '0x7beB8c428a0ccB19a0F90044060175bD9620164D',
        fft_cflt: '0x7EA2DD12B98AC006d13596c8331548a87fe257F9',
        cflt_wnow: '0x598E30cEbe914a43360Bd678dc5f5317C2667327',
        wnow_cflt: '0xe87BfdDFdb1e2494e1478f1bCc424FFAc02D9Ad4'
    }
}



export const Vaults = [
    {
        id: 'cflt_aer',
        tokenName: ["Coinflect", "Aerdrop"],
        tokenId: ["CFLT", "AER"],
        status: true,
        chart: {
            id: ["AER2", "CFLT"],
            name: "Aerdrop",
            url: "https://nomics.com/images/sparkline/assets/AER2-USD-1d.svg",
            nomicsUrl: "https://nomics.com/assets/aer2-aerdrop"
        },
        vault: {
            address: '0xEd6989cE81C51Cb3f6bBd5fAb95D70017b738293',
            abi: require("../config/abis/cflt-aer.json"),
        },
        search: "Aerdrop"
    },
    {
        id: 'aer_cflt',
        tokenName: ["Aerdrop", "Coinflect"],
        tokenId: ["AER", "CFLT"],
        status: true,
        chart: {
            id: ["CFLT", 'AER2'],
            name: "Coinflect",
            url: "https://nomics.com/images/sparkline/assets/CFLT-USD-1d.svg",
            nomicsUrl: "https://nomics.com/assets/cflt-coinflect"
        },
        vault: {
            address: '0x12c27543a1c2C7113241B144A855Ab4F16BbB447',
            abi: require("../config/abis/aer-cflt.json"),
        },
        search: "Aerdrop cflt coinflect"
    },
    {
        id: 'cflt_fcf',
        tokenName: ["Coinflect", "French"],
        tokenId: ["CFLT", "FCF"],
        status: true,
        chart: {
            id: ["FCF", 'CFLT'],
            name: "French Connection Finance",
            url: "https://nomics.com/images/sparkline/assets/FCF-USD-1d.svg",
            nomicsUrl: "https://nomics.com/assets/fcf-french-connection-finance"
        },
        vault: {
            address: '0x4d540b8433AcF21E2b9e2cBB6ffAdF68E6E25B2B',
            abi: require("../config/abis/cflt-fcf.json"),
        },
        search: "French Connection Finance FCF"
    },
    {
        id: 'fcf_cflt',
        tokenName: ["French", "Coinflect"],
        tokenId: ["FCF", "CFLT"],
        status: true,
        chart: {
            id: ["CFLT", "FCF"],
            name: "Coinflect",
            url: "https://nomics.com/images/sparkline/assets/CFLT-USD-1d.svg",
            nomicsUrl: "https://nomics.com/assets/cflt-coinflect"
        },
        vault: {
            address: "0xf3D525DC0159636aA8FeaF86023131db77c5CA4D",
            abi: require("../config/abis/fcf-cflt.json"),
        },
        search: "French Connection Finance FCF cflt coinflect"
    },
    {
        id: 'cflt_pft',
        tokenName: ["Coinflect", "Pitch"],
        tokenId: ["CFLT", "PFT"],
        status: true,
        chart: {
            id: ["PFT2", "CFLT"],
            name: "Pitch Finance",
            url: "https://nomics.com/images/sparkline/assets/PFT2-USD-1d.svg",
            nomicsUrl: "https://nomics.com/assets/pft2-pitch-finance"
        },
        vault: {
            address: "0xA8E1fB5dBadA1e9F59BeBDB256973B70694Eb94f",
            abi: require("../config/abis/cflt-pft.json"),
        },
        search: "Pitch Finance PFT"
    },
    {
        id: 'pft_cflt',
        tokenName: ["Pitch", "Coinflect"],
        tokenId: ["PFT", "CFLT"],
        status: true,
        chart: {
            id: ["CFLT", "PFT2"],
            name: "Coinflect",
            url: "https://nomics.com/images/sparkline/assets/CFLT-USD-1d.svg",
            nomicsUrl: "https://nomics.com/assets/cflt-coinflect"
        },
        vault: {
            address: "0xbF16Aa0E2FF2d0115927aEf91263325581c28761",
            abi: require("../config/abis/pft-cflt.json"),
        },
        search: "Pitch Finance PFT cflt coinflect"
    },
    {
        id: 'cflt_lln',
        tokenName: ["Coinflect", "LunaLand"],
        tokenId: ["CFLT", "LLN"],
        status: true,
        chart: {
            id: ["LLN", "CFLT"],
            name: "LunaLand",
            url: "https://nomics.com/images/sparkline/assets/LLN-USD-1d.svg",
            nomicsUrl: "https://nomics.com/assets/lln-lunaland"
        },
        vault: {
            address: "0x933F0A4Aa116a492b428BC684188eB5E4FAFF276",
            abi: require("../config/abis/cflt-lln.json"),
        },
        search: "LunaLand LLN"
    },
    {
        id: 'lln_cflt',
        tokenName: ["LunaLand", "Coinflect"],
        tokenId: ["LLN", "CFLT"],
        status: true,
        chart: {
            id: ["CFLT", "LLN"],
            name: "Coinflect",
            url: "https://nomics.com/images/sparkline/assets/CFLT-USD-1d.svg",
            nomicsUrl: "https://nomics.com/assets/cflt-coinflect"
        },
        vault: {
            address: "0x1d2812DA79Df121dB3C5c804e63e1e2f94107a36",
            abi: require("../config/abis/lln-cflt.json"),
        },
        search: "LunaLand LLN cflt coinflect"
    },
    {
        id: 'cflt_fft',
        tokenName: ["Coinflect", "Flocki"],
        tokenId: ["CFLT", "FFT"],
        status: true,
        chart: {
            id: ["FFT2", "CFLT"],
            name: "Flocki Finance",
            url: "https://nomics.com/images/sparkline/assets/FFT2-USD-1d.svg",
            nomicsUrl: "https://nomics.com/assets/fft2-flocki-finance"
        },
        vault: {
            address: "0x2E8C81ad4d3173c68C72a8434cC7B87f388ffB2B",
            abi: require("../config/abis/cflt-fft.json"),
        },
        search: "Flocki Finance FFT"
    },
    {
        id: 'fft_cflt',
        tokenName: ["Flocki", "Coinflect"],
        tokenId: ["FFT", "CFLT"],
        status: true,
        chart: {
            id: ["CFLT", "FFT2"],
            name: "Coinflect",
            url: "https://nomics.com/images/sparkline/assets/CFLT-USD-1d.svg",
            nomicsUrl: "https://nomics.com/assets/cflt-coinflect"
        },
        vault: {
            address: "0x9Ee10e76a19ADDb648065e5d3A32dB60228f82Df",
            abi: require("../config/abis/fft-cflt.json"),
        },
        search: "Flocki Finance FFT cflt coinflect"
    },
    {
        id: 'cflt_wnow',
        tokenName: ["Coinflect", "WalletNow"],
        tokenId: ["CFLT", "WNOW"],
        status: true,
        chart: {
            id: ["WNOW", "CFLT"],
            name: "WalletNow",
            url: "https://nomics.com/images/sparkline/assets/WNOW-USD-1d.svg",
            nomicsUrl: "https://nomics.com/assets/wnow-walletnow"
        },
        vault: {
            address: "0xa7ac1EEa647beB444f790a5A7231Bc23e57a05B2",
            abi: require("../config/abis/cflt-wnow.json"),
        },
        search: "WalletNow WNOW"
    },
    {
        id: 'wnow_cflt',
        tokenName: ["WalletNow", "Coinflect"],
        tokenId: ["WNOW", "CFLT"],
        status: true,
        chart: {
            id: ["CFLT", "WNOW"],
            name: "Coinflect",
            url: "https://nomics.com/images/sparkline/assets/CFLT-USD-1d.svg",
            nomicsUrl: "https://nomics.com/assets/cflt-coinflect"
        },
        vault: {
            address: "0x09a9DF40D5127F2b7c6B6e1724834b5BAF3179f9",
            abi: require("../config/abis/wnow-cflt.json"),
        },
        search: "WalletNow WNOW cflt coinflect"
    },
    {
        id: 'cflt_Wraith',
        tokenName: ["Coinflect", "Wraith"],
        tokenId: ["CFLT", "WRAITH"],
        status: true,
        chart: {
            id: ["WRAITH2", "CFLT"],
            name: "Wraith",
            url: "https://nomics.com/images/sparkline/assets/WRAITH2-USD-1d.svg",
            nomicsUrl: "https://nomics.com/assets/wraith2-wraith"
        },
        vault: {
            address: "0x0903149213f3a0a1573E0F82b88bE54c7E8432a5",
            abi: require("../config/abis/cflt-wraith.json"),
        },
        search: "Wraith WRAITH"
    },
    {
        id: 'wraith_Cflt',
        tokenName: ["Wraith", "Coinflect"],
        tokenId: ["WRAITH", "CFLT"],
        status: true,
        chart: {
            id: ["CFLT", "WRAITH2"],
            name: "Coinflect",
            url: "https://nomics.com/images/sparkline/assets/CFLT-USD-1d.svg",
            nomicsUrl: "https://nomics.com/assets/cflt-coinflect"
        },
        vault: {
            address: "0x5B84e5Ef8A1F2eB781C9e2e23F64086865f423f9",
            abi: require("../config/abis/wraith-cflt.json"),
        },
        search: "Wraith WRAITH cflt coinflectt"
    },
    {
        id: 'cflt_Dapes',
        tokenName: ["Coinflect", "Dapes"],
        tokenId: ["CFLT", "DAPES"],
        status: true,
        chart: {
            id: ["DAPES", "CFLT"],
            name: "De-Fi Apes",
            url: "https://nomics.com/images/sparkline/assets/DAPES-USD-1d.svg",
            nomicsUrl: "https://nomics.com/assets/dapes-de-fi-apes"
        },
        vault: {
            address: "0x83Bbf9c57C4Ed80DB132756B4d714257B86C6825",
            abi: require("../config/abis/cflt-dapes.json"),
        },
        search: "De-Fi Apes DAPES"
    },
    {
        id: 'Dapes_Cflt',
        tokenName: ["Dapes", "Coinflect"],
        tokenId: ["DAPES", "CFLT"],
        status: true,
        chart: {
            id: ["CFLT", "DAPES"],
            name: "Coinflect",
            url: "https://nomics.com/images/sparkline/assets/CFLT-USD-1d.svg",
            nomicsUrl: "https://nomics.com/assets/cflt-coinflect"
        },
        vault: {
            address: "0x1Fdcad36186dB1B148D2c70AbC2aa9B9340Fe483",
            abi: require("../config/abis/dapes-cflt.json"),
        },
        search: "De-Fi Apes DAPES cflt coinflectt"
    },
    {
        id: 'cflt_Adream',
        tokenName: ["Coinflect", "ADREAM"],
        tokenId: ["CFLT", "ADREAM"],
        status: true,
        chart: {
            id: ["ADREAM", "CFLT"],
            name: "ADREAM",
            url: "https://nomics.com/images/sparkline/assets/ADREAM-USD-1d.svg",
            nomicsUrl: "https://nomics.com/assets/adream-adream"
        },
        vault: {
            address: "0x7f2Dd893C7C2080Bc0C3c47314c1114aE17E2E4a",
            abi: require("../config/abis/cflt-adream.json"),
        },
        search: "American Dream adream"
    },
    {
        id: 'Adream_Cflt',
        tokenName: ["ADREAM", "Coinflect"],
        tokenId: ["ADREAM", "CFLT"],
        status: true,
        chart: {
            id: ["CFLT", "ADREAM"],
            name: "Coinflect",
            url: "https://nomics.com/images/sparkline/assets/CFLT-USD-1d.svg",
            nomicsUrl: "https://nomics.com/assets/cflt-coinflect"
        },
        vault: {
            address: "0x43f7436fbf1fF01B9bcD267e14150F620CB8dDDb",
            abi: require("../config/abis/adream-cflt.json"),
        },
        search: "American Dream adream cflt coinflectt"
    },

];
