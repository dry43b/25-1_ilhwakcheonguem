// components/IntegratedWallet.js
'use client'
import { useUser } from '@clerk/nextjs'
import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { PseudoEthManager } from '@/utils/pseudoETH'

export default function IntegratedWallet() {
  const { user } = useUser()
  const [provider, setProvider] = useState(null)
  const [userAddress, setUserAddress] = useState('')
  const [realBalance, setRealBalance] = useState('0')
  const [pseudoBalance, setPseudoBalance] = useState(0)
  const [pseudoEthManager, setPseudoEthManager] = useState(null)
  const [selectedMode, setSelectedMode] = useState('pseudo') // 'pseudo' or 'real'

  useEffect(() => {
    if (user) {
      // 의사ETH 매니저 초기화
      const manager = new PseudoEthManager(user.id)
      setPseudoEthManager(manager)
      
      // 초기 의사ETH 잔액 설정
      const initialBalance = manager.initializeBalance(100)
      setPseudoBalance(initialBalance)
      
      // MetaMask 연결
      connectToMetaMask()
    }
  }, [user])

  const connectToMetaMask = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const web3Provider = new ethers.BrowserProvider(window.ethereum)
        setProvider(web3Provider)
        
        // Sepolia 테스트넷으로 전환
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0xaa36a7' }],
        })

        const signer = await web3Provider.getSigner()
        const address = await signer.getAddress()
        const balance = await web3Provider.getBalance(address)
        
        setUserAddress(address)
        setRealBalance(ethers.formatEther(balance))
      } catch (error) {
        console.error('MetaMask 연결 실패:', error)
      }
    }
  }

  const updateBalances = async () => {
    // 실제 ETH 잔액 업데이트
    if (provider && userAddress) {
      const balance = await provider.getBalance(userAddress)
      setRealBalance(ethers.formatEther(balance))
    }
    
    // 의사ETH 잔액 업데이트
    if (pseudoEthManager) {
      setPseudoBalance(pseudoEthManager.getBalance())
    }
  }

  const claimPseudoFaucet = () => {
    if (pseudoEthManager) {
      const transaction = pseudoEthManager.faucet(userAddress, 10)
      setPseudoBalance(pseudoEthManager.getBalance())
      alert('10 의사ETH를 받았습니다!')
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">통합 지갑</h2>
        <div className="flex bg-gray-200 rounded-lg p-1">
          <button
            onClick={() => setSelectedMode('pseudo')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              selectedMode === 'pseudo' 
                ? 'bg-blue-500 text-white' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            의사ETH
          </button>
          <button
            onClick={() => setSelectedMode('real')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              selectedMode === 'real' 
                ? 'bg-green-500 text-white' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            실제ETH
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 의사ETH 섹션 */}
        <div className={`p-4 rounded-lg border-2 ${
          selectedMode === 'pseudo' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-blue-600">의사ETH (테스트)</h3>
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">로컬 저장</span>
          </div>
          <div className="text-2xl font-bold text-blue-700 mb-2">
            {pseudoBalance.toFixed(4)} pETH
          </div>
          <button
            onClick={claimPseudoFaucet}
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 text-sm"
          >
            무료 의사ETH 받기 (+10)
          </button>
        </div>

        {/* 실제ETH 섹션 */}
        <div className={`p-4 rounded-lg border-2 ${
          selectedMode === 'real' ? 'border-green-500 bg-green-50' : 'border-gray-200'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-green-600">Sepolia ETH</h3>
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">테스트넷</span>
          </div>
          <div className="text-2xl font-bold text-green-700 mb-2">
            {parseFloat(realBalance).toFixed(4)} ETH
          </div>
          <button
            onClick={() => window.open('https://sepoliafaucet.com/', '_blank')}
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 text-sm"
          >
            Sepolia Faucet 방문
          </button>
        </div>
      </div>

      {/* 지갑 주소 */}
      <div className="mt-6 p-3 bg-gray-50 rounded">
        <div className="text-sm text-gray-600 mb-1">지갑 주소</div>
        <div className="font-mono text-sm break-all">{userAddress}</div>
      </div>

      <button
        onClick={updateBalances}
        className="w-full mt-4 bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
      >
        잔액 새로고침
      </button>
    </div>
  )
}