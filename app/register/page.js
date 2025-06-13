import {MongoClient} from 'mongodb';
import {hash} from 'bcryptjs';



export default function Register() {
    return (
        <div className="bg-gray-200 min-h-screen p-5 text-black">
            <div className="p-10 bg-white rounded-lg shadow-md max-w-md mx-auto h-100">
                <h1 className="text-2xl font-bold mb-6 text-center">회원가입</h1>
                <div>
                    <form method="POST" action="/api/auth/signup" className="space-y-4">
                        <div className="mb-4">
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">아이디</label>
                            <input name="username" type="text" id="username" className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500" placeholder="아이디를 입력하세요" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">비밀번호</label>
                            <input name="password" type="password" id="password" className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500" placeholder="비밀번호를 입력하세요" />
                        </div>
                        <button type="submit" className="w-full bg-gray-200 text-white py-2 rounded-md hover:bg-orange-500 transition duration-200">회원가입</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
