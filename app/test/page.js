import ThemeToggle from '@/components/ThemeToggle'

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:bg-gray-900 text-gray-900 dark:text-white dark:text-gray-100 transition-colors">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Next.js 14 다크모드</h1>
          <ThemeToggle />
        </div>
        
        <div className="space-y-4">
          <p className="text-lg">
            이것은 다크모드와 라이트모드를 지원하는 페이지입니다.
          </p>
          
          <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">카드 예시</h2>
            <p>배경색과 텍스트 색상이 테마에 따라 자동으로 변경됩니다.</p>
          </div>
        </div>
      </div>
    </main>
  )
}
