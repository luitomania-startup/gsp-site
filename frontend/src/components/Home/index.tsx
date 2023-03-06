import React,{useState} from 'react'

import ContactForm from '../Contact'
import Footer from '../Footer'
import GalleryHome from '../GalleryHome'
import Feed from '../NewsFeed'
import Posts from '../Posts'
import Socials from '../Socials'
import ButtonToTop from '../shared/ButtonTop'


import Rocket from '../../assets/rocket.svg'


const Home = () => {
 const [show , setShow] = useState(false);
  const options  = {
    top: 0, 
    left : 0 , 
    smooth: "smooth"
    
  }
  const onClickHandler = ()=>{
    window.scrollTo(options);
  }

  const ShowbuttonTop = ()=>{
    if(window.scrollY > 500){
        setShow(true);
    }
    else setShow(false);
  }
  
  window.addEventListener('scroll',ShowbuttonTop);

  return (
    <div className="h-full"> 
    <Feed/>
    <Posts/>
    <GalleryHome/>
    <Socials/>
    <ContactForm/>
    <Footer/>
    <div className={` rocket ${show?"fade-in-image":'fade-out-image'} `}>
    <ButtonToTop onclick={onClickHandler} text="Back To Top" children = {<img src ={Rocket} alt="ToTop"/>}/>
    </div>
   </div>
  )
}

export default Home