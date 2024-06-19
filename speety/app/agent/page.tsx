"use client";
import React, { useState, useEffect, useMemo, useRef } from "react";
//import NavbarLeft from "@/components/navbarLeft";
import { agentQ } from "@/queries/Transactions/agentQ";
import poppins from "@/font/font";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AgentProp from "@/services/agent/AgentProp";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationNext } from "@/components/ui/pagination"
import Rating from '@mui/material/Rating';
interface LocationData {
  lat: number;
  lng: number;
}

export default function Agent() {
  const [zipVal, setZipVal] = useState<string>("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setZipVal(event.target.value);
  };
  const [agents, setAgents] = useState<any>([]);
  const mapRef =useRef<HTMLDivElement>();


  async function handleSubmit(event:any ) {
    event.preventDefault();
    //write a logic to retrieve the entries from database based on the form data
    return new Promise((resolve, reject) => {
      agentQ(zipVal)
        .then((agentList) => {
          setAgents(agentList);
          resolve(agentList);
        })
        .catch((error) => {
          reject(error);
        });
    }); 
}

  //handling search results
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)


  const handleSearch = (e:any) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1)
  }
  const filteredAgents = useMemo(() => {
    return agents.filter((agent:any) => agent.name.toLowerCase().includes(searchTerm.toLowerCase()))
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
        setAgents((prevAgents:any) => [...prevAgents].sort((a, b) => a.name.localeCompare(b.name)))
        setSortOrder("desc")
      } else {
        setAgents((prevAgents:any) => [...prevAgents].sort((a, b) => b.name.localeCompare(a.name)))
        setSortOrder("asc")
      }
    } else if (sortBy === "broker") {
      if (sortOrder === "asc") {
        setAgents((prevAgents:any) => [...prevAgents].sort((a, b) => a.broker.localeCompare(b.broker)))
        setSortOrder("desc")
      } else {
        setAgents((prevAgents:any) => [...prevAgents].sort((a, b) => b.broker.localeCompare(a.broker)))
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


  //HANDLING MAPS
  const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false);
  const googlemap = useRef<HTMLDivElement>(null);
  const map_ = useRef<google.maps.Map | null>(null);
  //making a list of addresses from presentListings using joinAddress function
  const [addressList, setAddressList] = useState<string[]>([]);
  const [addressLatLng, setAddressLatLng] = useState<LocationData[]>([]);
  useEffect(() => {
    if (agents) {
      const addresses = agents.map((agent:any) => {
        return `${agent.address}, ${agent.city}, ${agent.state}, ${agent.zip}, "USA`;
      });
      setAddressList(addresses);
    }
  }, [agents]);

  useEffect(() => {
    const geocodeDestination = async (address: any): Promise<LocationData> => {
      const myGeocoder = new google.maps.Geocoder();
      return new Promise<LocationData>((resolve, reject) => {
        myGeocoder.geocode({ address }, (results, status) => {
          if (status === "OK" && results) {
            const destinationLocation = {
              lat: results[0].geometry.location.lat(),
              lng: results[0].geometry.location.lng(),
            };
            resolve(destinationLocation);
          } else {
            reject(new Error("Geocode request failed."));
          }
        });
      });
    };

//now we make a list of Latitudes and Longitudes of the addresses
    const getLatLngList = async () => {
      const latLngList = await Promise.all(
        addressList.map(async (address) => {
          return await geocodeDestination(address);
        })
      );
      setAddressLatLng(latLngList);
    };
    if (addressList.length > 0) {
      getLatLngList();
    }
  }, [addressList])


  useEffect(() => {

    const initializeMap = () => {
      if (!google.maps.Map){
        return; 
      }

      const _autocomplete = new window.google.maps.places.Autocomplete(
        document.getElementById('autocomplete') as HTMLInputElement
        );
//setting center as new york
      const map = new google.maps.Map(googlemap.current as HTMLDivElement, {
        zoom: 4,
        center: addressLatLng[0],
        mapId: "LocationTrackingMap",
      });

      map_.current = map;

      setGoogleMapsLoaded(true);

      //create a marker for each address in the list
      addressLatLng.forEach((location, index) => {
        const marker = new google.maps.Marker({
          position: location,
          map,
          label: `${index + 1}`,
          icon: {
            url: "https://cdn-icons-png.flaticon.com/512/6830/6830146.png",
            scaledSize: new google.maps.Size(40, 40),
          },
        });
      });
    };
    if (!window.google) {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://maps.googleapis.com/maps/api/js?v=3.57&key=AIzaSyAvamq-1AR2paooKX-Hq7LvyyfIbwNsVVU&libraries=places`;
      script.async = true;
      script.defer = true;
      script.addEventListener("load", initializeMap); 
      document.body.appendChild(script);
    } else {
        initializeMap(); // If Google Maps is already loaded
    }
  }, [addressLatLng]);




  return (
    <div className={poppins.className}>
      <Header />
      <div>
        <img src="/sellAgent.png" alt="alt" className="w-full"/>
        <section className=" absolute inset-0 top-80">
          <h1 className="text-7xl font-bold tracking-tighter text-center px-96">
            Sell traditionally with an{" "}
            <button className="bg-red-400 rounded-3xl px-6 py-4">agent</button>
          </h1>
          <div className="flex flex-col items-center justify-center mt-20">
            <input
              id="autocomplete"
              type="text"
              placeholder="Enter a zip code ..."
              className={`bottom-20 h-16 w-1/4 bg-gray-100 text rounded-3xl text-center text-xl`}
              value={zipVal}
              onChange={handleChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmit(e);
                }
              }}
            />
            <button
              className={` text-white bg-black rounded-2xl px-4 h-16 w-60 text-xl font-bold uppercase mt-16`}
              onClick={handleSubmit}
            >
              Find an agent
            </button>
          </div>
          <div className="flex"></div>
        </section>
      </div>


{
  currentAgents && currentAgents.length > 0 ? (
    <div className="container mx-auto py-8">
    <div className="mb-4">
      <p className="font-semibold">
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
      {currentAgents.map((agent:any) => (
                    <AgentProp
                    key={agent.id}
                    photoUrl={agent.profilePic}
                    name={agent.name}
                    stars={agent.stars}
                    phone={agent.phone}
                    reviewCount={agent.reviewCount}
                    company={agent.broker}
                    license={agent.license}
                    email={agent.email}
      
                  />
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
    {/* This is the Map section */}
    <section className="flex flex-col items-center space-y-8 py-8 bg-gray-200 rounded-2xl my-6">
      <h1 className="text-5xl tracking-tight font-bold text-black drop-shadow-md">Scail Map&nbsp;🗺️</h1>
      <div className="bg-white p-6 rounded-3xl">
      <div className="w-full max-w-4xl shadow-lg" ref={googlemap as React.RefObject<HTMLDivElement>} style={{ height: "550px", width: "1000px" }}>
      </div>
      </div>

      <div className="flex items-center space-x-4">
        <Button variant="outline" className="text-black hover:bg-white hover:text-primary">
          Zoom In
        </Button>
        <Button variant="outline" className="text-black hover:bg-white hover:text-primary">
          Zoom Out
        </Button>
      </div>
    </section>
  </div>
  ):null
}
       
      <Footer />
    </div>
  );
}
