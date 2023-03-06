import {
  AdvancedVideo,
  lazyload,
  accessibility,
  responsive,
  placeholder,
} from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import React, { useEffect, useRef, useState } from "react";
import ReactPaginate from "react-paginate";

import CloseIcon from "../../../assets/icons8-close-window-100.png";
import { useAppDispatch, useAppSelector } from "../../../store";
import { fetchVideosThunk, selectCount, selectVideos } from "../../../store/gallery/gallerySlice";
import "./PaginationBar.css";
import HTMLReactParser from "html-react-parser";
import { Video } from "../../../types/types";

const Videos = () => {
  const dispatch = useAppDispatch();

  // const [pageCurrent, setPageCurrent] = useState(1);
  const videosView = useAppSelector(selectVideos);
  useEffect(() => {
    dispatch(fetchVideosThunk());
  }, [])
  const [currentVideo, setVideo] = useState<Video>();
  const [showModalVideo, setShowModalVideo] = useState(false);
  const [iframeMouseOver, setIframeMouseOver] = useState(false);

  const videoReference = useRef<HTMLDivElement>(null);

  const onClickHandler = (video: Video) => {
    setVideo(video);
    setShowModalVideo(true);
    //// console.log(currentVideo);
    // window.addEventListener('blur', function(){
    //   if(iframeMouseOver){
    //     setShowModalVideo(false);
    //   }
    // })
  };
  useEffect(() => {
    videoReference?.current?.focus();
  }, [showModalVideo]);

  const setVideosPage = (selectedItem: { selected: number }) => {
    //0 indexing in react paginate
    // console.log(selectedItem);
    // setPageCurrent(selectedItem.selected);
    dispatch(fetchVideosThunk({ page: selectedItem.selected + 1, limit: 4 }));
  };
  const totalVideos = useAppSelector(selectCount);


  const cld = new Cloudinary({
    cloud: {
      cloudName: import.meta.env.VITE_CLOUD_NAME,
    },
  });
  return (
    <>
      <div className="mt-10">

        <h2
          className="bg-white  pt-10 pb-4 text-center text-5xl font-bold text-black dark:bg-dark-primary mb-10"
          style={{ color: "#00A652", fontFamily: "Open Sans" }}
        >
          VIDEOS
        </h2>
        <div
          className=" mx-auto mb-20 grid px-20 gap-3 lg:grid-cols-4"
          style={{ fontFamily: "Open Sans", fontSize: "1.1rem" }}
        >
          {videosView.map((video, key) => {
            const num = video.videoUrl.split(".").length;
            const extLength = video.videoUrl.split(".")[num - 1].length;
            return (
              <div
                className="h-full w-full lg:max-w-lg z-[100]"
                key={key}
                onClick={() => onClickHandler(video)}
                data-bs-toggle="modal"
                data-bs-target="#exampleModalVideoCenter"
                role="presentation"
              >
                <img
                  className="object-contain  rounded-md shadow-md "
                  src={
                    video.videoUrl.slice(0, video.videoUrl.length - extLength - 1) +
                    ".jpg"
                  }
                  alt={video.title}
                />

                {/* <div className="p-4 dark:bg-[#dcfce7] rounded-b-md">
                <p className="mb-2 leading-normal dark:bg-[#dcfce7]">
                  {video.description.length < 50
                      ? HTMLReactParser(video.description || "")
                      : <>{HTMLReactParser(video.description.slice(0, 50) || "")}...</>}
                  </p>
                </div> */}
              </div>
            );
          })}
        </div>
        {showModalVideo ? (
          <div
            className="modal fade mt-30 fixed  top-0 grid w-full h-full  justify-items-center outline-none"
            role="presentation"
            style={{ background: "rgba(0, 0, 0, 0.5)", zIndex: 1001 }}
            onClick={() => {
              // console.log("iframeMouseOver", iframeMouseOver)
              if (iframeMouseOver) {
                setShowModalVideo(false);
              }
            }}
          >
            <div className="modal-dialog modal-dialog-centered pointer-events-none relative  bg-white px-7 my-5 rounded-md ">
              <div className="modal-content pointer-events-auto  relative flex w-full flex-col rounded-md  border-none bg-clip-padding text-current outline-none">
                <div className="modal-header flex flex-shrink-0 items-center justify-between rounded-t-md p-4 pb-14">
                  <button
                    type="button"
                    className="btn-close absolute right-0 mt-10 box-content rounded-none border-none p-1 text-black opacity-50 hover:text-black hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                    onClick={() => setShowModalVideo(false)}
                  >
                    <img
                      src={CloseIcon}
                      alt="close"
                      className="h-[30px] w-[30px]"
                    />
                  </button>
                </div>
                <div className="modal-body relative mx-auto flex h-full">
                  <div
                    role="presentation"
                    className="rounded-md"
                    ref={videoReference}

                  // onBlur={({ relatedTarget }) => {
                  //   // console.log(relatedTarget?.className);
                  //   setShowModalVideo(false);
                  // }}
                  >
                    {/* <AdvancedVideo
                      cldVid={cld.video(items.img)}
                      controls
                      plugins={[
                        lazyload(),
                        responsive(),
                        accessibility(),
                        placeholder(),
                      ]}
                    /> */}

                    <iframe
                      className="h-[85vh] w-[90vw] rounded-md"
                      id="iframe-cld-vid"
                      title="magnified"
                      src={`https://player.cloudinary.com/embed/?cloud_name=${import.meta.env.VITE_CLOUD_NAME
                        }&public_id=${currentVideo?.videoUrl}&fluid=true&controls=true`}
                      allow=" fullscreen; encrypted-media; picture-in-picture"
                      allowFullScreen
                      frameBorder="0"

                      onMouseOver={() => setIframeMouseOver(false)}
                      onMouseOut={() => setIframeMouseOver(true)}
                    ></iframe>
                    {(currentVideo && currentVideo.description.length > 0) ? <div className="p-4 dark:bg-[#dcfce7] rounded-b-md">
                      <p className="mb-2 leading-normal dark:bg-[#dcfce7] ">
                        {HTMLReactParser(currentVideo.description || "")}
                      </p>
                    </div> : <></>}
                    {/* <video
                    className="cld-video-player cld-video-player-skin-dark justify-items-center mt-44"
                      controls
                      
                    >
                      <source src={cld.video(currentVideo).toURL()} type="video/mp4" />
                      
                    </video> */}
                  </div>
                </div>
                <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md  p-4"></div>
              </div>
            </div>
          </div>
        ) : null}
        <div className="grid justify-items-center mb-10">
          {/* <PaginationBar pageCurrent={pageCurrent} pages={imagePages} currentPageDataSetter={setVideosPage}/> */}
          <ReactPaginate
            breakLabel="..."
            nextLabel="Next >"
            onPageChange={setVideosPage}
            pageRangeDisplayed={5}
            pageCount={Math.ceil(totalVideos / 4)}
            previousLabel="< Previous"
            containerClassName="pagination-home"
            activeClassName="active-home"
            breakClassName="page-item-home"
            breakLinkClassName="page-link-home"
            pageClassName="page-item-home"
            pageLinkClassName="page-link-home"
            previousClassName="page-item-home"
            previousLinkClassName="page-link-home"
            nextClassName="page-item-home"
            nextLinkClassName="page-link-home"
          />
        </div>
      </div>
    </>
  );
};

export default Videos;
