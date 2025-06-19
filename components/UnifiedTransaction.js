// components/UnifiedTransaction.js
'use client'
import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { PseudoEthManager } from '@/utils/pseudoETH'

export default function UnifiedTransaction({ 
  provider, 
  userAddress, 
  selectedMode, 
  pseudoEthManager,
  onTransactionComplete 
}) {
  const [recipient, setRecipient] = useState('')
  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState(false)
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    loadTransactions()
  }, [selectedMode, pseudoEthManager])

  const loadTransactions = () => {
    if (selectedMode === 'pseudo' && pseudoEthManager) {
      setTransactions(pseudoEthManager.getTransactions())
    } else {
      // 실제 거래 내역은 별도 관리 (localStorage 또는 상태)
      const realTxs = JSON.parse(localStorage.getItem('real_transactions') || '[]')
      setTransactions(realTxs)
    }
  }

  const validateTransaction = async () => {
    if (!recipient || !amount || parseFloat(amount) <= 0) {
      alert('올바른 받는 주소와 금액을 입력하세요.')
      return false
    }

    if (!ethers.isAddress(recipient)) {
      alert('올바른 이더리움 주소를 입력하세요.')
      return false
    }

    if (selectedMode === 'pseudo') {
      const balance = pseudoEthManager.getBalance()
      if (parseFloat(amount) > balance) {
        alert('의사ETH 잔액이 부족합니다.')
        return false
      }
    } else {
      const balance = await provider.getBalance(userAddress)
      if (ethers.parseEther(amount) >= balance) {
        alert('실제ETH 잔액이 부족합니다.')
        return false
      }
    }

    return true
  }

  const sendPseudoTransaction = async () => {
    try {
      const transaction = pseudoEthManager.transfer(
        recipient,
        parseFloat(amount),
        userAddress
      )
      
      setTransactions(prev => [transaction, ...prev])
      
      // 성공 알림
      alert(`${amount} 의사ETH가 성공적으로 전송되었습니다!`)
      
      // 폼 초기화
      setRecipient('')
      setAmount('')
      
      // 부모 컴포넌트에 완료 알림
      onTransactionComplete?.()
      
    } catch (error) {
      alert('의사ETH 전송 실패: ' + error.message)
    }
  }

  const sendRealTransaction = async () => {
    try {
      const signer = await provider.getSigner()
      
      const tx = await signer.sendTransaction({
        to: recipient,
        value: ethers.parseEther(amount),
      })

      // 실제 거래 기록
      const transaction = {
        id: Date.now().toString(),
        type: 'real',
        from: userAddress,
        to: recipient,
        amount: parseFloat(amount),
        timestamp: new Date().toISOString(),
        status: 'pending',
        hash: tx.hash
      }

      // 로컬 저장
      const realTxs = JSON.parse(localStorage.getItem('real_transactions') || '[]')
      realTxs.unshift(transaction)
      localStorage.setItem('real_transactions', JSON.stringify(realTxs))
      
      setTransactions(prev => [transaction, ...prev])

      console.log('실제 거래 전송됨:', tx.hash)
      
      // 거래 확인 대기
      const receipt = await tx.wait()
      
      // 상태 업데이트
      transaction.status = 'confirmed'
      transaction.blockNumber = receipt.blockNumber
      
      const updatedTxs = realTxs.map(t => 
        t.hash === tx.hash ? transaction : t
      )
      localStorage.setItem('real_transactions', JSON.stringify(updatedTxs))
      setTransactions(updatedTxs)

      alert(`${amount} ETH가 성공적으로 전송되었습니다!`)
      
      // 폼 초기화
      setRecipient('')
      setAmount('')
      
      // 부모 컴포넌트에 완료 알림
      onTransactionComplete?.()
      
    } catch (error) {
      console.error('실제 거래 실패:', error)
      alert('실제ETH 전송 실패: ' + error.message)
    }
  }

  const handleSendTransaction = async () => {
    if (!await validateTransaction()) return

    setLoading(true)
    try {
      if (selectedMode === 'pseudo') {
        await sendPseudoTransaction()
      } else {
        await sendRealTransaction()
      }
    } finally {
      setLoading(false)
    }
  }

  const createTestAddress = () => {
    const wallet = ethers.Wallet.createRandom()
    setRecipient(wallet.address)
  }

  return (
    <div className="space-y-6">
      {/* 거래 폼 */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">
            {selectedMode === 'pseudo' ? '의사ETH' : 'Sepolia ETH'} 전송
          </h3>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            selectedMode === 'pseudo' 
              ? 'bg-blue-100 text-blue-800' 
              : 'bg-green-100 text-green-800'
          }`}>
            {selectedMode === 'pseudo' ? '테스트 모드' : '실제 테스트넷'}
          </span>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">받는 주소</label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="0x742d35Cc6084C4532F53a3b0..."
              />
              <button
                onClick={createTestAddress}
                className="bg-gray-500 text-white px-4 py-3 rounded-lg hover:bg-gray-600"
              >
                테스트 주소
              </button>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">
              금액 ({selectedMode === 'pseudo' ? 'pETH' : 'ETH'})
            </label>
            <input
              type="number"
              step="0.001"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="0.01"
            />
          </div>
          
          <button
            onClick={handleSendTransaction}
            disabled={loading || !recipient || !amount}
            className={`w-full py-3 rounded-lg font-medium text-white ${
              selectedMode === 'pseudo'
                ? 'bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400'
                : 'bg-green-500 hover:bg-green-600 disabled:bg-gray-400'
            }`}
          >
            {loading 
              ? '전송 중...' 
              : `${selectedMode === 'pseudo' ? '의사ETH' : 'Sepolia ETH'} 전송`
            }
          </button>
        </div>
      </div>

      {/* 거래 내역 */}
      {transactions.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-4">
            {selectedMode === 'pseudo' ? '의사ETH' : 'Sepolia ETH'} 거래 내역
          </h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {transactions.slice(0, 10).map((tx, index) => (
              <div key={index} className={`border-l-4 pl-4 py-3 ${
                tx.type === 'pseudo' ? 'border-blue-500 bg-blue-50' : 'border-green-500 bg-green-50'
              }`}>
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-mono text-xs text-gray-600">
                      {tx.from === 'FAUCET' ? 'FAUCET' : `${tx.from.slice(0, 10)}...${tx.from.slice(-8)}`} 
                      → {tx.to.slice(0, 10)}...{tx.to.slice(-8)}
                    </div>
                    <div className="font-bold">
                      {tx.amount} {tx.type === 'pseudo' ? 'pETH' : 'ETH'}
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(tx.timestamp).toLocaleString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      tx.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                      tx.status === 'failed' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {tx.status}
                    </span>
                    {tx.blockNumber && (
                      <div className="text-xs text-gray-500 mt-1">
                        Block: {tx.blockNumber}
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-2">
                  {tx.type === 'real' ? (
                    <a 
                      href={`https://sepolia.etherscan.io/tx/${tx.hash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline text-xs font-mono"
                    >
                      {tx.hash}
                    </a>
                  ) : (
                    <span className="text-gray-500 text-xs font-mono">{tx.hash}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}