import React, { useState } from 'react'
import { BackButton } from '../components/BackButton'
import { Spinner } from '../components/Spinner'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'

export const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
  
  const handleDeleteBook = () => {
    setLoading(true);
    axios
    .delete(`${BACKEND_URL}/books/${id}`)
    .then(()=>{
      setLoading(false);
      enqueueSnackbar('Book Deleted Succesfully', {variant: 'success'})
      navigate('/');
    })
    .catch((error) => {
      setLoading(false);
      //alert(`An error happened. Please check console.`);
      enqueueSnackbar('Error', {variant: 'error'})
      console.log(error);
    });
  }

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>DeleteBook</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
        <h3 className='text-2xl'>
          Are You Sure You Want to delete this Book?
        </h3>
        <button className='p-4 bg-red-600 text-white w-full' onClick={handleDeleteBook}>
          Yes, Delete it
        </button>
      </div>
    </div>
  )
}
