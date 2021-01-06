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
      'BAC_DAI-UNI-LPv2': ['0x9F55D4d51DfEFA930124d0f8b91C92c29c9f21D0', 18],
      'BAS_DAI-UNI-LPv2': ['0xF311BE43A02D3ef3b6a564eaD5511c098a406D65', 18],
    },
    baseLaunchDate: new Date('2020-11-26T00:00:00Z'), // TODO
    bondLaunchesAt: new Date('2020-12-03T15:00:00Z'), // TODO
    boardroomLaunchesAt: new Date('2020-12-11T00:00:00Z'), // TODO
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
      'BAC_DAI-UNI-LPv2': ['0x9F55D4d51DfEFA930124d0f8b91C92c29c9f21D0', 18],
      'BAS_DAI-UNI-LPv2': ['0xF311BE43A02D3ef3b6a564eaD5511c098a406D65', 18],
    },
    baseLaunchDate: new Date('2020-11-26T00:00:00Z'), // TODO
    bondLaunchesAt: new Date('2020-12-03T15:00:00Z'), // TODO
    boardroomLaunchesAt: new Date('2020-12-11T00:00:00Z'), // TODO
    refreshInterval: 10000,
    gasLimitMultiplier: 1.1,
  },
};

export const bankDefinitions: { [contractName: string]: BankInfo } = {
  BACDAIPool: {
    name: 'Earn BAC by DAI',
    contract: 'BACDAIPool',
    depositTokenName: 'DAI',
    earnTokenName: 'BAC',
    finished: false,
    sort: 3,
  },
  BACUSDCPool: {
    name: 'Earn BAC by USDC',
    contract: 'BACUSDCPool',
    depositTokenName: 'USDC',
    earnTokenName: 'BAC',
    finished: false,
    sort: 4,
  },
  BACSUSDPool: {
    name: 'Earn BAC by sUSD',
    contract: 'BACSUSDPool',
    depositTokenName: 'SUSD',
    earnTokenName: 'BAC',
    finished: true,
    sort: 5,
  },
  BACUSDTPool: {
    name: 'Earn BAC by USDT',
    contract: 'BACUSDTPool',
    depositTokenName: 'USDT',
    earnTokenName: 'BAC',
    finished: false,
    sort: 6,
  },
  BACyCRVPool: {
    name: 'Earn BAC by yCRV',
    contract: 'BACyCRVPool',
    depositTokenName: 'yCRV',
    earnTokenName: 'BAC',
    finished: true,
    sort: 7,
  },
  DAIBACLPTokenSharePool: {
    name: 'Earn BAS by BAC-DAI-LP',
    contract: 'DAIBACLPTokenSharePool',
    depositTokenName: 'BAC_DAI-UNI-LPv2',
    earnTokenName: 'BAS',
    finished: false,
    sort: 1,
  },
  DAIBASLPTokenSharePool: {
    name: 'Earn BAS by BAS-DAI-LP',
    contract: 'DAIBASLPTokenSharePool',
    depositTokenName: 'BAS_DAI-UNI-LPv2',
    earnTokenName: 'BAS',
    finished: false,
    sort: 2,
  },
};

export default configurations[process.env.NODE_ENV || 'development'];
