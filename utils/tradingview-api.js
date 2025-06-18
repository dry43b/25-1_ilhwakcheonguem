export class TradingViewAPI {
  constructor() {
    this.ws = null;
    this.callbacks = new Map();
  }

  // WebSocket 연결
  connect() {
    this.ws = new WebSocket('wss://data.tradingview.com/socket.io/websocket');
    
    this.ws.onopen = () => {
      console.log('TradingView WebSocket 연결됨');
      // 연결 후 필요한 초기 메시지 전송
      this.sendMessage('set_auth_token', ['unauthorized_user_token']);
    };

    this.ws.onmessage = (event) => {
      this.handleMessage(event.data);
    };

    this.ws.onerror = (error) => {
      console.error('WebSocket 에러:', error);
    };

    this.ws.onclose = () => {
      console.log('WebSocket 연결 종료');
      // 재연결 로직
      setTimeout(() => this.connect(), 5000);
    };
  }

  // 메시지 처리
  handleMessage(data) {
    try {
      const message = JSON.parse(data);
      if (message.m && this.callbacks.has(message.m)) {
        this.callbacks.get(message.m)(message.p);
      }
    } catch (error) {
      console.error('메시지 파싱 에러:', error);
    }
  }

  // 메시지 전송
  sendMessage(method, params = []) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      const message = JSON.stringify({
        m: method,
        p: params
      });
      this.ws.send(message);
    }
  }

  // 심볼 구독
  subscribeToSymbol(symbol, callback) {
    const sessionId = `session_${Date.now()}`;
    this.callbacks.set('quote_completed', callback);
    
    this.sendMessage('quote_create_session', [sessionId]);
    this.sendMessage('quote_set_fields', [
      sessionId,
      'ch', 'chp', 'current_session', 'description', 'local_description',
      'language', 'exchange', 'fractional', 'is_tradable', 'lp', 'lp_time',
      'minmov', 'minmove2', 'original_name', 'pricescale', 'pro_name',
      'short_name', 'type', 'update_mode', 'volume', 'currency_code',
      'rchp', 'rtc'
    ]);
    this.sendMessage('quote_add_symbols', [sessionId, symbol]);
  }

  // 연결 해제
  disconnect() {
    if (this.ws) {
      this.ws.close();
    }
  }
}
