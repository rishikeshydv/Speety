"use client";
import React, { useEffect, useState, useMemo, useRef } from "react";
import { rentQ } from "@/queries/Transactions/rentQ";
import poppins from "@/font/font";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Typist from "react-typist-component";
import ListingCard from "@/services/agent/ListingCard";
import PresentListingCache from "@/cacheMemory/PresentListingCache";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Link from "next/link"
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationEllipsis, PaginationNext } from "@/components/ui/pagination"
import { auth } from "@/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";

interface LocationData {
  lat: number;
  lng: number;
}

interface Property {
  [key: string]: {
    address: string;
    apartment: string;
    city: string;
    state: string;
    zip: string;
    price: string;
    beds: string;
    baths: string;
    houseType: string;
    transactionType: string;
    listedBy: string;
    brokerId: string;
    imageUrl: string[];
    videoUrl: string[];
    date: string;
    sqft: string;
    lotSize: string;
    yearBuilt: string;
    description: string;
    parkingSpace: string;
    estimatedMortgage: string;
    amenities: string;
  };
}
  //creating a cache object
 const cache = new PresentListingCache(300000); //5 minutes

export default function Rent() {
  const [user] = useAuthState(auth);
  const router = useRouter();
  // if (!user) {
  //   router.push("/auth/login");
  // }
  const [formData, setFormData] = useState({
    zip: "",
    searchType: "Rent",
    priceLower: "",
    priceUpper: "",
    beds: "",
    baths: "",
    homeType: "",
  });
  const [searchResults, setSearchResults] = useState<Property>({});
  const [resultList, setResultList] = useState<Property>({});
  const [resultText, setResultText] = useState<string>("");
  let _refinedList: Property = {};

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    //write a logic to retrieve the entries from database based on the form data
    return new Promise((resolve, reject) => {
      rentQ(
        formData.zip,
        formData.priceLower,
        formData.priceUpper,
        formData.searchType,
        formData.beds,
        formData.baths,
        formData.homeType
      )
        .then((buyList) => {
          setResultList(buyList as Property);
          if (Object.keys(buyList).length === 0) {
            setResultText("No results found!");
          } else {
            setResultText("Results:");
          }
          resolve(buyList);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }


  //refine list
  useEffect(() => {
    const keys = Object.keys(resultList);
    keys.map((key) => {
      if (
        resultList[key]["zip"] == formData.zip &&
        parseInt(resultList[key]["price"]) >= parseInt(formData.priceLower) &&
        parseInt(resultList[key]["price"]) <= parseInt(formData.priceUpper) &&
        resultList[key]["transactionType"] == formData.searchType &&
        resultList[key]["beds"] == formData.beds &&
        resultList[key]["baths"] == formData.baths &&
        resultList[key]["houseType"] == formData.homeType
      ) {
        _refinedList[key] = resultList[key];
        cache.set(key, { ...resultList[key], listerEmail: "" }); // Add the missing listerEmail property
        console.log(cache)
      }
    });
    setSearchResults(_refinedList);
  }, [resultList]);


  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  //zip auto-complete
  useEffect(() => {
    const initializeMap = () => {
      const _autocomplete = new window.google.maps.places.Autocomplete(
        document.getElementById("autocomplete") as HTMLInputElement
      );
    };
    const loadGoogleMapsScript = () => {
      const googleMapsScript = document.createElement("script");
      googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}&libraries=places&v=weekly`;
      googleMapsScript.async = true;
      googleMapsScript.defer = true;
      googleMapsScript.addEventListener("load", initializeMap);
      document.body.appendChild(googleMapsScript);
      
    };

    // Check if the Google Maps script has already been loaded
    if (!window.google) {
      loadGoogleMapsScript();
    }
  }, []);

  //dealing with the search results
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8
  const handlePageChange = (page:any) => {
    setCurrentPage(page)
  }

  const [filterOptions, setFilterOptions] = useState({
    beds: "any",
    baths: "any",
    priceRange: [0, 1000000],
  })
  const [sortOption, setSortOption] = useState("price-asc")
  const handleFilterChange = (type:string, value:string) => {
    setFilterOptions((prevOptions) => ({
      ...prevOptions,
      [type]: value,
    }))
  }
  const handleSortChange = (option:any) => {
    setSortOption(option)
  }
  const filteredResults = useMemo(() => {
    const entries = Object.entries(searchResults);
    const filteredEntries = entries.filter(([key, result]) => {
      const { beds, baths, price } = result;
      const { beds: bedFilter, baths: bathFilter, priceRange } = filterOptions;
  
      // Check bed filter
      if (bedFilter !== "any" && Number(beds) !== Number(bedFilter)) {
        return false;
      }
  
      // Check bath filter
      if (bathFilter !== "any" && Number(baths) !== Number(bathFilter)) {
        return false;
      }
  
      // Check price range
      if (Number(price) < priceRange[0] || Number(price) > priceRange[1]) {
        return false;
      }
  
      return true;
    });
  
    return Object.fromEntries(filteredEntries);
  }, [searchResults, filterOptions]);

const sortedResults = useMemo(() => {
  const entries = Object.entries(filteredResults);
  const sortedEntries = entries.sort(([, a], [, b]) => {
    if (sortOption === "price-asc") {
      return Number(a.price) - Number(b.price);
    } else if (sortOption === "price-desc") {
      return Number(b.price) - Number(a.price);
    } else {
      return 0;
    }
  });

  return Object.fromEntries(sortedEntries);
}, [filteredResults, sortOption]);

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = useMemo(() => {
    const entries = Object.entries(sortedResults);
    const paginatedEntries = entries.slice(indexOfFirstItem, indexOfLastItem);
    return Object.fromEntries(paginatedEntries);
  }, [sortedResults, indexOfFirstItem, indexOfLastItem]);
  const totalPages = useMemo(() => {
    return Math.ceil(Object.keys(sortedResults).length / itemsPerPage);
  }, [sortedResults, itemsPerPage]);
  const totalResults = Object.keys(sortedResults).length;

    //HANDLING MAPS
    const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false);
    const googlemap = useRef<HTMLDivElement>(null);
    const map_ = useRef<google.maps.Map | null>(null);
    //making a list of addresses from presentListings using joinAddress function
    const [addressList, setAddressList] = useState<string[]>([]);
    const [addressLatLng, setAddressLatLng] = useState<LocationData[]>([]);
    useEffect(() => {
      if (searchResults) {
        const addresses = Object.keys(searchResults).map((key) => {
          const property = searchResults[key];
          return `${property.address}, ${property.city}, ${property.state}, ${property.zip}`;
        });
        setAddressList(addresses);
      }
    }, [searchResults]);
  
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
      <div className="">

        <div className="bg-gray-200">
        <img src="/wide1.jpg" alt="alt" className="aspect-video object-cover object-center w-full xl:h-[400px] 2xl:h-[900px]"/>
          <section className="py-10 flex flex-col items-center justify-center absolute bottom-[500px] left-1/4 xl:left-1/4 xl:bottom-1/4 2xl:left-[1200px] 2xl:bottom-1/3">
            {/* "Selling fast" */}
            <div className="text-2xl xl:text-7xl 2xl:text-9xl font-bold flex items-center tracking-tighter text-[#16302B]">
              <span>Renting your home</span>
            </div>

            {/* "Buying smart" with gradient text */}
            <h1 className="text-2xl xl:text-7xl 2xl:text-9xl font-bold flex items-center xl:mb-10 2xl:mb-10 tracking-tighter">
              <span className="text-[#16302B]">with</span>
              &nbsp;
              <span className="text-transparent bg-gradient-to-r from-[#90A955] to-[#397367] bg-clip-text">
                confidence
              </span>
              <img
                src="/sell_house.png"
                className="ml-1 xl:ml-5 2xl:ml-5 w-8 h-8 xl:w-[100px] xl:h-[90px] 2xl:w-[100px] 2xl:h-[90px]"
                alt="Home"
              />
            </h1>
            <div className="py-1 px-4 border font-semibold tracking-tighter border-blue-200 border-opacity-20 text-[#16302B] text-[6px] xl:text-[16px] 2xl:text-[16px] mb-10">
              <Typist>
                Speety is making it simpler to buy your home and settle.
              </Typist>
            </div>
          </section>
        </div>
      
                <div className="flex items-center justify-center p-4 bg-[#87a3a3]">
        <form onSubmit={handleSubmit}>
            <input
              type="text"
              id="autocomplete"
              placeholder="Enter your zip ..."
              name="zip"
              value={formData.zip}
              onChange={handleChange}
              className="border-gray-400 border-2 rounded-2xl h-10 w-40 pl-4 text-sm ml-2 xl:ml-0 2xl:ml-0"
            />

            <select
              value={formData.searchType}
              onChange={handleChange}
              name="searchType"
              className="ml-2 border-gray-400 border-2 rounded-2xl h-10 w-40 pl-4 text-sm text-gray-400"
            >
              <option value="Buy">For Buy</option>
              <option value="Rent">For Rent</option>
              <option value="Agents">For Agents</option>
            </select>

            <select
              value={formData.priceLower}
              onChange={handleChange}
              name="priceLower"
              className="ml-2 border-gray-400 border-2 rounded-2xl h-10 w-40 pl-4 text-sm text-gray-400"
            >
              <option value="NA">Min. Price</option>
              <option value="0">$0</option>
              <option value="100000">$100,000</option>
              <option value="200000">$200,000</option>
              <option value="300000">$300,000</option>
              <option value="500000">$500,000</option>
              <option value="1000000">$1,000,000</option>
              <option value="5000000">$5,000,000</option>
            </select>

            <select
              value={formData.priceUpper}
              onChange={handleChange}
              name="priceUpper"
              className="ml-2 border-gray-400 border-2 rounded-2xl h-10 w-40 pl-4 text-sm text-gray-400"
            >
              <option value="NA">Max. Price</option>
              <option value="100000">$100,000</option>
              <option value="200000">$200,000</option>
              <option value="300000">$300,000</option>
              <option value="500000">$500,000</option>
              <option value="1000000">$1,000,000</option>
              <option value="5000000">$5,000,000</option>
              <option value="10000000">$10,000,000</option>
            </select>

            <input
              type="text"
              placeholder="Beds"
              value={formData.beds}
              onChange={handleChange}
              name="beds"
              className="ml-2 border-gray-400 border-2 rounded-2xl h-10 w-40 pl-4 text-sm text-gray-400"
            />
            <input
              type="text"
              placeholder="Baths"
              value={formData.baths}
              onChange={handleChange}
              name="baths"
              className="ml-2 border-gray-400 border-2 rounded-2xl h-10 w-40 pl-4 text-sm text-gray-400"
            />

            <select
              value={formData.homeType}
              onChange={handleChange}
              name="homeType"
              className="ml-2 border-gray-400 border-2 rounded-2xl h-10 w-40  pl-4 text-sm text-gray-400"
            >
              <option value="Houses">Houses</option>
              <option value="Townhomes">Townhomes</option>
              <option value="Multi-family">Multi-family</option>
              <option value="Condos/Co-ops">Condos/Co-ops</option>
              <option value="Lots/Land">Lots/Land</option>
              <option value="Apartments">Apartments</option>
              <option value="Manufactured">Manufactured</option>
            </select>

            <button
              type="submit"
              className="ml-2 bg-black text-white px-3 py-2 rounded-xl h-10 w-40 font-bold text-md"
            >
              Search
            </button>
          </form>
        </div>
        {
          currentItems && Object.keys(currentItems).length > 0 ? (
            <div><section className="py-12 md:py-16">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col md:flex-row items-center justify-between mb-8">
                <div className="space-y-1">
                  <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Search Results</h2>
                  <p className="text-gray-500 dark:text-gray-400">
            Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, totalResults)} of {totalResults} results
          </p>
                </div>
                <div className="flex items-center gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="sm">
                        <FilterIcon className="w-4 h-4 mr-2" />
                        Filter
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-4">
                      <div className="grid gap-4">
                        <div>
                          <Label htmlFor="beds" className="font-semibold">
                            Beds
                          </Label>
                          <Select
                            value={filterOptions.beds}
                            onValueChange={(value) => handleFilterChange("beds", value)}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Any" />
                            </SelectTrigger>
                            <SelectContent>
                            <SelectItem value='any'>Any</SelectItem>
                              <SelectItem value='1'>1</SelectItem>
                              <SelectItem value='2'>2</SelectItem>
                              <SelectItem value='3'>3</SelectItem>
                              <SelectItem value='4'>4</SelectItem>
                              <SelectItem value='5'>5+</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="baths" className="font-semibold">
                            Baths
                          </Label>
                          <Select
                            value={filterOptions.baths}
                            onValueChange={(value) => handleFilterChange("baths", value)}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Any" />
                            </SelectTrigger>
                            <SelectContent>
                            <SelectItem value='any'>Any</SelectItem>
                              <SelectItem value='1'>1</SelectItem>
                              <SelectItem value='2'>2</SelectItem>
                              <SelectItem value='3'>3</SelectItem>
                              <SelectItem value='4'>4+</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="sm">
                        <ListOrderedIcon className="w-4 h-4 mr-2" />
                        Sort
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-4">
                      <div className="grid gap-2">
                        <RadioGroup value={sortOption} onValueChange={handleSortChange}>
                          <div className="flex items-center space-x-2">                          
                            <RadioGroupItem value="price-asc" />
                            <h1 className="flex items-center gap-2 text-black">
                              Price: Low to High
                            </h1>
                            </div>
                          <div className="flex items-center space-x-2">
                          <RadioGroupItem value="price-desc" />
                            <h1 className="flex items-center gap-2 text-black">
                              Price: High to Low
                            </h1>
                          </div>
                        </RadioGroup>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {
                  Object.keys(currentItems).map((key) => {
                    const property = currentItems[key]
                    return (
                      <ListingCard
                        key={key}
                        propertyId={key}
                        address={property.address + ", " + property.city}
                        price={property.price}
                        bedrooms={property.beds}
                        bathrooms={property.baths}
                        transactionType={property.transactionType}
                        date={property.date}
                        stars={5}
                        review="Excellent"
                        image={property.imageUrl[0]}
                      />
                    )
                  })
                }
              </div>
              <div className="flex justify-center mt-8">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          handlePageChange(currentPage - 1)
                        }}
                      />
                    </PaginationItem>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <PaginationItem key={page}>
                        <PaginationLink
                          href="#"
                          onClick={(e) => {
                            e.preventDefault()
                            handlePageChange(page)
                          }}
                          isActive={page === currentPage}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          handlePageChange(currentPage + 1)
                        }}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </div>
          </section>
          
          <section className="flex flex-col items-center space-y-8 py-8 bg-gray-200 rounded-2xl my-6">
      <h1 className="text-5xl tracking-tight font-bold text-black drop-shadow-md">Scail Map&nbsp;🗺️</h1>
      <div className="bg-white p-3 xl:p-6 2xl:p-6 rounded-3xl">
      <div className="w-[350px] h-[600px] shadow-lg xl:w-[1000px] xl:h-[550px] 2xl:w-[1000px] 2xl:h-[550px]" ref={googlemap as React.RefObject<HTMLDivElement>}>
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
      </div>
      <Footer />{" "}
    </div>
  );
}




function BathIcon(props:any) {
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
      <path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5" />
      <line x1="10" x2="8" y1="5" y2="7" />
      <line x1="2" x2="22" y1="12" y2="12" />
      <line x1="7" x2="7" y1="19" y2="21" />
      <line x1="17" x2="17" y1="19" y2="21" />
    </svg>
  )
}


function BedIcon(props:any) {
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
      <path d="M2 4v16" />
      <path d="M2 8h18a2 2 0 0 1 2 2v10" />
      <path d="M2 17h20" />
      <path d="M6 8v9" />
    </svg>
  )
}


function FilterIcon(props:any) {
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
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  )
}


function ListOrderedIcon(props:any) {
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
      <line x1="10" x2="21" y1="6" y2="6" />
      <line x1="10" x2="21" y1="12" y2="12" />
      <line x1="10" x2="21" y1="18" y2="18" />
      <path d="M4 6h1v4" />
      <path d="M4 10h2" />
      <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
    </svg>
  )
}
