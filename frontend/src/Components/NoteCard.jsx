import React from 'react'
import { Link, useNavigate } from 'react-router'
import { SquarePen } from 'lucide-react';
import { Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';
import api from '../lib/axios';
import { useState } from 'react';
const NoteCard = ({note, setNote}) => {
   const navigate = useNavigate()

    const handleDelete = async (e, id) => {
      e.preventDefault();
     if(!window.confirm("Are you sure you want to delete")) return;
    
     try {
        await api.delete(`/notes/${id}`)
        toast.success("Note deleted successfully")
        setNote((prev) => prev.filter((note) =>  note._id !== id)) //get rid of the not deleyed from the array
     } catch (error) {
       console.log("Error deleting notes", error);
       toast.error(error)
     }
      
    }




  return (
    <>
    <Link to={`/note/${note._id}`} className="card bg-base-100 w-96 shadow-xl border-t-4 border-solid bg-base-100  border-[#00ff9d]" key={note.id}>
  <div className="card-body">
    <h3 className="card-title">{note.title}</h3>
    <p className='line-clamp-3'>{note.content}</p>
    <div className="card-actions justify-between flex item-center">
    <span className='text-xs'>
     CreatedAt: {new Date(note.createdAt).toLocaleString()}
</span>
    <span className='text-xs'>
     UpdatedAt: {new Date(note.updatedAt).toLocaleString()}
</span>
  <div className='flex items-center gap-3'>
  <Link to={`note/${note._id}`}><SquarePen size={15}  className=''/></Link>
  <Trash2 onClick={(e)=> handleDelete(e, note._id)} size={15} className='text-red-600'/>
  </div>
    </div>
  </div>
</Link>
{/* You can open the modal using document.getElementById('ID').showModal() method */}
{/* <button className="btn" onClick={()=>document.getElementById('my_modal_3').showModal()}>open modal</button> */}

{/* {showModal &&  
    <dialog id="my_modal_3" className="modal">
  <div className="modal-box"> 
  <h3 className='text-center'>Update Note</h3>
    <form method="dialog">
    <input type="text" value={note.title}  placeholder="Title" name="title" className="input mb-2 input-bordered w-full" />
      <textarea value={note.content}  className="textarea textarea-bordered w-full mb-6" name="content" placeholder="content"></textarea>
      <button className="btn btn-block btn-primary">
        {loading ?  <p>Creating <span className="loading loading-dots loading-lg "></span></p> : "Update Note"}
      </button>
    </form>
  
  </div>
</dialog>
} */}

</>
  )
}

export default NoteCard
