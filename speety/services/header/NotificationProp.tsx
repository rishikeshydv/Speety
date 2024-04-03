/**
 * v0 by Vercel.
 * @see https://v0.dev/t/QuFIIA2RWto
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
interface NotificationProps {
from:string
type:string
date:string
}
const NotificationProp:React.FC<NotificationProps> = ({from,type,date}) => {
    return (
      <div className="grid items-center gap-4 px-4 py-2 border rounded-lg hover:shadow-md transition-colors">
        <div className="grid gap-1.5">
        <MailOpenIcon className="text-blue-500 w-5 h-5" />
          <p className="text-sm font-medium">{from} sent you a {type} notification</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{date}</p>
        </div>
      </div>
    )
  }
  export default NotificationProp;
  function MailOpenIcon(props:any) {
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
        <path d="M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z" />
        <path d="m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10" />
      </svg>
    )
  }
  