import CopyHelper from 'components/AccountDetails/Copy'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useCallback, useContext } from 'react'
import { ExternalLink as LinkIcon } from 'react-feather'
import { useAppDispatch } from 'store/hooks'
import styled from 'styled-components/macro'

import { ReactComponent as Close } from '../../assets/images/x.svg'
import { injected, walletlink } from '../../connectors'
import { SUPPORTED_WALLETS } from '../../constants/wallet'
import { shortenAddress } from '../../utils'
import { ExplorerDataType, getExplorerLink } from 'utils/getExplorerLink'
import { ButtonSecondary } from '../Button'
import StatusIcon from '../Identicon/StatusIcon'

const HeaderRow = styled.div`
  display: flex;
      flex-flow: row nowrap;
  padding: 1rem 1rem;
  font-weight: 500;
  color: ${(props) => (props.color === 'blue' ?"#2172E5" : 'inherit')};
  @media screen and (max-width: 960px) {
    padding: 1rem;
  }
`

const UpperSection = styled.div`
  position: relative;

  h5 {
    margin: 0;
    margin-bottom: 0.5rem;
    font-size: 1rem;
    font-weight: 400;
  }

  h5:last-child {
    margin-bottom: 0px;
  }

  h4 {
    margin-top: 0;
    font-weight: 500;
  }
`

const InfoCard = styled.div`
  padding: 1rem;
  border: 1px solid #40444F;
  border-radius: 20px;
  position: relative;
  display: grid;
  grid-row-gap: 12px;
  margin-bottom: 20px;
`

const AccountGroupingRow = styled.div`
   display: flex;
      flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  font-weight: 400;
  color: #FFFFFF;

  div {
    display: flex;
      flex-flow: row nowrap;
    align-items: center;
  }
`

const AccountSection = styled.div`
  padding: 0rem 1rem;
  @media screen and (max-width: 960px) {
  padding: 0rem 1rem 1.5rem 1rem;
  }
`

const YourAccount = styled.div`
  h5 {
    margin: 0 0 1rem 0;
    font-weight: 400;
  }

  h4 {
    margin: 0;
    font-weight: 500;
  }
`

const AccountControl = styled.div`
  display: flex;
  justify-content: space-between;
  min-width: 0;
  width: 100%;

  font-weight: 500;
  font-size: 1.25rem;

  a:hover {
    text-decoration: underline;
  }

  p {
    min-width: 0;
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`

const AddressLink = styled.a`
  font-size: 0.825rem;
  color: '#8F96AC';
  margin-left: 1rem;
  font-size: 0.825rem;
  display: flex;
  :hover {
    color: '#C3C5CB';
  }
`

const CloseIcon = styled.div`
  position: absolute;
  right: 1rem;
  top: 14px;
  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }
`

const CloseColor = styled(Close)`
  path {
    stroke: "#B2B9D2";
  }
`

const WalletName = styled.div`
  width: initial;
  font-size: 0.825rem;
  font-weight: 500;
  color: #8F96AC;
`

const IconWrapper = styled.div`
      display: flex;
      flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  & > img,
  span {
    height: ${({ size }) => (size ? size + 'px' : '32px')};
    width: ${({ size }) => (size ? size + 'px' : '32px')};
  }
  @media screen and (max-width: 960px) {
   align-items: flex-end;
  }
`

function WrappedStatusIcon({ connector }) {
  return (
    <IconWrapper size={16}>
      <StatusIcon connector={connector} />
    </IconWrapper>
  )
}

const WalletAction = styled(ButtonSecondary)`
  width: fit-content;
  font-weight: 400;
  margin-left: 8px;
  font-size: 0.825rem;
  padding: 4px 6px;
  :hover {
    cursor: pointer;
    text-decoration: underline;
  }
`

export default function AccountDetails({
  toggleWalletModal,
  ENSName,
  openOptions,
}) {
  const { chainId, account, connector } = useActiveWeb3React()

  function formatConnectorName() {
    const { ethereum } = window
    const isMetaMask = !!(ethereum && ethereum.isMetaMask)
    const name = Object.keys(SUPPORTED_WALLETS)
      .filter(
        (k) =>
          SUPPORTED_WALLETS[k].connector === connector && (connector !== injected || isMetaMask === (k === 'METAMASK'))
      )
      .map((k) => SUPPORTED_WALLETS[k].name)[0]
    return (
      <WalletName>
        <div>Connected with {name}</div>
      </WalletName>
    )
  }

  return (
    <>
      <UpperSection>
        <CloseIcon onClick={toggleWalletModal}>
          <CloseColor />
        </CloseIcon>
        <HeaderRow>
          <div>Account</div>
        </HeaderRow>
        <AccountSection>
          <YourAccount>
            <InfoCard>
              <AccountGroupingRow>
                {formatConnectorName()}
                <div>
                  {connector !== injected && connector !== walletlink && (
                    <WalletAction
                      style={{ fontSize: '.825rem', fontWeight: 400, marginRight: '8px' }}
                      onClick={() => {
                        ;(connector).close()
                      }}
                    >
                      <div>Disconnect</div>
                    </WalletAction>
                  )}
                  <WalletAction
                    style={{ fontSize: '.825rem', fontWeight: 400 }}
                    onClick={() => {
                      openOptions()
                    }}
                  >
                    <div>Change</div>
                  </WalletAction>
                </div>
              </AccountGroupingRow>
              <AccountGroupingRow id="web3-account-identifier-row">
                <AccountControl>
                  {ENSName ? (
                    <>
                      <div>
                        {connector && <WrappedStatusIcon connector={connector} />}
                        <p> {ENSName}</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        {connector && <WrappedStatusIcon connector={connector} />}
                        <p> {account && shortenAddress(account)}</p>
                      </div>
                    </>
                  )}
                </AccountControl>
              </AccountGroupingRow>
              <AccountGroupingRow>
                {ENSName ? (
                  <>
                    <AccountControl>
                      <div>
                        {account && (
                          <CopyHelper toCopy={account} iconPosition="left">
                            <span style={{ marginLeft: '4px' }}>
                              <div>Copy Address</div>
                            </span>
                          </CopyHelper>
                        )}
                        {chainId && account && (
                          <AddressLink
                            hasENS={!!ENSName}
                            isENS={true}
                            href={getExplorerLink(chainId, ENSName, ExplorerDataType.ADDRESS)}
                          >
                            <LinkIcon size={16} />
                            <span style={{ marginLeft: '4px' }}>
                              <div>View on Explorer</div>
                            </span>
                          </AddressLink>
                        )}
                      </div>
                    </AccountControl>
                  </>
                ) : (
                  <>
                    <AccountControl>
                      <div>
                        {account && (
                          <CopyHelper toCopy={account} iconPosition="left">
                            <span style={{ marginLeft: '4px' }}>
                              <div>Copy Address</div>
                            </span>
                          </CopyHelper>
                        )}
                        {chainId && account && (
                          <AddressLink
                            hasENS={!!ENSName}
                            isENS={false}
                            href={getExplorerLink(chainId, account, ExplorerDataType.ADDRESS)}
                          >
                            <LinkIcon size={16} />
                            <span style={{ marginLeft: '4px' }}>
                              <div>View on Explorer</div>
                            </span>
                          </AddressLink>
                        )}
                      </div>
                    </AccountControl>
                  </>
                )}
              </AccountGroupingRow>
            </InfoCard>
          </YourAccount>
        </AccountSection>
      </UpperSection>
    </>
  )
}
