import React from 'react'
import { RefreshCwOff } from 'lucide-react';

const Ratelimiter = () => {
  return (
    <div className="hero bg-base-200 min-h-screen">
    <div className="hero-content text-center">
      <div className="max-w-md">
        <h1 className="text-4xl font-bold">Rate Limit Reached</h1>
        <p className="py-6">
          You have made too many request in a short period. please try back later
        </p>
        <RefreshCwOff className='text-warning m-auto' size={95} />
      </div>
    </div>
  </div>
  )
}

export default Ratelimiter
