import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { toast } from 'react-toastify'
import api from '../lib/axios.js'
import { Trash2, MoveLeft  } from 'lucide-react';


const NoteDetailsPage = () => {
  const [note, setNote] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

   const navigate = useNavigate()
   const {id} = useParams()

   useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get(`notes/${id}`);
        console.log("Success:", res.data);
        setNote(res.data);

      } catch (error) {
        // Enhanced error logging
        toast.error('failed to fetch the note')
       console.log("error fetching notes", error);
      }finally{
        setLoading(false)
      }
    };
  
    fetchNotes();
   }, [id])



   const handleDelete = async (e, id) => {
    e.preventDefault();
   if(!window.confirm("Are you sure you want to delete")) return;
  
   try {
      await api.delete(`/notes/${id}`)
      toast.success("Note deleted successfully")
      navigate('/')
      setNote((prev) => prev.filter((note) =>  note._id !== id)) //get rid of the not deleyed from the array
   } catch (error) {
     console.log("Error deleting notes", error);
     toast.error(error)
   }
    
  }

  const handleEdit = async () => {
     if(!note.title.trim() || !note.content.trim()){
        toast.error('Please fill in all fields')
        return
       }

       setSaving(true)

       try {
        await api.put(`/notes/${id}`, note)
        toast.success("Note Updated Successfully")
        navigate('/')
       } catch (error) {
        console.log("Error Updating Note", error);
        toast.error(error)
       }finally{
        setSaving(false)
       }
  }
   
if(loading){
  return (
    <div className='min-h-screen flex items-center justify-center'>
    <span className="loading loading-dots loading-lg "></span>
    </div>
  )

}

  return (
    <div className='p-6'>

    <Link to={'/'} className='btn btn-primary'>
    <MoveLeft size={10}/>
    Back
    </Link>

    <div className="hero  mt-10">

    <div className=" ">
    <Trash2 onClick={(e)=> handleDelete(e, note._id)} size={29} className='text-white bg-red-600 rounded cursor-pointer p-2 flex items-center justify-center'/>
    <h3 className='mb-4 text-center'>Add Note</h3>
      <div className="max-w-md">
        <input type="text" value={note.title} onChange={(e) =>  setNote({...note, title: e.target.value})}  placeholder="Title" name="title" className="input mb-2 input-bordered w-full" />
        <textarea value={note.content} onChange={(e) =>  setNote({...note, content: e.target.value})}  className="textarea textarea-bordered w-full mb-6" name="content" placeholder="content"></textarea>
        <button onClick={handleEdit}   className="btn btn-block btn-primary" disabled={saving}>
          {saving ?  <p>Updating <span className="loading loading-dots loading-lg "></span></p> : "Update Note"}
        </button>
      </div>
    </div>
  </div>
  </div>
  )
}

export default NoteDetailsPage
