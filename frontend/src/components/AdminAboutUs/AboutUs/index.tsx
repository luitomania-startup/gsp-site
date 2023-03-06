import React, { useEffect } from "react";
import parse from "html-react-parser";
import { useAppDispatch, useAppSelector } from "../../../store";
import { selectDarkMode } from "../../../store/globals/globalsSlice";
import { CircleLoader, HashLoader } from "react-spinners";
import {
  fetchAboutUsThunk,
  loading,
  selectAboutUs,
} from "../../../store/aboutUs/aboutUsSlice";

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
        <div className=" mx-auto h-full w-full flex-col items-center justify-center  px-10 dark:bg-dark-primary">
          {["pending", "idle"].includes(loadingAboutUs) ? (
            <div className="flex h-screen w-screen 
            items-center justify-center">
              <HashLoader color="#fdf100"/>
            </div>
          ) : (
            <div className="grid py-10 h-screen">
              <div className="w-[90%] justify-self-center">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <img src={data.aboutUsImageUrl} alt="about us" />
                  </div>
                  <div
                    className="whitespace-pre-line text-xl dark:text-white"
                    style={{ fontFamily: "Open Sans" }}
                  >
                    {parse(data.description)}
                  </div>
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
