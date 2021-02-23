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
      // SUSD: ['0x57Ab1E02fEE23774580C119740129eAC7081e9D3', 18],
      USDC: ['0x64544969ed7ebf5f083679233325356ebe738930', 18],
      USDT: ['0x337610d27c682e347c9cd60bd4b3b107c9d34ddd', 18],
      'YSD_DAI-UNI-LPv2': ['0x20A2701664482d2756f59c70E60CF165638C1aD4', 18],
      'YSS_DAI-UNI-LPv2': ['0x92a423Ad73f82e26fCB0fF9Fe259f7d85828dbB8', 18],
    },
    baseLaunchDate: new Date('2021-01-07T00:00:00Z'), // TODO
    wholeSiteLaunchesAt: new Date('2021-01-07T00:00:00Z'),
    bondLaunchesAt: new Date('2021-01-07T00:00:00Z'), // TODO
    boardroomLaunchesAt: new Date('2021-01-07T00:00:00Z'), // TODO
    refreshInterval: 10000,
    gasLimitMultiplier: 1.1,
  },
  // Just copy from dev for build
  production: {
    chainId: ChainId.BSC_TESTNET,
    etherscanUrl: 'https://testnet.bscscan.com',
    defaultProvider: 'https://data-seed-prebsc-1-s1.binance.org:8545',
    deployments: require('./basis-cash/deployments/deployments.bsc_testnet.json'),
    externalTokens: {
      DAI: ['0xEC5dCb5Dbf4B114C9d0F65BcCAb49EC54F6A0867', 18],
      // yCRV: ['0xdf5e0e81dff6faf3a7e52ba697820c5e32d806a8', 18],
      // SUSD: ['0x57Ab1E02fEE23774580C119740129eAC7081e9D3', 18],
      USDC: ['0x64544969ed7ebf5f083679233325356ebe738930', 18],
      USDT: ['0x337610d27c682e347c9cd60bd4b3b107c9d34ddd', 18],
      'YSD_DAI-UNI-LPv2': ['0x4007bE31d732aCd882D25183919830c98DCa52e1', 18],
      'YSS_DAI-UNI-LPv2': ['0x3EDEB4cB126fD4C809Bd2B31cDb86ab0aCcfC099', 18],
    },
    // Use this for public preview
    // baseLaunchDate: new Date('2021-01-07T00:00:00Z'), // TODO
    // wholeSiteLaunchesAt: new Date('2021-01-11T12:00:00Z'),
    // bondLaunchesAt: new Date('2021-01-11T12:00:00Z'), // TODO
    // boardroomLaunchesAt: new Date('2021-01-11T12:00:00Z'), // TODO

    // Only for internal preview
    baseLaunchDate: new Date('2021-01-07T00:00:00Z'), // TODO
    wholeSiteLaunchesAt: new Date('2021-01-07T00:00:00Z'),
    bondLaunchesAt: new Date('2021-01-07T00:00:00Z'), // TODO
    boardroomLaunchesAt: new Date('2021-01-07T00:00:00Z'), // TODO
    refreshInterval: 10000,
    gasLimitMultiplier: 1.1,
  },
};

export const bankDefinitions: { [contractName: string]: BankInfo } = {
  YSDDAIPool: {
    name: 'Earn YSD by DAI',
    contract: 'YSDMultiPool',
    depositTokenName: 'DAI',
    earnTokenName: 'YSD',
    finished: false,
    sort: 3,
  },
  YSDUSDCPool: {
    name: 'Earn YSD by USDC',
    contract: 'YSDMultiPool',
    depositTokenName: 'USDC',
    earnTokenName: 'YSD',
    finished: false,
    sort: 4,
  },
  // YSDSUSDPool: {
  //   name: 'Earn YSD by sUSD',
  //   contract: 'YSDSUSDPool',
  //   depositTokenName: 'SUSD',
  //   earnTokenName: 'YSD',
  //   finished: true,
  //   sort: 5,
  // },
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
  DAIYSDLPTokenSharePool: {
    name: 'Earn YSS by YSD-DAI-LP',
    contract: 'DAIYSDLPTokenSharePool',
    depositTokenName: 'YSD_DAI-UNI-LPv2',
    earnTokenName: 'YSS',
    finished: false,
    sort: 1,
  },
  DAIYSSLPTokenSharePool: {
    name: 'Earn YSS by YSS-DAI-LP',
    contract: 'DAIYSSLPTokenSharePool',
    depositTokenName: 'YSS_DAI-UNI-LPv2',
    earnTokenName: 'YSS',
    finished: false,
    sort: 2,
  },
};

export default configurations[process.env.NODE_ENV || 'development'];
