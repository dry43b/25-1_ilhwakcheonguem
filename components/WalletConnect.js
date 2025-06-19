// components/WalletConnect.js
'use client'
import { useUser } from '@clerk/nextjs'
import { useState, useEffect } from 'react'
import { ethers } from 'ethers'

export default function WalletConnect() {
  const { user } = useUser()
  const [walletAddress, setWalletAddress] = useState('')
  const [balance, setBalance] = useState('0')
  const [provider, setProvider] = useState(null)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    if (user && user.web3Wallets.length > 0) {
      // Clerk에서 MetaMask 지갑 정보 가져오기
      const metamaskWallet = user.web3Wallets.find(
        wallet => wallet.verification.strategy === 'metamask'
      )
      if (metamaskWallet) {
        setWalletAddress(metamaskWallet.web3Wallet)
        connectToMetaMask()
      }
    }
  }, [user])

  const connectToMetaMask = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const web3Provider = new ethers.BrowserProvider(window.ethereum)
        setProvider(web3Provider)
        
        // 테스트넷으로 전환 (Sepolia)
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0xaa36a7' }], // Sepolia testnet
        })

        const signer = await web3Provider.getSigner()
        const address = await signer.getAddress()
        const balance = await web3Provider.getBalance(address)
        
        setWalletAddress(address)
        setBalance(ethers.formatEther(balance))
        setIsConnected(true)
      } catch (error) {
        console.error('MetaMask 연결 실패:', error)
      }
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">지갑 정보</h2>
      {isConnected ? (
        <div className="space-y-3">
          <div>
            <span className="font-semibold">주소: </span>
            <span className="text-sm font-mono bg-gray-100 p-1 rounded">
              {walletAddress}
            </span>
          </div>
          <div>
            <span className="font-semibold">잔액: </span>
            <span className="text-lg text-green-600">{balance} ETH</span>
          </div>
        </div>
      ) : (
        <button 
          onClick={connectToMetaMask}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          MetaMask 연결
        </button>
      )}
    </div>
  )
}