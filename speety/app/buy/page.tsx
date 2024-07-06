"use client";
import React, { useEffect, useState, useMemo, useRef } from "react";
import { buyQ } from "@/queries/Transactions/buyQ";
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
    listerEmail: string;
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

export default function Buy() {
  const [user] = useAuthState(auth);
  const router = useRouter();
  // if (!user) {
  //   router.push("/auth/login");
  // }
  
  const [formData, setFormData] = useState({
    zip: "",
    searchType: "Buy",
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
      if (formData.zip === "" || formData.priceLower === "" || formData.priceUpper === "" || formData.searchType === "" || formData.beds === "" || formData.baths === "" || formData.homeType === ""){
          return;
      }
      buyQ(
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
        cache.set(key, resultList[key]);
        console.log(cache)
      }
    });
    setSearchResults(_refinedList);
  }, [resultList]);

  console.log(searchResults)


  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

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
      script.src = `https://maps.googleapis.com/maps/api/js?v=3.57&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}&libraries=places`;
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

<div className="flex items-center justify-center gap-6 md:gap-20">

<div className="flex flex-col md:flex-row items-center justify-between gap-8 xl:gap-20 px-4 py-12 xl:px-6 xl:py-16 lg:px-8 lg:py-20">
<div className="flex-1 space-y-4 max-w-md md:max-w-xl">
  <div className="text-2xl font-bold sm:text-4xl md:text-6xl xl:text-5xl text-gray-400">Buying your house with <h1 className="text-[#397367] text-2xl font-bold sm:text-4xl md:text-6xl xl:text-5xl">confidence</h1></div>

<p className="text-muted-foreground text-xs md:text-lg tracking-tight">
  Buying a property is a big decision. We are here to help you make the right choice.
  Our website provides you with the best options for buying your home. We have a wide range of properties.
  We help you find the best property that suits your needs. We provide you with the best experience in buying your home.
</p>
</div>
<video className="flex-1 md:w-[600px] h-full overflow-hidden [background:linear-gradient(45deg,#172033,theme(colors.slate.800)_50%,#172033)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.slate.300/.48)_80%,_theme(colors.green.500)_86%,_theme(colors.green.300)_90%,_theme(colors.green.500)_94%,_theme(colors.green.600/.48))_border-box] rounded-2xl border-4 border-transparent animate-border" autoPlay muted playsInline>
          <source 
                    src="https://firebasestorage.googleapis.com/v0/b/speety-2175.appspot.com/o/frontend-vids%2F1.mp4?alt=media&token=544c6031-7927-4982-ba30-57a4f39f095d"
          />
        </video>
</div>

</div>



        </div>
        <div className="flex items-center justify-center p-4 bg-[#87a3a3]">
          {/* This div tag is for search bar  */}
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
              className="ml-2 bg-black text-white px-3 py-2 rounded-xl h-10 w-40 font-bold text-md mt-1 xl:mt-0 2xl:mt-0"
            >
              Search
            </button>
          </form>
        </div>
        {
          currentItems && Object.keys(currentItems).length > 0 ? (
            <div>
<section className="py-12 md:py-16">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col md:flex-row items-center justify-between xl:mb-8 2xl:mb-8">
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
<section className="flex flex-col items-center space-y-8 py-8 bg-gray-200 rounded-2xl">
      <div className="flex gap-6 xl:gap-20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 px-4 py-12 md:px-6 md:py-16 lg:px-8 lg:py-20">
      <div className="flex-1 space-y-4 max-w-xl">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-[#397367]">Locate Your Property</h1>
        <p className="text-muted-foreground md:text-lg">
        We have made it easier for you to locate each property on the website.
  Each search result is marked on the map below. To have a closer look into
  the location of the property, you can click on the property to view the virtual tour
  of the property. We provide you with the best experience in buying your home.
        </p>
      </div>
      <img
        src="/svgs/14.png"
        width={600}
        height={400}
        alt="Unleash Your Creativity"
        className="flex-1 md:max-w-[500px] object-cover"
      />
    </div>
      </div>
      <div className="bg-white p-3 xl:p-6 2xl:p-6 rounded-3xl">
      <div className="w-[350px] h-[600px] shadow-lg md:w-[700px] md:h-[550px] xl:w-[1000px] xl:h-[550px] 2xl:w-[1000px] 2xl:h-[550px]" ref={googlemap as React.RefObject<HTMLDivElement>}>
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
