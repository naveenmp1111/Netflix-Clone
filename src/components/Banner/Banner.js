import React, { useEffect,useState } from 'react'
import './Banner.css'
import { API_KEY,imageUrl } from '../../constants/constants'
import axios from '../../axios'

const Banner = () => {
  const [movie,setMovie]=useState()
  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}&language=en-US`)
    .then(response=>{console.log(response.data)
      setMovie(response.data.results[1])
    })
  }, [])
  
  return (
    <div style={{backgroundImage:`url(${movie ? imageUrl+movie.backdrop_path : ''})` }} className='banner'>
        <div className='content'>
            <h1 className='title'>{movie ? movie.title : ''}</h1>
            <div className='banner_buttons'>
                <button className='button'>Play</button>
                <button className='button'>My List</button>
            </div>
            <h1 className='description'>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface</h1>
        </div>
        <div className="fade_bottom"></div>
    </div>
  )
}

export default Banner