import React, { useEffect, useRef, useState } from "react";
import ReactPaginate from "react-paginate";

import "./PaginationBar.css";
import CloseIcon from "../../assets/icons8-close-window-100.png";
import { useAppDispatch, useAppSelector } from "../../store";
import { selectDarkMode } from "../../store/globals/globalsSlice";
import { fetchPostsThunk, selectCount, selectPosts } from "../../store/posts/postsSlice";
import parse from "html-react-parser";
import { Post } from "../../types/types";

const Posts = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectPosts);
  useEffect(() => {
    dispatch(fetchPostsThunk({page: 1, limit: 3}));
  }, []);

  const [currentImg, setImg] = useState<Post>();
  const [showModal, setShowModal] = useState(false);
  const imgReference = useRef<any>(null);
   const toggleScrollbar = () => {
    const element = document.getElementsByTagName("body")[0];
  
    if (element.classList.contains("overflow-hidden")) {
      element.classList.remove("overflow-hidden");
    } else element.classList.add("overflow-hidden");
  };
  const darkMode = useAppSelector(selectDarkMode);
  const onClickHandler = (item: Post) => {
    setImg(item);
    setShowModal(true);
    //// console.log(currentImg);
    toggleScrollbar();
  };
  useEffect(() => {
    imgReference.current?.focus();
  }, [showModal]);
  const setPostsPage = (selectedItem: { selected: number }) => {
    //0 indexing in react paginate
    // console.log(selectedItem);
    // setPageCurrent(selectedItem.selected);
    dispatch(fetchPostsThunk({page: selectedItem.selected+1, limit: 3}));
  };
  const totalPosts = useAppSelector(selectCount);
  const postPages = totalPosts / 3;
  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div className="bg-[#F1FFF8]  transition-all duration-500 ease-in-out dark:bg-dark-primary">
        <div className="socials__heading dark:text-[#ffee00c7] mx-[4rem] mt-20 inline-block text-[1.5rem] md:text-[1.8rem] lg:text-[2rem]">
          LATEST POSTS
        </div>
        <div className="mt-20 overflow-hidden">
          <div
            className="mx-auto mb-20 grid w-[80%] gap-10 pt-10 lg:grid-cols-3"
            style={{ fontFamily: "Open Sans", fontSize: "1.1rem" }}
          >
            {posts.map((items, key) => (
              <div
                className={`hover01  cursor-pointer rounded-md bg-[#E4FFF2] shadow-md hover:bg-[#C0FFDF] lg:max-w-lg`}
                key={key}
                onClick={() => onClickHandler(items)}
                data-bs-toggle="modal"
                data-bs-target="#exampleModalCenter"
                role="presentation"
              >
                {items.postImageUrl.length > 0 ? <img
                  className="h-64 w-full rounded-t-md object-cover"
                  src={items.postImageUrl}
                  alt={items.title}
                /> : <></>}
                {(items.title.length > 0 || items.description.length > 0 ) ? <div className="p-7">
                  {items.title.length > 0 ? <p className="mb-4 h-9 w-96 overflow-x-hidden whitespace-pre-line  text-2xl font-semibold leading-normal">
                    {items.title}
                  </p> : <></>}
                  {items.description.length > 0 ? <p className="h-1/5 overflow-auto whitespace-pre-line  text-xl leading-normal">
                    {items.description.length < 90
                      ? parse(items.description)
                      : <>{parse(items.description.slice(0, 90))}...</>}
                  </p>: <></>}
                  {/* <hr className="my-2 border-dotted border-black" />
                  <p className="overflow-auto whitespace-pre-line  text-base  leading-normal">
                    {new Date(items?.dateCreated || '').toLocaleDateString()}
                  </p> */}
                </div> : <div className="h-0"></div>}
              </div>
            ))}
          </div>

          {showModal ? (
            <div
              className="modal fade mt-30 fixed  top-0 grid  h-full  w-full justify-items-center outline-none"
              role="dialog"
              style={{ background: "rgba(0, 0, 0, 0.5)", zIndex: 1001 }}
            >
              <div
                id="defaultModal"
                tabIndex={-1}
                className="modal z-50 mx-auto w-full overflow-y-auto overflow-x-hidden p-4  md:h-full grid justify-items-center"
              >
                <div className="relative h-full w-full max-w-2xl md:h-auto">
                  <div className=" rounded-lg bg-white shadow dark:bg-gray-700 " 
                        ref={imgReference}
                        onBlur={() => {
                          // console.log(relatedTarget?.id);
                          // if (relatedTarget === null || 'us' !== relatedTarget?.id.split("-")[0]){
                          //   if (hiddenValCNUD === "")
                          //       setHiddenValCNUD("hidden");
                          //   else setHiddenValCNUD("");
                          // }
                          setShowModal(false);
                          toggleScrollbar();
                        }}
                        >
                    <div className="flex items-center justify-between rounded-t border-b p-4 dark:border-gray-600">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white ">
                        {currentImg?.title}
                      </h3>
                      <button
                        type="button"
                        className="btn-close    box-content rounded-none border-none text-black opacity-50 hover:text-black hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                        onClick={() => {setShowModal(false); toggleScrollbar();}}
                      >
                        <img
                          src={CloseIcon}
                          alt="close"
                          className="h-[30px] w-[30px]"
                        />
                      </button>
                    </div>

                    <div className="modal-body  relative mx-auto p-4">
                      <img
                        className="items-center rounded-md "
                        src={currentImg?.postImageUrl}
                        alt={currentImg?.title}
                        
                      />
                    </div>
                    <div className="items-center space-x-2 rounded-b px-6 pb-6 whitespace-pre-line ">
                      {parse(currentImg?.description || "")}
                    </div>
                    {/* <hr className="mx-auto border-dotted border-black w-[95%]" />

                    <div className="items-center space-x-2 rounded-b p-6 pt-2">
                      {new Date(currentImg?.dateCreated || '').toLocaleDateString()}
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          ) : null}
          <div className="mb-20 grid justify-items-center ">
            {/* <PaginationBar pageCurrent={pageCurrent} pages={imagePages} currentPageDataSetter={setImagesPage}/> */}
            <ReactPaginate
              // className="bg-yellow-100"
              breakLabel="..."
              nextLabel="Next >"
              onPageChange={setPostsPage}
              pageRangeDisplayed={5}
              pageCount={Math.ceil(postPages)}
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
      </div>
    </div>
  );
};

export default Posts;
