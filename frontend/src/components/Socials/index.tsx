import React from 'react'
import { useAppSelector } from '../../store'
import { selectDarkMode } from '../../store/globals/globalsSlice'
import FBEmbed from '../FacebookEmbed'
import TwitterPlugin from '../TwitterEmbed'
import InstagramFeed from '../InstagramEmbed'
import YoutubeEmbed from '../YoutubeEmbed'
const Socials = () => {
  const darkMode = useAppSelector(selectDarkMode)
  return (
    <div className={`${darkMode?'dark':""}`}>

    <div className="socials bg-[#f5f5f5] dark:bg-dark-primary transition-all duration-500 ease-in-out" >
        <div className="socials__heading text-[1.5rem] md:text-[1.8rem] lg:text-[2rem] my-10 mx-[4rem] dark:text-[#ffee00c7]"> OUR SOCIALS</div>
        <div className="socials__body">
        <div className="socials__embed">

        <FBEmbed/>
        </div>
        <div className="socials__embed">

        <TwitterPlugin/>
        </div>
        <div className="socials__embed">

        {/* <FBEmbed/> */}
        <YoutubeEmbed/>
        </div>
        {/* <FBEmbed/>
        <FBEmbed/> */}
        </div>
    </div>
    </div>
  )
}

export default Socials