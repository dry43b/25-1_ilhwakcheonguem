import { SignIn } from "@clerk/nextjs";

export const runtime = 'edge'

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
  <div className="w-full max-w-md">
    <div className="p-6">
      {/* 로그인 박스 내용 */}
    <SignIn/>
    </div>
    </div>
    </div>
);
}