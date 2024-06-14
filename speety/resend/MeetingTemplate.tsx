/**
 * v0 by Vercel.
 * @see https://v0.dev/t/sElhfcKO4st
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link"
interface MeetingTemplateProps {
  sender:string;
  date:string;
}
const MeetingTemplate = ({sender,date}:MeetingTemplateProps) => {
  return (
    <div className="mx-auto max-w-3xl bg-white p-6 rounded-lg shadow-lg">
      <div className="flex items-center justify-center w-full bg-gray-100">
        <img src="/speety_logo.png" alt="" />
      </div>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Scail Meet Invite</h2>
      </div>
      <div className="mt-4 space-y-4">
        <p className="text-gray-600">Hello,</p>
        <p className="text-gray-600">
          You have been invited to a Scail meet video conference by {sender}. Please find the details below:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-semibold">Video Conference</p>
              <p className="text-sm text-gray-600">{date}</p>
            </div>
            <Link
              href="#"
              className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              prefetch={false}
            >
              Join Meeting
            </Link>
          </div>
        </div>
        <p className="text-gray-600">
          Please join the meeting on time and feel free to reach out if you have any questions.
        </p>
        <p className="text-gray-600">
          Best regards,
          <br />
          Scail Team
        </p>
      </div>
    </div>
  )
}

export default MeetingTemplate