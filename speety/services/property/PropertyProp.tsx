import React from 'react'

interface Property{
    videoUrl:string;    //we wont be using image like zillow, we will use GIF/Video
    price:string;
    beds:string;
    baths:string;
    houseType:string;
    address: string;
    listedBy: string
}
const PropertyProp:React.FC<Property> = ({videoUrl,price,beds,baths,houseType,address,listedBy}) => {

  return (
    <div className='border-2 shadow-md rounded-2xl h-80 w-96 bg-gray-600'>
        <img src={videoUrl} alt="houseVideo" className='rounded-2xl'/>
        <p className='text-2xl font-bold mt-2'>{price}</p>
        <p className='text-xl'>{beds} bds | {baths} ba | {houseType}</p>
        <p className='text-xl'>{address}</p>
        <p>{listedBy}</p>
    </div>
  )
}

export default PropertyProp;