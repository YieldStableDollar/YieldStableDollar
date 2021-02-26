import { ChainId } from '@lychees/uniscam-sdk';
import { Configuration } from './basis-cash/config';
import { BankInfo } from './basis-cash';

const configurations: { [env: string]: Configuration } = {
  development: {
    chainId: ChainId.BSC_TESTNET,
    etherscanUrl: 'https://testnet.bscscan.com',
    defaultProvider: 'https://data-seed-prebsc-1-s1.binance.org:8545',
    deployments: require('./basis-cash/deployments/deployments.bsc_testnet.json'),
    externalTokens: {
      DAI: ['0xEC5dCb5Dbf4B114C9d0F65BcCAb49EC54F6A0867', 18],
      // yCRV: ['0xdf5e0e81dff6faf3a7e52ba697820c5e32d806a8', 18],
      BUSD: ['0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee', 18],
      USDC: ['0x64544969ed7ebf5f083679233325356ebe738930', 18],
      USDT: ['0x337610d27c682e347c9cd60bd4b3b107c9d34ddd', 18],
      'YSD_BUSD-UNI-LPv2': ['0xD678596Dcb6878ceed88852c9db08A368ec3DD09', 18],
      'YSS_BUSD-UNI-LPv2': ['0x4B7eB05FA20560C9B152aC4b325485253f6A6009', 18],
    },
    baseLaunchDate: new Date('2021-01-26T11:00:00Z'),
    wholeSiteLaunchesAt: new Date('2021-01-26T11:00:00Z'),
    bondLaunchesAt: new Date('2021-01-27T00:00:00Z'),
    boardroomLaunchesAt: new Date('2021-01-02T00:00:00Z'),
    refreshInterval: 10000,
    gasLimitMultiplier: 1.1,
  },
  production: {
    chainId: ChainId.BSC_TESTNET,
    etherscanUrl: 'https://testnet.bscscan.com',
    defaultProvider: 'https://data-seed-prebsc-1-s1.binance.org:8545',
    deployments: require('./basis-cash/deployments/deployments.bsc_testnet.json'),
    externalTokens: {
      DAI: ['0xEC5dCb5Dbf4B114C9d0F65BcCAb49EC54F6A0867', 18],
      // yCRV: ['0xdf5e0e81dff6faf3a7e52ba697820c5e32d806a8', 18],
      BUSD: ['0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee', 18],
      USDC: ['0x64544969ed7ebf5f083679233325356ebe738930', 18],
      USDT: ['0x337610d27c682e347c9cd60bd4b3b107c9d34ddd', 18],
      'YSD_BUSD-UNI-LPv2': ['0xD678596Dcb6878ceed88852c9db08A368ec3DD09', 18],
      'YSS_BUSD-UNI-LPv2': ['0x4B7eB05FA20560C9B152aC4b325485253f6A6009', 18],
    },
    baseLaunchDate: new Date('2021-01-26T11:00:00Z'),
    wholeSiteLaunchesAt: new Date('2021-01-26T11:00:00Z'),
    bondLaunchesAt: new Date('2021-01-27T00:00:00Z'),
    boardroomLaunchesAt: new Date('2021-01-02T00:00:00Z'),
    refreshInterval: 10000,
    gasLimitMultiplier: 1.1,
  },
  // Just copy from dev for build
  // production: {
  //   chainId: ChainId.BSC_TESTNET,
  //   etherscanUrl: 'https://testnet.bscscan.com',
  //   defaultProvider: 'https://data-seed-prebsc-1-s1.binance.org:8545',
  //   deployments: require('./basis-cash/deployments/deployments.bsc_testnet.json'),
  //   externalTokens: {
  //     DAI: ['0xEC5dCb5Dbf4B114C9d0F65BcCAb49EC54F6A0867', 18],
  //     // yCRV: ['0xdf5e0e81dff6faf3a7e52ba697820c5e32d806a8', 18],
  //     BUSD: ['0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56', 18],
  //     USDC: ['0x64544969ed7ebf5f083679233325356ebe738930', 18],
  //     USDT: ['0x337610d27c682e347c9cd60bd4b3b107c9d34ddd', 18],
  //     'YSD_BUSD-UNI-LPv2': ['0x4007bE31d732aCd882D25183919830c98DCa52e1', 18],
  //     'YSS_BUSD-UNI-LPv2': ['0x3EDEB4cB126fD4C809Bd2B31cDb86ab0aCcfC099', 18],
  //   },
  //   // Use this for public preview
  //   // baseLaunchDate: new Date('2021-02-26T00:00:00Z'), // TODO
  //   // wholeSiteLaunchesAt: new Date('2021-01-11T12:00:00Z'),
  //   // bondLaunchesAt: new Date('2021-01-11T12:00:00Z'), // TODO
  //   // boardroomLaunchesAt: new Date('2021-01-11T12:00:00Z'), // TODO

  //   // Only for internal preview
  //   baseLaunchDate: new Date('2021-02-26T11:00:00Z'),
  //   wholeSiteLaunchesAt: new Date('2021-02-26T11:00:00Z'),
  //   bondLaunchesAt: new Date('2021-02-27T00:00:00Z'),
  //   boardroomLaunchesAt: new Date('2021-03-02T00:00:00Z'),
  //   refreshInterval: 10000,
  //   gasLimitMultiplier: 1.1,
  // },
};

export const bankDefinitions: { [contractName: string]: BankInfo } = {
  YSDDAIPool: {
    name: 'Earn YSD by DAI',
    contract: 'YSDMultiPool',
    depositTokenName: 'DAI',
    earnTokenName: 'YSD',
    finished: false,
    sort: 5,
  },
  YSDUSDCPool: {
    name: 'Earn YSD by USDC',
    contract: 'YSDMultiPool',
    depositTokenName: 'USDC',
    earnTokenName: 'YSD',
    finished: false,
    sort: 4,
  },
  YSDBUSDPool: {
    name: 'Earn YSD by BUSD',
    contract: 'YSDMultiPool',
    depositTokenName: 'BUSD',
    earnTokenName: 'YSD',
    finished: false,
    sort: 3,
  },
  YSDUSDTPool: {
    name: 'Earn YSD by USDT',
    contract: 'YSDMultiPool',
    depositTokenName: 'USDT',
    earnTokenName: 'YSD',
    finished: false,
    sort: 6,
  },
  // YSDyCRVPool: {
  //   name: 'Earn YSD by yCRV',
  //   contract: 'YSDyCRVPool',
  //   depositTokenName: 'yCRV',
  //   earnTokenName: 'YSD',
  //   finished: true,
  //   sort: 7,
  // },
  BUSDYSDLPTokenSharePool: {
    name: 'Earn YSS by YSD-BUSD-LP',
    contract: 'BUSDYSDLPTokenSharePool',
    depositTokenName: 'YSD_BUSD-UNI-LPv2',
    earnTokenName: 'YSS',
    finished: false,
    sort: 1,
  },
  BUSDYSSLPTokenSharePool: {
    name: 'Earn YSS by YSS-BUSD-LP',
    contract: 'BUSDYSSLPTokenSharePool',
    depositTokenName: 'YSS_BUSD-UNI-LPv2',
    earnTokenName: 'YSS',
    finished: false,
    sort: 2,
  },
};

export default configurations[process.env.NODE_ENV || 'development'];
