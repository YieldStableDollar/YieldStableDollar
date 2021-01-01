import { ChainId } from '@lychees/uniscam-sdk';
import { Configuration } from './basis-cash/config';
import { BankInfo } from './basis-cash';

const configurations: { [env: string]: Configuration } = {
  development: {
    chainId: ChainId.HECO_TESTNET,
    etherscanUrl: 'https://scan-testnet.hecochain.com',
    defaultProvider: 'https://http-testnet.hecochain.com',
    deployments: require('./basis-cash/deployments/deployments.heco_testnet.json'),
    externalTokens: {
      DAI: ['0xde76ccae3413c7af312251e99803b1433d3187f4', 18],
      yCRV: ['0xdf5e0e81dff6faf3a7e52ba697820c5e32d806a8', 18],
      SUSD: ['0x57Ab1E02fEE23774580C119740129eAC7081e9D3', 18],
      USDC: ['0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', 6],
      USDT: ['0xdAC17F958D2ee523a2206206994597C13D831ec7', 6],
      'BAC_DAI-UNI-LPv2': ['0x73015a0863502f25187f00b1ecc1a42c4bd6a0cc', 18],
      'BAS_DAI-UNI-LPv2': ['0x37a087e41ef9a7d9f02a4e0db544041b5ee6c309', 18],
    },
    baseLaunchDate: new Date('2020-11-26T00:00:00Z'), // TODO
    bondLaunchesAt: new Date('2020-12-03T15:00:00Z'), // TODO
    boardroomLaunchesAt: new Date('2020-12-11T00:00:00Z'), // TODO
    refreshInterval: 10000,
    gasLimitMultiplier: 1.1,
  },
  // Just copy from dev for build
  production: {
    chainId: ChainId.HECO_TESTNET,
    etherscanUrl: 'https://scan-testnet.hecochain.com',
    defaultProvider: 'https://http-testnet.hecochain.com',
    deployments: require('./basis-cash/deployments/deployments.heco_testnet.json'),
    externalTokens: {
      DAI: ['0xde76ccae3413c7af312251e99803b1433d3187f4', 18],
      yCRV: ['0xdf5e0e81dff6faf3a7e52ba697820c5e32d806a8', 18],
      SUSD: ['0x57Ab1E02fEE23774580C119740129eAC7081e9D3', 18],
      USDC: ['0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', 6],
      USDT: ['0xdAC17F958D2ee523a2206206994597C13D831ec7', 6],
      'BAC_DAI-UNI-LPv2': ['0x73015a0863502f25187f00b1ecc1a42c4bd6a0cc', 18],
      'BAS_DAI-UNI-LPv2': ['0x37a087e41ef9a7d9f02a4e0db544041b5ee6c309', 18],
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
    finished: true,
    sort: 3,
  },
  BACUSDCPool: {
    name: 'Earn BAC by USDC',
    contract: 'BACUSDCPool',
    depositTokenName: 'USDC',
    earnTokenName: 'BAC',
    finished: true,
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
    finished: true,
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

export default configurations[process.env.NODE_ENV || "development"];
