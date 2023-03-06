/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useRef, useState, Fragment } from "react";
import ReactPaginate from "react-paginate";
import { Listbox, Transition } from "@headlessui/react";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/20/solid";
import CloseIcon from "../../../assets/icons8-close-window-100.png";
import { useAppDispatch, useAppSelector } from "../../../store";
import PostEditForm from "./PostForm/editForm";

import {
  fetchPostsThunk,
  selectCount,
  selectPosts,
  toggleEditPostModal,
} from "../../../store/posts/postsSlice";
import { selectDarkMode } from "../../../store/globals/globalsSlice";
const PostsAddModal = () => {
  const dispatch = useAppDispatch();
  // const posts = useAppSelector(selectPosts);
  const modalReference = useRef<HTMLDivElement>(null);
  useEffect(() => {
    dispatch(fetchPostsThunk());
    // modalReference?.current?.focus();
  }, []);
  const [iframeMouseOver, setIframeMouseOver] = useState(false);


  const toggleScrollbar = () => {
    const element = document.getElementsByTagName("body")[0];

    if (element.classList.contains("overflow-hidden")) {
      element.classList.remove("overflow-hidden");
    } else element.classList.add("overflow-hidden");
  };
  return (
    <>
      <div
        className="modal fade mt-30 fixed  top-0 grid  h-full  w-full justify-items-center outline-none backdrop-blur-sm"
        role="dialog"
        style={{ background: "rgba(0, 0, 0, 0.5)", zIndex: 200 }}
        onClick={() => {
          // console.log("iframeMouseOver", iframeMouseOver);
          if (iframeMouseOver) {
            // setShowModal(false);\
            dispatch(toggleEditPostModal());
          }
        }}
      >
        <div
          id="defaultModal"
          tabIndex={-1}
          className="modal z-50 mx-auto grid w-full justify-items-center overflow-y-auto  overflow-x-hidden p-4 md:h-full "
        >
          <div className="relative h-full w-full max-w-2xl md:h-auto ">
            <div
              className=" w-[300px] rounded-lg bg-white shadow dark:bg-gray-700 sm:w-[500px] lg:w-[600px]"
              tabIndex={0}
              ref={modalReference}
              onBlur={({ relatedTarget }) => {
                // console.log(relatedTarget?.id);
                // if (relatedTarget === null || 'us' !== relatedTarget?.id.split("-")[0]){
                //   if (hiddenValCNUD === "")
                //       setHiddenValCNUD("hidden");
                //   else setHiddenValCNUD("");
                // }
                // dispatch(toggleEditPostModal());
                // setCreateModalShow(false);
              }}
              
              onMouseOver={() => setIframeMouseOver(false)}
              onMouseOut={() => setIframeMouseOver(true)}
            >
              <div className="flex items-center justify-between rounded-t border-b p-4 dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white ">
                  {`Edit a Post`}
                </h3>
                <button
                  type="button"
                  className="btn-close    box-content rounded-none border-none text-black opacity-50 hover:text-black hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                  onClick={() => dispatch(toggleEditPostModal())}
                >
                  <img
                    src={CloseIcon}
                    alt="close"
                    className="h-[30px] w-[30px]"
                  />
                </button>
              </div>
              <PostEditForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostsAddModal;
