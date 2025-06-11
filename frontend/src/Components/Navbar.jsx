import React from 'react'
import { Plus } from 'lucide-react';
import { NotebookPen } from 'lucide-react';
import { Link } from 'react-router';

const Navbar = () => {
  return (
    <div className="navbar bg-base-300  px-4 border-b border-base-content/10">
    <div className="flex-1">
      <a className="btn btn-ghost text-xl">My Notes <NotebookPen className='text-primary' /></a>
    </div>
    <div className="flex-none">
      <Link to={'/create'} className="btn  btn-primary">
      <Plus />
       Create Note
      </Link>
    </div>
  </div>
  )
}

export default Navbar
