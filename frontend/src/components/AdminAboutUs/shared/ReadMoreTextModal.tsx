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

import {
  selectReadMoreModalText,
  toggleReadMorePostModal,
} from "../../../store/posts/postsSlice";
import { selectDarkMode } from "../../../store/globals/globalsSlice";
import HTMLReactParser from "html-react-parser";

const styles = {
  label: "block text-gray-700 text-sm font-bold pt-2 pb-1",
  field:
    "bg-gray-100 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none focus:bg-gray-200",
  button:
    " bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600",
  errorMsg: "text-red-500 text-sm",
  textarea:
    "bg-gray-100 w-[300px] sm:w-[600px] lg:w-[800px] focus:shadow-outline rounded block w-full appearance-none focus:bg-gray-200 p-5",
};
const ReadMoreTextModal = () => {
  const dispatch = useAppDispatch();
  const modalReference = useRef<HTMLDivElement>(null);

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
            dispatch(toggleReadMorePostModal(""));
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
                // dispatch(toggleAddGalleryModal());
                // setCreateModalShow(false);
              }}
              
              onMouseOver={() => setIframeMouseOver(false)}
              onMouseOut={() => setIframeMouseOver(true)}
            >
              <div className="flex items-center justify-between rounded-t border-b p-4 dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white ">
                  {`Read More`}
                </h3>
                <button
                  type="button"
                  className="btn-close    box-content rounded-none border-none text-black opacity-50 hover:text-black hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                  onClick={() => dispatch(toggleReadMorePostModal(""))}
                >
                  <img
                    src={CloseIcon}
                    alt="close"
                    className="h-[30px] w-[30px]"
                  />
                </button>
              </div>
              <div className=" flex p-4 mx-auto">
                <div className="form-group row lg:w-[550px] mb-5 mx-auto">
                  <label className={styles.label} htmlFor="description">
                    DESCRIPTION
                  </label>
                  <div className={styles.field}>
                    {HTMLReactParser(useAppSelector(selectReadMoreModalText))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReadMoreTextModal;
