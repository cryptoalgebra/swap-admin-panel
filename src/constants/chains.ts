import arbitrumLogoUrl from 'assets/svg/arbitrum_logo.svg'
import optimismLogoUrl from 'assets/svg/optimism_logo.svg'

export enum SupportedChainId {
  // BINANCE = 0x61,
  // POLYGON = 0x13881,
  POLYGON = 0x64
}

export const ALL_SUPPORTED_CHAIN_IDS: SupportedChainId[] = [
  // SupportedChainId.BINANCE, 
  SupportedChainId.POLYGON
]

export const L1_CHAIN_IDS = [] as const

export type SupportedL1ChainId = typeof L1_CHAIN_IDS[number]

export const L2_CHAIN_IDS = [] as const

export type SupportedL2ChainId = typeof L2_CHAIN_IDS[number]

interface L1ChainInfo {
  readonly docs: string
  readonly explorer: string
  readonly infoLink: string
  readonly label: string
}
interface L2ChainInfo extends L1ChainInfo {
  readonly bridge: string
  readonly logoUrl: string
}

type ChainInfo = { readonly [chainId: number]: L1ChainInfo | L2ChainInfo } & {
  readonly [chainId in SupportedL2ChainId]: L2ChainInfo
} &
  { readonly [chainId in SupportedL1ChainId]: L1ChainInfo }

export const CHAIN_INFO: ChainInfo = {
  [SupportedChainId.POLYGON]: {
    docs: 'https://algebra.finance/',
    explorer: 'https://polygonscan.com/',
    infoLink: 'https://algebra.finance',
    label: 'XDAI',
  },
}
