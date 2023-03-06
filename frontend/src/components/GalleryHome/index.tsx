import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import ReactPaginate from "react-paginate";

import "./PaginationBar.css";
import CloseIcon from "../../assets/icons8-close-window-100.png";
import { useAppDispatch, useAppSelector } from "../../store";
import { selectDarkMode } from "../../store/globals/globalsSlice";
import {
  fetchImagesThunk,
  loading,
  selectCount,
  selectImages,
} from "../../store/gallery/gallerySlice";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
// @ts-ignore
const RMCarousel = Carousel.default ? Carousel.default : Carousel;
// import 'react-multi-carousel/lib/styles.css';
import HTMLReactParser from "html-react-parser";
const GalleryHome = () => {
  const dispatch = useAppDispatch();
  const galleryImages = useAppSelector(selectImages);
  const loadingImages = useAppSelector(loading);
  useEffect(() => {
    dispatch(fetchImagesThunk({ page: 1, limit: Number.MAX_SAFE_INTEGER }));
  }, []);

  // const [pageCurrent, setPageCurrent] = useState(1);

  const [currentImg, setImg] = useState("");
  const [showModal, setShowModal] = useState(false);
  const toggleScrollbarGH = () => {
    const element = document.getElementsByTagName("body")[0];

    if (showModal) {
      element.classList.remove("overflow-hidden");
    } else element.classList.add("overflow-hidden");
  };

  const darkMode = useAppSelector(selectDarkMode);
  const onClickHandler = (url: string) => {
    setImg(url);
    setShowModal(true);
    //// console.log(currentImg);
    toggleScrollbarGH();
  };
  const modalReference = useRef<HTMLImageElement>(null);

  const [iframeMouseOver, setIframeMouseOver] = useState(false);

  // const setImagesPage = (selectedItem: { selected: number }) => {
  //   //0 indexing in react paginate
  //   // console.log(selectedItem);
  //   // setPageCurrent(selectedItem.selected);
  //   dispatch(fetchImagesThunk({ page: selectedItem.selected + 1, limit: 4 }));
  // };
  // const totalImages = useAppSelector(selectCount);
  const responsiveCarousel = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  const CustomRightArrow = ({ onClick, ...rest }: any) => {
    const {
      onMove,
      carouselState: { currentSlide, deviceType }
    } = rest;
    // onMove means if dragging or swiping in progress.
    return (<button
      onClick={onClick}
      className="react-multiple-carousel__arrow react-multiple-carousel__arrow--right" style={{ "right": "3px", borderRadius: "0.375rem", backgroundColor: "rgba(0, 0, 0, 0.35)" }}>

    </button>);
  };

  const CustomLeftArrow = ({ onClick, ...rest }: any) => {
    const {
      onMove,
      carouselState: { currentSlide, deviceType }
    } = rest;
    // onMove means if dragging or swiping in progress.
    return (<button
      onClick={onClick}
      className="react-multiple-carousel__arrow react-multiple-carousel__arrow--left" style={{ "left": "3px", borderRadius: "0.375rem", backgroundColor: "rgba(0, 0, 0, 0.35)" }}>

    </button>);
  };

  return (
    <div
      className={`${darkMode ? "dark" : ""
        } transition-all duration-300 ease-linear dark:bg-dark-primary`}
    >
      <div className="dark:bg-dark-primary">
        <div className="socials__heading mx-[4rem] mt-10 inline-block text-[1.5rem] dark:bg-dark-primary dark:text-[#ffee00c7] md:text-[1.8rem] lg:text-[2rem]">
          GALLERY
        </div>
        <div className="flex justify-center py-20">
          <div className="mx-auto w-[90%]">
            {loadingImages == "pending" ? <p>Loading</p> : (<div className="h-full">
              <RMCarousel responsive={responsiveCarousel} infinite={true} customRightArrow={<CustomRightArrow />} customLeftArrow={<CustomLeftArrow />} containerClass="h-full py-5">
                {galleryImages.map((galleryImage, indx) => {
                  return (
                    <div className="card text-left m-1 h-full rounded-md overflow-hidden" key={indx} onClick={() => onClickHandler(galleryImage.imageUrl)} data-bs-toggle="modal"
                      data-bs-target="#exampleModalCenter"
                      role="presentation">
                      <img
                        className={`${galleryImage.description.length === 0 ? "h-full" : ""} justify-center mx-auto rounded-md object-cover relative`}
                        src={galleryImage.imageUrl}
                        alt="Alt text"
                      />
                      {galleryImage.description.length > 0 ? <div className="card-body absolute pt-2">
                        <h5 className="card-title">{galleryImage.title}</h5>
                        <p className="card-text">{HTMLReactParser(galleryImage.description)}</p>
                      </div> : <></>}
                    </div>
                  );
                })}
              </RMCarousel>
            </div>
            )}
          </div>
        </div>



      </div>
      {showModal ? (
            <div
              className="modal fade mt-30 fixed  top-0 grid  h-full w-full  justify-items-center outline-none"
              role="presentation"
              style={{ background: "rgba(0, 0, 0, 0.3)", zIndex: 1001 }}
              onClick={() => {
                // console.log("iframeMouseOver", iframeMouseOver);
                if (iframeMouseOver) {
                  // setShowModal(false);\
                  setShowModal(false);
                  toggleScrollbarGH();
                }
              }}
            >
              <div className="modal-dialog modal-dialog-centered pointer-events-none relative w-full h-full">
                <div className="modal-content pointer-events-auto  relative flex w-full h-full flex-col rounded-md  border-none bg-clip-padding text-current outline-none">
                  <div className="modal-header flex flex-shrink-0 items-center justify-between rounded-t-md p-4">
                    <button
                      type="button"
                      className="btn-close absolute right-0 z-[200] mx-10 mt-10 box-content rounded-none border-none p-1 text-white opacity-50 hover:text-black hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                      onClick={() => {
                        setShowModal(false);
                        toggleScrollbarGH();
                      }}
                    >
                      <img
                        src={CloseIcon}
                        alt="close"
                        className="h-[30px] w-[30px] "
                      />
                    </button>
                  </div>
                  <div className="modal-body  relative mx-auto p-4 flex my-auto">
                    <img
                      className="items-center rounded-md mx-auto"
                      src={currentImg}
                      alt={currentImg}
                      ref={modalReference}
                      role="presentation"
                      onMouseOver={() => setIframeMouseOver(false)}
                      onMouseOut={() => setIframeMouseOver(true)}
                    />
                  </div>
                  <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md  p-4"></div>
                </div>
              </div>
            </div>
          ) : null}
    </div>
  );
};

export default GalleryHome;
