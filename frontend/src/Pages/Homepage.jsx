import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Navbar from '../Components/Navbar'
import Ratelimiter from '../Components/Ratelimiter'
import NoteCard from '../Components/NoteCard'
import api from '../lib/axios.js'
import { Link } from 'react-router'
import { Plus } from 'lucide-react';


const Homepage = () => {

  const [isRateLimiter, setisRateLimiter] = useState(false)
  const [notes, setNote] = useState([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        console.log("Success:", res.data);
        setNote(res.data);
        setisRateLimiter(false)
      } catch (error) {
        // Enhanced error logging
       console.log("error fetching notes", error);
       if(error.response.status === 429){
        setisRateLimiter(true)
       }else{
        toast.error('failed to load data')
       }
       
      }finally{
        setLoading(false)
      }
    };
  
    fetchNotes();
  }, []);


  return (
    <div className='mim-h-screen'>
       <Navbar />
       {isRateLimiter && <Ratelimiter /> }

        <div className='max-w-7xl mx-auto p-4 mt-6 '>
        {loading && <div className="loading loading-dots loading-lg "></div>}

        { notes.length <= 0 && !isRateLimiter ? 
        <div className='text-center'>
        <p className='text-xs mb-4'>Notes not found! click on the Create Note button to get Started</p>
        <Link to={'/create'} className="btn  btn-outline">
      <Plus />
       Create Note
      </Link>
        </div>

         :
         notes.length > 0 && !isRateLimiter && (
        <div className='grid grid-cols-1 nd:grid-cols-2 lg:grid-cols-3 gap-6'>
         {notes.map((note) => {
          return <NoteCard key={note.id} note={note} setNote={setNote} />
         })}
        

        </div>
        
        )
      
        }
      
        </div>
     
    </div>
  )
}

export default Homepage
