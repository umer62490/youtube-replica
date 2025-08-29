import React, { useState } from 'react'
import Header from '../components/Header'
import '../assets/css/style.css'
import Sidebar from '../components/Sidebar'
import MainScreen from '../components/MainScreen'

const HomePage = () => {
  const [videos, setVideos] = useState([]); // search results store

  return (
    <div>
      <Header setVideos={setVideos} />  
      <div className='flex'>
        <Sidebar />
        <MainScreen videos={videos}/> 
      </div>
    </div>
  )
}

export default HomePage
