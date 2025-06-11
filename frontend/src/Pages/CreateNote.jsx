import React, { useEffect, useState } from 'react'
import {  MoveLeft } from 'lucide-react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router';
import api from '../lib/axios';
const CreateNote = () => {

  const [data, setData] = useState({
    title: "",
    content: "",

  })
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
    console.log(data);
    
  }


  const handleSubmit = async(e) => {
   e.preventDefault();
   if(!data.title.trim() || !data.content.trim()){
    toast.error('Please fill in all fields')
    return
   }

   setLoading(true)

   try {
    await api.post("/notes", {
      title: data.title,
      content: data.content
    })
    toast.success("Note created successfully")
    navigate('/')
   } catch (error) {
    console.log("Error Creating Notes", error)
    if(error.response.status === 429){
      toast.error('Slow down a bit')
    }else{
      toast.error('Error Creating Notes', error)
    }
    
   }finally{
    setLoading(false)
   }
  }




  return (
    
    <div className="p-6">
    <Link to={'/'} className='btn btn-primary'>
    <MoveLeft size={10}/>
    Back
    </Link>
    
    <div className="hero  mt-10">
  <div className="text-center ">
  <h3 className='mb-4'>Add Note</h3>
    <div className="max-w-md">
      <input type="text" value={data.title} onChange={handleChange} placeholder="Title" name="title" className="input mb-2 input-bordered w-full" />
      <textarea value={data.content} onChange={handleChange} className="textarea textarea-bordered w-full mb-6" name="content" placeholder="content"></textarea>
      <button onClick={handleSubmit} className="btn btn-block btn-primary">
        {loading ?  <p>Creating <span className="loading loading-dots loading-lg "></span></p> : "Create Note"}
      </button>
    </div>
  </div>
</div>
</div>
  )
}

export default CreateNote
