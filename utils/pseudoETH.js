// utils/pseudoEth.js
const PSEUDO_ETH_KEY = 'pseudoEth_balance'
const PSEUDO_ETH_TRANSACTIONS_KEY = 'pseudoEth_transactions'

export class PseudoEthManager {
  constructor(userId) {
    this.userId = userId
    this.storageKey = `${PSEUDO_ETH_KEY}_${userId}`
    this.transactionsKey = `${PSEUDO_ETH_TRANSACTIONS_KEY}_${userId}`
  }

  // 초기 잔액 설정 (최초 로그인 시)
  initializeBalance(amount = 100) {
    const existingBalance = this.getBalance()
    if (existingBalance === null) {
      localStorage.setItem(this.storageKey, amount.toString())
      return amount
    }
    return existingBalance
  }

  // 잔액 조회
  getBalance() {
    const balance = localStorage.getItem(this.storageKey)
    return balance ? parseFloat(balance) : null
  }

  // 잔액 설정
  setBalance(amount) {
    localStorage.setItem(this.storageKey, amount.toString())
  }

  // 의사ETH 전송
  transfer(toAddress, amount, fromAddress) {
    const currentBalance = this.getBalance()
    
    if (currentBalance < amount) {
      throw new Error('잔액이 부족합니다.')
    }

    // 잔액 차감
    this.setBalance(currentBalance - amount)

    // 거래 기록
    const transaction = {
      id: Date.now().toString(),
      type: 'pseudo',
      from: fromAddress,
      to: toAddress,
      amount: amount,
      timestamp: new Date().toISOString(),
      status: 'confirmed',
      hash: `pseudo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    }

    this.addTransaction(transaction)
    return transaction
  }

  // 의사ETH 받기
  receive(fromAddress, amount, toAddress) {
    const currentBalance = this.getBalance()
    this.setBalance(currentBalance + amount)

    const transaction = {
      id: Date.now().toString(),
      type: 'pseudo',
      from: fromAddress,
      to: toAddress,
      amount: amount,
      timestamp: new Date().toISOString(),
      status: 'confirmed',
      hash: `pseudo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    }

    this.addTransaction(transaction)
    return transaction
  }

  // 거래 내역 추가
  addTransaction(transaction) {
    const transactions = this.getTransactions()
    transactions.unshift(transaction)
    localStorage.setItem(this.transactionsKey, JSON.stringify(transactions))
  }

  // 거래 내역 조회
  getTransactions() {
    const transactions = localStorage.getItem(this.transactionsKey)
    return transactions ? JSON.parse(transactions) : []
  }

  // 무료 의사ETH 받기 (Faucet)
  faucet(address, amount = 10) {
    const currentBalance = this.getBalance()
    this.setBalance(currentBalance + amount)

    const transaction = {
      id: Date.now().toString(),
      type: 'pseudo',
      from: 'FAUCET',
      to: address,
      amount: amount,
      timestamp: new Date().toISOString(),
      status: 'confirmed',
      hash: `faucet_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    }

    this.addTransaction(transaction)
    return transaction
  }
}