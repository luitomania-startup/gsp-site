import React from 'react'
import Contact from '../components/Contact'
import { useAppSelector } from '../store'
import { selectDarkMode } from '../store/globals/globalsSlice'
const ContactUsRoute = () => {

  const darkMode = useAppSelector(selectDarkMode);

  return (
    <div className={`${darkMode?"dark":""}`}>

    <div className="w-full h-screen dark:bg-dark-primary flex items-center justify-center">
      <Contact/>

    </div>

    </div>



  )
}

export default ContactUsRoute