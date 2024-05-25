
import { Button } from "@/components/ui/button";

const DummyChatList = () => {


  return (
    <div className="flex h-[calc(89%-0px)] flex-col mt-1">
    <div className="flex-1 bg-gray-200 rounded-lg p-4 overflow-scroll">
              </div>

            
    {/* Sendbar */}
    <div className="h-4 flex flex-row w-full mt-1">
    <div className="w-full bg-gray-200 border-gray-200 rounded-2xl">
      <div className="rounded-xl bg-gray-200 dark:bg-gray-900 py-2 px-6">
        <div className="grid w-full ">
          <input 
          className="text-black bg-gray-200 text-md" 
          placeholder='Type your message here...'
          />
        </div>
      </div>
    </div>
    <button className="ml-4 h-10 w-10">
      <SmileIcon className="w-6 h-6" />
    </button>
    <button className="ml-4 h-10 w-10 rounded-full">
      <PaperclipIcon className="w-6 h-6" />
    </button>
    <button className="ml-4 h-10 w-10 rounded-full">
      <MicIcon className="w-6 h-6" />
    </button>
    <Button 
    className="ml-4 text-sm h-10 px-6"
    >Send</Button>
  </div>
            </div>

  );
}

export default DummyChatList;

function MicIcon(props: any) {
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
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" x2="12" y1="19" y2="22" />
    </svg>
  );
}

function PaperclipIcon(props: any) {
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
      <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
    </svg>
  );
}


function SmileIcon(props: any) {
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
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <line x1="9" x2="9.01" y1="9" y2="9" />
      <line x1="15" x2="15.01" y1="9" y2="9" />
    </svg>
  );
}
