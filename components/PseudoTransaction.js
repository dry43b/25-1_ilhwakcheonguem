// components/PseudoTransaction.js
'use client'
import { useState } from 'react'
import { ethers } from 'ethers'

export default function PseudoTransaction({ provider, userAddress }) {
  const [recipient, setRecipient] = useState('')
  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState(false)
  const [txHash, setTxHash] = useState('')

  const sendTransaction = async () => {
    if (!provider || !recipient || !amount) return

    try {
      setLoading(true)
      const signer = await provider.getSigner()
      
      const tx = await signer.sendTransaction({
        to: recipient,
        value: ethers.parseEther(amount),
        gasLimit: 21000,
      })

      setTxHash(tx.hash)
      console.log('거래 해시:', tx.hash)
      
      // 거래 확인 대기
      const receipt = await tx.wait()
      console.log('거래 확인됨:', receipt)
      
    } catch (error) {
      console.error('거래 실패:', error)
      alert('거래 실패: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const generateTestTransaction = async () => {
    // 의사 거래 - 실제로는 자신에게 소량 전송
    setRecipient(userAddress)
    setAmount('0.001')
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-2xl font-bold mb-4">테스트 거래</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">받는 주소</label>
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            placeholder="0x..."
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">금액 (ETH)</label>
          <input
            type="number"
            step="0.001"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            placeholder="0.001"
          />
        </div>
        
        <div className="flex space-x-3">
          <button
            onClick={sendTransaction}
            disabled={loading || !recipient || !amount}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:bg-gray-400"
          >
            {loading ? '처리 중...' : '거래 전송'}
          </button>
          
          <button
            onClick={generateTestTransaction}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            테스트 거래 생성
          </button>
        </div>
        
        {txHash && (
          <div className="mt-4 p-3 bg-green-50 rounded">
            <p className="text-sm">
              <span className="font-semibold">거래 해시: </span>
              <a 
                href={`https://sepolia.etherscan.io/tx/${txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline font-mono text-xs"
              >
                {txHash}
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}