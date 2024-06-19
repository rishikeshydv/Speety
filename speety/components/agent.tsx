/**
* This code was generated by v0 by Vercel.
* @see https://v0.dev/t/fjNVdcZsS8S
* Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
*/

/** Add fonts into your Next.js project:

import { Judson } from 'next/font/google'
import { Chivo } from 'next/font/google'

judson({
  subsets: ['latin'],
  display: 'swap',
})

chivo({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
"use client"

import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationNext } from "@/components/ui/pagination"

export function Agent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [agents, setAgents] = useState([
    {
      id: 1,
      name: "John Doe",
      phone: "123-456-7890",
      broker: "ABC Realty",
      license: "123456",
      title: "AI Assistant",
      bio: "John is an experienced AI assistant with a passion for helping humans.",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 2,
      name: "Jane Smith",
      phone: "987-654-3210",
      broker: "XYZ Brokers",
      license: "789012",
      title: "Chatbot Engineer",
      bio: "Jane is a skilled chatbot engineer who specializes in natural language processing.",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 3,
      name: "Michael Johnson",
      phone: "555-123-4567",
      broker: "Acme Realty",
      license: "345678",
      title: "Conversational Designer",
      bio: "Michael is a creative conversational designer who crafts engaging dialogues.",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 4,
      name: "Emily Davis",
      phone: "111-222-3333",
      broker: "Best Homes",
      license: "901234",
      title: "AI Researcher",
      bio: "Emily is a passionate AI researcher exploring the latest advancements in the field.",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 5,
      name: "David Wilson",
      phone: "444-555-6666",
      broker: "Apex Realtors",
      license: "567890",
      title: "Automation Specialist",
      bio: "David is an expert in automating repetitive tasks and improving workflows.",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 6,
      name: "Sarah Lee",
      phone: "777-888-9999",
      broker: "Pinnacle Properties",
      license: "012345",
      title: "Machine Learning Engineer",
      bio: "Sarah is a skilled machine learning engineer who develops intelligent systems.",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 7,
      name: "Alex Thompson",
      phone: "222-333-4444",
      broker: "Summit Realty",
      license: "678901",
      title: "Natural Language Processing Scientist",
      bio: "Alex is a leading expert in natural language processing, working on cutting-edge AI technologies.",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 8,
      name: "Olivia Hernandez",
      phone: "666-777-8888",
      broker: "Horizon Homes",
      license: "234567",
      title: "Conversational UI Designer",
      bio: "Olivia is a talented conversational UI designer, creating intuitive and user-friendly interfaces.",
      image: "/placeholder.svg?height=100&width=100",
    },
  ])
  const handleSearch = (e:any) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1)
  }
  const filteredAgents = useMemo(() => {
    return agents.filter((agent) => agent.name.toLowerCase().includes(searchTerm.toLowerCase()))
  }, [agents, searchTerm])
  const agentsPerPage = 6
  const totalPages = Math.ceil(filteredAgents.length / agentsPerPage)
  const startIndex = (currentPage - 1) * agentsPerPage
  const endIndex = startIndex + agentsPerPage
  const currentAgents = filteredAgents.slice(startIndex, endIndex)
  const handlePageChange = (page:any) => {
    setCurrentPage(page)
  }
  const indexOfFirstItem = startIndex + 1
  const indexOfLastItem = endIndex
  const totalResults = filteredAgents.length
  const [sortOrder, setSortOrder] = useState("asc")
  const [filterBy, setFilterBy] = useState("")
  const handleSort = (sortBy:any) => {
    if (sortBy === "name") {
      if (sortOrder === "asc") {
        setAgents((prevAgents) => [...prevAgents].sort((a, b) => a.name.localeCompare(b.name)))
        setSortOrder("desc")
      } else {
        setAgents((prevAgents) => [...prevAgents].sort((a, b) => b.name.localeCompare(a.name)))
        setSortOrder("asc")
      }
    } else if (sortBy === "broker") {
      if (sortOrder === "asc") {
        setAgents((prevAgents) => [...prevAgents].sort((a, b) => a.broker.localeCompare(b.broker)))
        setSortOrder("desc")
      } else {
        setAgents((prevAgents) => [...prevAgents].sort((a, b) => b.broker.localeCompare(a.broker)))
        setSortOrder("asc")
      }
    }
  }
  const handleFilter = (filterValue:any) => {
    setFilterBy(filterValue)
  }
  const filteredAndSortedAgents = useMemo(() => {
    let sortedAgents = [...agents]
    if (sortOrder === "asc") {
      sortedAgents.sort((a, b) => a.name.localeCompare(b.name))
    } else {
      sortedAgents.sort((a, b) => b.name.localeCompare(a.name))
    }
    if (filterBy) {
      sortedAgents = sortedAgents.filter((agent) => agent.broker.toLowerCase().includes(filterBy.toLowerCase()))
    }
    return sortedAgents
  }, [agents, sortOrder, filterBy])
  return (
    <div className="container mx-auto py-8">
      <div className="mb-4">
        <p>
          Showing {indexOfFirstItem}-{Math.min(indexOfLastItem, totalResults)} of {totalResults} results
        </p>
      </div>
      <div className="mb-8 flex items-center justify-between">
        <Input
          type="text"
          placeholder="Search agents..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full max-w-md"
        />
        <div className="flex items-center">
          <Button variant="outline" className="mr-2" onClick={() => handleSort("name")}>
            Sort by Name
          </Button>
          <Button variant="outline" className="mr-2" onClick={() => handleSort("broker")}>
            Sort by Broker
          </Button>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Filter</Button>
            </PopoverTrigger>
            <PopoverContent className="p-4">
              <Input
                type="text"
                placeholder="Filter by broker..."
                value={filterBy}
                onChange={(e) => handleFilter(e.target.value)}
                className="mb-4"
              />
              <Button variant="outline" onClick={() => handleFilter("")}>
                Clear Filter
              </Button>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentAgents.map((agent) => (
          <div key={agent.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden relative">
            <div className="absolute top-4 right-4 rounded-full bg-white/80 px-3 py-1 text-sm font-semibold">
              {agent.license}
            </div>
            <img
              src="/placeholder.svg"
              alt={agent.name}
              width={200}
              height={200}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-medium">{agent.name}</h3>
                <div className="flex items-center">
                  <StarIcon className="w-4 h-4 fill-primary" />
                  <StarIcon className="w-4 h-4 fill-primary" />
                  <StarIcon className="w-4 h-4 fill-primary" />
                </div>
              </div>
              <p className="text-gray-500 dark:text-gray-400 mb-2">Phone: {agent.phone}</p>
              <p className="text-gray-500 dark:text-gray-400 mb-2">Broker: {agent.broker}</p>
              <p className="text-gray-700 dark:text-gray-300 line-clamp-3">{agent.bio}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => handlePageChange(currentPage - 1)}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink href="#" isActive={page === currentPage} onClick={() => handlePageChange(page)}>
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() => handlePageChange(currentPage + 1)}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}

function StarIcon(props:any) {
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
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}
