/**
 * v0 by Vercel.
 * @see https://v0.dev/t/deQWY5CFJTv
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
interface NewsType {
    date: string
    source: string
    header: string
    paragraph1: string
    paragraph2: string
    paragraph3: string
    image: string
}

interface NewsData {
    news: NewsType[]
}

const NewsletterTemplate = ({news}:NewsData) => {
  return (
    <div className="bg-background text-foreground font-sans">
      <header className="bg-primary text-primary-foreground py-4 px-6">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="#" prefetch={false}>
            <MountainIcon className="h-8 w-8" />
            <span className="sr-only">Scail</span>
          </Link>
        </div>
      </header>
      <main>
        <section className="bg-muted py-12 md:py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Monthly Newsletter</h1>
                <p className="text-muted-foreground text-lg">
                  Stay up-to-date with the latest news and updates from Scail.
                </p>
              </div>
              {/* Replace with a Real Estate Image */}
              <img
                src="/placeholder.svg"
                width="500"
                height="300"
                alt="Newsletter Hero"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </section>
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Featured Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>{news[0].header}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                       { news[0].paragraph1}
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Link href="/news" className="text-primary hover:underline" prefetch={false}>
                        Read more
                      </Link>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>{news[1].header}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        {news[1].paragraph1}
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Link href="/news" className="text-primary hover:underline" prefetch={false}>
                        Read more
                      </Link>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>{news[2].header}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        {news[2].paragraph1}
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Link href="/news" className="text-primary hover:underline" prefetch={false}>
                        Read more
                      </Link>
                    </CardFooter>
                  </Card>
                </div>
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Company Updates</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>{news[3].header}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                       {news[3].paragraph1}
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Link href="/news" className="text-primary hover:underline" prefetch={false}>
                        Learn more
                      </Link>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>{news[4].header}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                    {news[4].paragraph1}
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Link href="/news" className="text-primary hover:underline" prefetch={false}>
                        Learn More
                      </Link>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-primary text-primary-foreground py-12 md:py-20">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Join our community</h2>
              <p className="text-lg">Sign up for our newsletter to stay up-to-date with the latest news and updates.</p>
              <form className="flex gap-2 justify-center">
                <Input type="email" placeholder="Enter your email" className="max-w-lg flex-1" />
                <Button type="submit">Subscribe</Button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-muted text-muted-foreground py-6">
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <p className="text-sm">&copy; 2024 Acme Inc. All rights reserved.</p>
          <nav className="flex items-center space-x-4">
            <Link href="#" className="text-sm hover:underline" prefetch={false}>
              Privacy
            </Link>
            <Link href="#" className="text-sm hover:underline" prefetch={false}>
              Terms
            </Link>
            <Link href="#" className="text-sm hover:underline" prefetch={false}>
              Contact
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}

function MountainIcon(props:any) {
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
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}

export default NewsletterTemplate