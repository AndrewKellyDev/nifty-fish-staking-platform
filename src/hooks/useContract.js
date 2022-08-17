import { useMemo } from 'react'
import { Contract } from '@ethersproject/contracts'
import { getAddress } from '@ethersproject/address'
import { AddressZero } from '@ethersproject/constants'
import useActiveWeb3React from './useActiveWeb3React'
import NFTContractABI from 'abis/NFT.json'
import stakingABI from 'abis/stakingContract.json'


export function isAddress(value) {
  try {
    return getAddress(value)
  } catch {
    return false
  }
}

// account is not optional
function getSigner(library, account) {
  return library.getSigner(account).connectUnchecked()
}


// account is optional
function getProviderOrSigner(library, account) {
  return account ? getSigner(library, account) : library
}

// account is optional
export function getContract(address, ABI, library, account) {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }
  return new Contract(address, ABI, getProviderOrSigner(library, account))
}

// returns null on errors
export function useContract(
  addressOrAddressMap,
  ABI,
  withSignerIfPossible = true
){
  const { library, account, chainId } = useActiveWeb3React()

  return useMemo(() => {
    if (!addressOrAddressMap || !ABI || !library || !chainId) return null
    let address
    if (typeof addressOrAddressMap === 'string') address = addressOrAddressMap
    
    else address = addressOrAddressMap[chainId]

    if (!address) return null
    try {
      return getContract(address, ABI, library, withSignerIfPossible && account ? account : undefined)
    } catch (error) {
      console.error('Failed to get contract', error)
      return null
    }
  }, [addressOrAddressMap, ABI, library, chainId, withSignerIfPossible, account])
}


export function useNFTContract() {
  return useContract("0xbfda10131f0c813b271b8c0d2e6461d70eca219d", NFTContractABI, true)
}

export function useStakingContract() {
  return useContract("0xa166d47Ee78675aF3DAd200054cA22F3215E3BB6", stakingABI, true)
}