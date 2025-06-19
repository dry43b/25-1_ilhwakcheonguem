export const runtime = 'edge'

export default function Learn() {
    return (
<div className="min-h-screen flex flex-col">
    <div className="w-full bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 dark:bg-gray-900 py-12">
        <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto">
                <h1 className="text-3xl text-neutral-950 font-bold mb-4">MetaMask 설치 가이드</h1>
            </div>
        </div>
    </div>
    
    <div>
        <section className="w-full bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 dark:bg-gray-900 py-12">
            <div className="container mx-auto px-4">
                <div className="rounded-xl border bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 dark:bg-gray-900 shadow max-w-2xl mx-auto">
                    <div className="px-6 py-4 border-b">
                        <h2 className="text-gray-700 text-xl font-bold">1. MetaMask 다운로드</h2>
                    </div>
                    <div className="text-gray-700 px-6 py-4">
                        <p className="mb-4">아래 링크에서MetaMask 확장 프로그램을 추가해주세요!</p>
                        <a href="https://metamask.io/" target="_blank" className="inline-flex h-9 items-center justify-center gap-2 whitespace-nowrap rounded-md bg-black px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-gray-800">MetaMask 공식 웹사이트</a>
                    </div>
                </div>
            </div>
        </section>
        
        <section className="w-full py-12 bg-gray-100">
            <div className="container mx-auto px-4">
                <div className="rounded-xl border bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 dark:bg-gray-900 shadow max-w-2xl mx-auto">
                    <div className="px-6 py-4 border-b">
                        <h2 className="text-gray-700 text-xl font-bold">2. 브라우저 확장 프로그램 설치</h2>
                    </div>
                    <div className="text-gray-700 px-6 py-4">
                        <ol className="list-decimal pl-5 space-y-2">
                            <li>크롬, 파이어폭스, 엣지, 또는 Brave 브라우저를 열고 MetaMask 확장 프로그램을 추가하세요.</li>
                            <li>브라우저 상단의 &quot;확장 프로그램&quot; 아이콘을 클릭하고 MetaMask를 고정하세요.</li>
                        </ol>
                    </div>
                </div>
            </div>
        </section>
        
        <section className="w-full bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 dark:bg-gray-900 py-12">
            <div className="container mx-auto px-4">
                <div className="rounded-xl border bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 dark:bg-gray-900 shadow max-w-2xl mx-auto">
                    <div className="px-6 py-4 border-b">
                        <h2 className="text-gray-700 text-xl font-bold">3. 지갑 생성</h2>
                    </div>
                    <div className="text-gray-700 px-6 py-4">
                        <ol className="list-decimal pl-5 space-y-2">
                            <li>MetaMask 아이콘을 클릭한 후 &quot;시작하기&quot;를 선택하세요.</li>
                            <li>새 지갑을 생성하거나 기존 지갑을 복구할 수 있습니다.</li>
                            <li>지갑 생성 시 비밀번호를 설정하고, 비밀 복구 구문(Seed Phrase)을 안전한 곳에 저장하세요.</li>
                        </ol>
                    </div>
                </div>
            </div>
        </section>
        
        <section className="w-full py-12 bg-gray-100">
            <div className="container mx-auto px-4">
                <div className="rounded-xl border bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 dark:bg-gray-900 shadow max-w-2xl mx-auto">
                    <div className="px-6 py-4 border-b">
                        <h2 className="text-gray-700 text-xl font-bold">4. 설치 완료</h2>
                    </div>
                    <div className="text-gray-700 px-6 py-4">
                        <p>MetaMask 설치가 완료되었습니다.</p>
                    </div>
                </div>
            </div>
        </section>
        
        <section className="w-full bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 dark:bg-gray-900 py-12">
            <div className="container mx-auto px-4">
                <div className="rounded-xl border bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 dark:bg-gray-900 shadow max-w-2xl mx-auto">
                    <div className="px-6 py-4 border-b">
                        <h2 className="text-gray-700 text-xl font-bold">5. 이용방법</h2>
                    </div>
                    <div className="text-gray-700 px-6 py-4">
                        <ol className="list-decimal pl-5 space-y-2">
                            <li>메인 화면에 Get Started를 통해 이메일과 받으실 토큰을 입력해주세요!</li>
                            <li>우측 상단 MetaMask 아이콘을 클릭한 후 로그인 해주세요.</li>
                            <li>왼쪽 상단 네트워크 선택란에서 테스트 네트워크 Sepolia를 선택해주세요.</li>
                            <li>토큰창 안에 +가져오기를 누르고 본인 이메일에 전송된 토큰 계약 주소를 입력해주세요. (확인에 시간이 걸리니 조금만 기다려주세요.)</li>
                            <li>코인에 연결 완료되면 지급하신 코인을 가지고 주식 시장에 참여하세요!</li>
                        </ol>
                    </div>
                </div>
            </div>
        </section>
    </div>
</div>
    );
}