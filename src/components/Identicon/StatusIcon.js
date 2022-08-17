import CoinbaseWalletIcon from '../../assets/images/coinbaseWalletIcon.svg'
import FortmaticIcon from '../../assets/images/fortmaticIcon.png'
import WalletConnectIcon from '../../assets/images/walletConnectIcon.svg'
import { fortmatic, injected, walletconnect, walletlink } from '../../connectors'
import Identicon from '.'

export default function StatusIcon({ connector }) {
  switch (connector) {
    case injected:
      return <Identicon />
    case walletconnect:
      return <img src={WalletConnectIcon} alt={'WalletConnect'} />
    case walletlink:
      return <img src={CoinbaseWalletIcon} alt={'Coinbase Wallet'} />
    case fortmatic:
      return <img src={FortmaticIcon} alt={'Fortmatic'} />
    default:
      return null
  }
}
