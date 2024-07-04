import React from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

export default function Mailing() {
  return (
    <section className="mb-12 md:mb-16 lg:mb-20">
    <div className="space-y-4">
      <h2 className="text-2xl font-bold tracking-tighter md:text-3xl">Join our community today</h2>
      <p className="text-muted-foreground">
        Sign up for our newsletter to stay up-to-date with the latest news and updates.
      </p>
    </div>
    <div className="mx-auto w-full max-w-sm space-y-2 mt-6">
      <form className="flex gap-2">
        <Input type="email" placeholder="Enter your email" className="max-w-lg flex-1" />
        <Button type="submit">Subscribe</Button>
      </form>
    </div>
  </section>
  )
}
