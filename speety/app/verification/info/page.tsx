import Section1 from "@/components/LandingPage/Section1"
import Section7 from "@/components/LandingPage/Section7"


/**
 * v0 by Vercel.
 * @see https://v0.dev/t/ITZNbkCdp7M
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

export default function Info() {

    //the url of this page also has its ticket number in it
    //we will retrieve the ticket number from the url using the useRouter hook
    //and then we will fetch the details of the ticket from the database using the ticket number
    //once the roblox front end is done, i will create a PROP for the ticket details and pass it to the page
    //the ticket details will be displayed on the page using the PROP
    
    return (
      <div className="space-y-6">
        <Section1 />
        <div className="px-20 py-10">
        <header className="space-y-1">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tighter">Ticket Number: T001</h1>
          </div>
          <dl className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center space-x-1">
              <dt className="font-medium">Date</dt>
              <dd className="text-neutral-600 dark:text-neutral-400">March 22, 2024</dd>
            </div>
            <div className="flex items-center space-x-1">
              <dt className="font-medium">Status</dt>
              <dd className="text-neutral-600 dark:text-neutral-400">Open</dd>
            </div>
          </dl>
        </header>
        <section className="space-y-2">
          <div>
            <h2 className="text-lg font-semibold">Customer Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium w-20">Full Name</span>
                  <span>John Doe</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium w-20">Email</span>
                  <span>john@example.com</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium w-20">Phone</span>
                  <span>1-415-555-1234</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium w-20">Address</span>
                  <span>123 Street Rd, City, Country</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="space-y-2">
          <div>
            <h2 className="text-lg font-semibold">Additional Comments</h2>
            <div className="prose prose-sm max-w-none">
              <p>
                I have tried restarting my device multiple times, but I am still unable to connect to the game servers. I
                keep getting a Connection Timeout error. Is there anything else I can try to resolve this issue?
              </p>
            </div>
          </div>
        </section>
        </div>
        <hr />
        <Section7 />
      </div>
    )
  }
  
  