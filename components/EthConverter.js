// components/EthConverter.js
'use client'
import { useState } from 'react'

export default function EthConverter({ pseudoEthManager, onConvert }) {
  const [convertMode, setConvertMode] = useState('toReal') // 'toReal' or 'toPseudo'
  const [amount, setAmount] = useState('')

  const handleConvert = () => {
    const convertAmount = parseFloat(amount)
    if (!convertAmount || convertAmount <= 0) {
      alert('올바른 금액을 입력하세요.')
      return
    }

    if (convertMode === 'toReal') {
      // 의사ETH → 실제ETH (시뮬레이션)
      const pseudoBalance = pseudoEthManager.getBalance()
      if (convertAmount > pseudoBalance) {
        alert('의사ETH 잔액이 부족합니다.')
        return
      }
      
      // 의사ETH 차감
      pseudoEthManager.setBalance(pseudoBalance - convertAmount)
      
      alert(`${convertAmount} pETH를 실제ETH로 변환 요청했습니다. (시뮬레이션)`)
    } else {
      // 실제ETH → 의사ETH (시뮬레이션)
      const pseudoBalance = pseudoEthManager.getBalance()
      pseudoEthManager.setBalance(pseudoBalance + convertAmount)
      
      alert(`${convertAmount} ETH를 의사ETH로 변환했습니다. (시뮬레이션)`)
    }

    setAmount('')
    onConvert?.()
  }

  return (
    <div className="bg-yellow-50 p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-bold mb-4">ETH 변환 (시뮬레이션)</h3>
      
      <div className="flex justify-center mb-4">
        <div className="flex bg-gray-200 rounded-lg p-1">
          <button
            onClick={() => setConvertMode('toReal')}
            className={`px-4 py-2 rounded-md text-sm ${
              convertMode === 'toReal' ? 'bg-blue-500 text-white' : 'text-gray-600'
            }`}
          >
            pETH → ETH
          </button>
          <button
            onClick={() => setConvertMode('toPseudo')}
            className={`px-4 py-2 rounded-md text-sm ${
              convertMode === 'toPseudo' ? 'bg-green-500 text-white' : 'text-gray-600'
            }`}
          >
            ETH → pETH
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <input
          type="number"
          step="0.001"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-3 border rounded-lg"
          placeholder="변환할 금액"
        />
        
        <button
          onClick={handleConvert}
          className="w-full bg-yellow-500 text-white py-3 rounded-lg hover:bg-yellow-600"
        >
          {convertMode === 'toReal' ? 'pETH → ETH 변환' : 'ETH → pETH 변환'}
        </button>
      </div>
      
      <div className="mt-3 text-xs text-gray-600 text-center">
        ⚠️ 이는 테스트 목적의 시뮬레이션입니다
      </div>
    </div>
  )
}