/**
 * v0 by Vercel.
 * @see https://v0.dev/t/LSqwa7rP9mV
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client";
import { CardTitle, CardDescription, Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import logout from "@/firebase/auth/logout";
import { auth } from "@/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import updateStatus from "@/queries/changeLoginStatus";
export default function Warning() {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const logoutUser = async () => {
    updateStatus(user?.email as string, "Offline").then(() => {
      logout();
      router.push("/auth/login");
    });
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black bg-opacity-50">
      <Card className="bg-gradient-to-br from-yellow-200 to-yellow-100 border-yellow-400 rounded-2xl shadow-lg p-6 max-w-sm w-full mx-auto">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <TriangleAlertIcon className="h-10 w-10 text-yellow-500" />
          </div>
          <div className="ml-4">
            <CardTitle className="text-2xl font-bold text-yellow-800">
              Warning
            </CardTitle>
            <CardDescription className="mt-2 text-yellow-700">
              There is a potential issue that requires your attention.
            </CardDescription>
          </div>
        </div>
        <div className="mt-6 flex justify-center">
          <Button className="bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700 text-white font-bold py-3 px-6 rounded-full shadow-md transition-colors"
          onClick={logoutUser}>
            Dismiss
          </Button>
        </div>
      </Card>
    </div>
  );
}

function TriangleAlertIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  );
}
