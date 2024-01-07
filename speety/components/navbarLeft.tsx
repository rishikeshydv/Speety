import React from 'react'

function NavbarLeft() {
  return (

    <div className='flex items-center justify-between h-1/2'>
      <div className='flex'>
        <ul className='flex'>
          <li className='mx-10'><a href="#">Buy</a></li>
          <li className='mx-10'><a href="#">Rent</a></li>
          <li className='mx-10'><a href="#">Sell</a></li>
          <li className='mx-10'><a href="#">Agent Finder</a></li>
        </ul>
      </div>
      <div>
        <a href="/"><h1 className='text-6xl font-bold font-mono'>Speety</h1></a>
      </div>

      <div>
        <ul className='flex'>
          <li className='mx-6'><a href="#">Help</a></li>
          <li className='mx-6'><a href="/auth/login">Sign In</a></li>
        </ul>
      </div>
    </div>
  )
}

export default NavbarLeft