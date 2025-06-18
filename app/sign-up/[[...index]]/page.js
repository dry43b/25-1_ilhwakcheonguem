import { SignUp } from "@clerk/nextjs";
 
export const runtime = 'edge'

export default function SignUpPage() {
  return (
  <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
  <div className="w-full max-w-md">
    <div className="p-6">
    <SignUp />
    </div>
    </div>
    </div>
    );
}