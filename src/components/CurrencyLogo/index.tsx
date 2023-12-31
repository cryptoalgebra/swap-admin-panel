import { Currency } from '@uniswap/sdk-core'
import React, { useMemo } from 'react'
import styled from 'styled-components/macro'
import EthereumLogo from '../../assets/images/ethereum-logo.png'
import useHttpLocations from '../../hooks/useHttpLocations'
import { useActiveWeb3React } from '../../hooks/web3'
import { WrappedTokenInfo } from '../../state/lists/wrappedTokenInfo'
import { stringToColour } from '../../utils/stringToColour'
import Logo from '../Logo'

export const getTokenLogoURL = (address: string) =>
  `https://raw.githubusercontent.com/uniswap/assets/master/blockchains/ethereum/assets/${address}/logo.png`

const StyledEthereumLogo = styled.img<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.075);
  border-radius: 24px;
`

const StyledLogo = styled.div<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border-radius: ${({ size }) => size};
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.075);
  background-color: ${({ theme }) => theme.white};
  display: flex;
  align-items: center;
  justify-content: center;
  fontsize: 14px;
  fontfamily: Montserrat;
  fontweight: 600;
`

export default function CurrencyLogo({
  currency,
  size = '24px',
  style,
  ...rest
}: {
  currency?: Currency
  size?: string
  style?: React.CSSProperties
}) {
  const uriLocations = useHttpLocations(currency instanceof WrappedTokenInfo ? currency.logoURI : undefined)

  const { chainId } = useActiveWeb3React()

  let logo

  if (chainId === 0x64) {
    logo = EthereumLogo
  }

  if (!currency) return <div></div>

  // const srcs: string[] = useMemo(() => {
  //   if (!currency || currency.isNative) return []

  //   if (currency.isToken) {
  //     const defaultUrls = currency.chainId === 1 ? [getTokenLogoURL(currency.address)] : []
  //     if (currency instanceof WrappedTokenInfo) {
  //       return [...uriLocations, ...defaultUrls]
  //     }
  //     return defaultUrls
  //   }
  //   return []
  // }, [currency, uriLocations])

  if (currency?.isNative) {
    return <StyledEthereumLogo src={logo} size={size} style={style} {...rest} />
  }

  return (
    <StyledLogo
      size={size}
      style={{
        ...style,
        background: stringToColour(currency?.symbol).background,
        color: stringToColour(currency?.symbol).text,
        border: stringToColour(currency?.symbol).border,
        fontSize: size === '18px' ? '8px' : size === '24px' ? '12px' : '14px',
      }}
    >
      {currency?.symbol?.slice(0, 2)}
    </StyledLogo>
  )
}
