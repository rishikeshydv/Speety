import React from 'react'
interface Property{
  price:number;
  beds:string;
  baths:string;
  houseType:string;
  transactionType:string;
  address: string;
  apartment:string;
  city:string;
  state:string;
  zip:string;
  listedBy: string;
  imageUrl:string;
  videoUrl:string
}
import Image from 'next/image';

const PropertyProp:React.FC<Property> = ({price,beds,baths,houseType, transactionType, address, apartment,city,state,zip,listedBy,imageUrl,videoUrl}) => {

  return (
    <div className='border-2 shadow-md rounded-2xl h-80 w-96 bg-gray-600'>
        <Image src={videoUrl} alt="houseVideo" className='rounded-2xl'/>
        <p className='text-2xl font-bold mt-2'>{price}</p>
        <p className='text-xl'>{beds} bds | {baths} ba | {houseType}</p>
        <p className='text-xl'>{address},{city},{state},{zip}</p>
        <p>{listedBy}</p>
    </div>
  )
}

export default PropertyProp;