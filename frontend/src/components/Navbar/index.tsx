import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";

import logo from "../../assets/logo.png";
import {
  selectDarkMode,
  toggleDarkMode,
} from "../../store/globals/globalsSlice";
import { useAppSelector, useAppDispatch } from "../../store/index";
import { toggleScrollbar } from "../../store/members/membersSlice";
import BarIcon from "../shared/AnimatedBarIcon";
import { Button } from "../shared/Button";
import DarkModeButton from "../shared/DarkModeButton";
type I = object | void;
import { Link as SLink, animateScroll as scroll } from "react-scroll";
const Navbar = () => {
  const darkMode = useAppSelector(selectDarkMode);
  const [hamIcon, setHamIcon] = useState(false);
  const toggleHam = () => {
    setHamIcon(!hamIcon);

    toggleScrollbar();
    // console.log("ham Icon toggled");
  };
  const dispatch = useAppDispatch();

  const handleToggleDarkMode = () => {
    // // console.log("Toggle called")
    dispatch(toggleDarkMode());
    window.localStorage.setItem("darkMode", JSON.stringify(!darkMode));
  };
  const styles = {
    navlink: `${
      !hamIcon ? "bar-icon-close-navlink" : "bar-icon-open-navlink"
    } nav-link`,
  };

  // document.getElementsByClassName('page-nav-link').onClick =
  //

  const onClickHandler = (event: any) => {
    const values = document.getElementsByClassName("page-nav-link");
    // values.forEach((element)=>{
    // this wont work as values is a collection and not an array

    // })
    // console.log( typeof values)
    // console.log(values)
     Array.from(values).forEach((element) => {
        console.log(element)
        // if (element.classList.contains("nav-link-active")) {
          element.classList.remove("nav-link-active");
        // }
      });
  
    event.target.classList.add("nav-link-active");
  };
  return (
    <>
      <div className={`${darkMode ? "dark" : ""}`}>
        {/*  */}
        <header className="header bg-[#F1FFF8] dark:bg-[#002D13]">
          <div className="logo-name">
            <img src={logo} style = {{height: "50px",  width: "50px"}} alt="ganasuraksha party logo" className=" ml-10 pr-0" />
            <div className="party-name dark:text-white">
              Gana Suraksha Party
            </div>
          </div>
          <div className="hidden md:flex">
            <nav className=" page-nav">
              <div
                onClick={(e) => onClickHandler(e)}
                
              >
                <Link className="page-nav-link nav-link-active" to="/">home</Link>
              </div>
              <div  onClick={(e) => onClickHandler(e)}>
                <Link className="page-nav-link" to="gallery">gallery</Link>
              </div>

              <div onClick={(e) => onClickHandler(e)}>
                <Link className="page-nav-link" to="members">members</Link>
              </div>
              <div  onClick={(e) => onClickHandler(e)}>
                <Link className="page-nav-link" to="about">about us</Link>
              </div>
              <div onClick={(e) => onClickHandler(e)}>
                <Link  className="page-nav-link" to="contact">contact us</Link>
              </div>
            </nav>
          </div>

          {/*
       //////////////////
       MOBILE NAVBAR
       ////////////////////
        */}

          {/* <div className={` w-screen`}> */}
          {/* <div className="md:hidden"> */}
          {/* ${hamIcon?"hidden":"flex flex-col justify-center"} */}

          <nav
            className={`
      ${!hamIcon ? "bar-icon-close-navlinks" : " bar-icon-open-navlinks "} 
      page-nav-mobile
      flex flex-col items-center justify-evenly overflow-hidden`}
          >
            <div onClick={toggleHam} className={styles.navlink}>
              <Link to="/">home</Link>
            </div>
            <div onClick={toggleHam} className={styles.navlink}>
              <Link to="gallery">gallery</Link>
            </div>

            <div onClick={toggleHam} className={styles.navlink}>
              <Link to="members">members</Link>
            </div>
            <div onClick={toggleHam} className={styles.navlink}>
              <Link to="about">about us</Link>
            </div>
            <div onClick={toggleHam} className={styles.navlink}>
              <Link to="contact">contact us</Link>
            </div>
          </nav>
          {/* </div> */}

          <div className="btn-group">
            {/* <Button className="btn login">
              <Link to="login">Log In</Link>
            </Button> */}
            <Button className="btn register hidden md:flex">
              <Link to="register">Register</Link>
            </Button>
          </div>
          <div className="flex items-center">
            <DarkModeButton toggler={handleToggleDarkMode} />
          </div>
          <div className="bar-icon md:hidden">
            <BarIcon
              onClick={() => toggleHam()}
              className={`${hamIcon ? "open" : ""}`}
            />
          </div>
          {/* <ToggleSlider
      onToggle = {handleToggleDarkMode}
    //   barStyles={
    //     {
    //         backgroundColor:"red"
    //     }
    //   }
    barBackgroundColor = "#b0b0b0"
    barBackgroundColorActive='#141414'
      /> */}
        </header>
      </div>
      <Outlet />
    </>
  );
};

export default Navbar;
