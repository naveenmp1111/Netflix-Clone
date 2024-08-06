import React, { useEffect, useState } from 'react'
import './RowPost.css'
import axios from '../../axios'
import { imageUrl } from '../../constants/constants'
import YouTube from 'react-youtube';
import { API_KEY } from '../../constants/constants';

function RowPost(props) {
  const [movies,setMovies]=useState([])
  const [urlId,setUrl]=useState()

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const movieTrailer=(id)=>{
    axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`)
    .then(response=>{
      console.log(response.data)
      if(response.data.results.length!=0){
        setUrl(response.data.results[0])
      }else{
        console.log('Array Empty(No videos found)')
      }
    })
    
  }

  useEffect(() => {
    axios.get(props.url)
    .then(response=>{
      console.log(response.data)
      setMovies(response.data.results)
    })
  }, [])
  
  return (
    <div>
        <div className='row'>
            <h2>{props.title}</h2>
            <div className= "posters">
                {movies.map((movie,index)=>
                  
                    <img key={index} className={props.isSmall ? 'smallPoster' : "poster"} src={`${imageUrl+movie.backdrop_path}`} alt="posters" onClick={()=>movieTrailer(movie.id)}/>
                  
                )}
                
            </div>
        </div>
         {urlId && <YouTube videoId={urlId.key} opts={opts}/>}
    </div>
  )
}

export default RowPost