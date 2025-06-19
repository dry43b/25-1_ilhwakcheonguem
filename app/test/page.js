// app/dashboard/page.js
'use client'
import { useUser } from '@clerk/nextjs'
import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { PseudoEthManager } from '@/utils/pseudoETH'
import IntegratedWallet from '@/components/IntergratedWallet'
import UnifiedTransaction from '@/components/UnifiedTransaction'

export default function Dashboard() {
  const { user } = useUser()
  const [provider, setProvider] = useState(null)
  const [userAddress, setUserAddress] = useState('')
  const [selectedMode, setSelectedMode] = useState('pseudo')
  const [pseudoEthManager, setPseudoEthManager] = useState(null)
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    if (user) {
      const manager = new PseudoEthManager(user.id)
      setPseudoEthManager(manager)
      connectToMetaMask()
    }
  }, [user])

  const connectToMetaMask = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const web3Provider = new ethers.BrowserProvider(window.ethereum)
        setProvider(web3Provider)
        
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0xaa36a7' }],
        })

        const signer = await web3Provider.getSigner()
        const address = await signer.getAddress()
        setUserAddress(address)
      } catch (error) {
        console.error('MetaMask 연결 실패:', error)
      }
    }
  }

  const handleTransactionComplete = () => {
    setRefreshKey(prev => prev + 1)
  }

  const handleModeChange = (mode) => {
    setSelectedMode(mode)
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">통합 이더리움 거래 시스템</h1>
          <div className="text-sm text-gray-600">
            사용자: {user?.emailAddresses[0]?.emailAddress}
          </div>
        </div>
        
        {/* 모드 선택 */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={() => handleModeChange('pseudo')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                selectedMode === 'pseudo'
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              🎮 의사ETH 모드 (테스트)
            </button>
            <button
              onClick={() => handleModeChange('real')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                selectedMode === 'real'
                  ? 'bg-green-500 text-white shadow-lg'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              ⚡ Sepolia ETH 모드 (실제)
            </button>
          </div>
          <div className="text-center mt-2 text-sm text-gray-600">
            {selectedMode === 'pseudo' 
              ? '로컬 저장된 가상 토큰으로 안전하게 테스트하세요'
              : '실제 Sepolia 테스트넷에서 블록체인 거래를 수행합니다'
            }
          </div>
        </div>

        {/* 지갑 정보 */}
        <div key={refreshKey} className="mb-8">
          <IntegratedWallet />
        </div>
        
        {/* 거래 시스템 */}
        {userAddress && (
          <UnifiedTransaction
            provider={provider}
            userAddress={userAddress}
            selectedMode={selectedMode}
            pseudoEthManager={pseudoEthManager}
            onTransactionComplete={handleTransactionComplete}
          />
        )}
      </div>
    </div>
  )
}
