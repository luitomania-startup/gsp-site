import React, { useEffect } from "react";
import parse from "html-react-parser";
import { useAppDispatch, useAppSelector } from "../../store";
import { selectDarkMode } from "../../store/globals/globalsSlice";
import { CircleLoader, HashLoader } from "react-spinners";
import tempCover from '../../assets/Cover.jpg'
import {
  fetchAboutUsThunk,
  loading,
  selectAboutUs,
} from "../../store/aboutUs/aboutUsSlice";

const AboutUs = () => {
  const darkMode = useAppSelector(selectDarkMode);
  const loadingAboutUs = useAppSelector(loading);
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectAboutUs);

  useEffect(() => {
    setTimeout(() => {
      dispatch(fetchAboutUsThunk())
        .then(() => {
          console.log("Successfully fetched about us");
        })
        .catch((err) => {
          console.log(err.message);
        });
    }, 1000);
  }, []);
  return (
    <>
      <div className={`${darkMode ? "dark" : ""}`}>
        <div className=" mx-auto h-screen w-full flex-col items-center justify-center  px-10 dark:bg-dark-primary">
          {["pending", "idle"].includes(loadingAboutUs) ? (
            <div className="flex h-screen w-screen 
            items-center justify-center">
              <HashLoader color="#fdf100"/>
            </div>
          ) : (
              <div className="flex  justify-center">

              <div className="w-[90%] h-full flex flex-col justify-center">
                
                  {/* <div className="bg-cover-mobile md:bg-cover-desktop h-[500px] w-full bg-contain bg-no-repeat md:bg-cover"> */}
                    {/* <img src={data.aboutUsImageUrl} alt="about us" /> */}
                    <img
        src={data.aboutUsImageUrl}
        className={`  mt-10 w-full h-[600px]  object-cover transition-all ease-linear duration-150`}
        alt={tempCover}
      />

                  {/* </div> */}
                  <div
                    className=" mt-10 whitespace-pre-line text-xl dark:text-white text-center"
                    style={{ fontFamily: "Open Sans" }}
                  >
                    {parse(data.description)}
                  </div>
                
              </div>
              </div>
            
          )}
        </div>
      </div>
    </>
  );
};

export default AboutUs;
