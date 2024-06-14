/**
 * v0 by Vercel.
 * @see https://v0.dev/t/b3r9iiyTKr9
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link"
interface AccountVerificationTemplateProps {
  email:string;
  password:string;

}
const AccountVerificationTemplate = ({email,password}:AccountVerificationTemplateProps) => {
  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-xl shadow-lg">
      <header className="py-6 px-8 bg-gray-900 rounded-t-xl">
        <Link href="#" className="flex items-center justify-center" prefetch={false}>
          <img src="/speety_logo.png" alt="" />
        </Link>
      </header>
      <main className="py-8 px-8">
        <h1 className="text-2xl font-bold mb-4">Welcome to Scail</h1>
        <p className="text-gray-600 mb-6">
          Your account has been successfully verified. We&apos;re excited to have you on board!
        </p>
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-2">Your Credentials:</h2>
          <p className="text-gray-600">Email: {email}</p>
          <p className="text-gray-600">Password: {password}</p>
        </div>
        <Link
          href="#"
          className="inline-flex items-center justify-center px-6 py-3 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
          prefetch={false}
        >
          Visit Our Website
        </Link>
      </main>
      <footer className="py-4 px-8 bg-gray-100 rounded-b-xl">
        <p className="text-gray-500 text-sm">&copy; 2024 Scail.it All rights reserved.</p>
      </footer>
    </div>
  )
}

export default AccountVerificationTemplate