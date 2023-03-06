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
import ImageAddForm from "./ImageForm/addForm";
import VideoAddForm from "./VideoForm/addForm";

import {
  fetchImagesThunk,
  selectCount,
  selectImages,
  toggleAddGalleryModal,
} from "../../../store/gallery/gallerySlice";
import { selectDarkMode } from "../../../store/globals/globalsSlice";
const ImagesAddModal = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectImages);
  const modalReference = useRef<HTMLDivElement>(null);
  useEffect(() => {
    dispatch(fetchImagesThunk());
    // modalReference?.current?.focus();
  }, []);
  const [iframeMouseOver, setIframeMouseOver] = useState(false);

  const options = ["Images", "Videos"];
  const [galleryMode, setGalleryMode] = useState(options[0]);

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
            dispatch(toggleAddGalleryModal());
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
                  {`Add ${galleryMode === "Images" ? "an Image" : "a Video"}`}
                </h3>
                <button
                  type="button"
                  className="btn-close    box-content rounded-none border-none text-black opacity-50 hover:text-black hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                  onClick={() => dispatch(toggleAddGalleryModal())}
                >
                  <img
                    src={CloseIcon}
                    alt="close"
                    className="h-[30px] w-[30px]"
                  />
                </button>
              </div>

              <div className="modal-body  relative mx-auto p-4">
                {/* <img
                        className="items-center rounded-md "
                        src={currentImg.img}
                        alt={currentImg.title}
                        
                      /> */}
                <Listbox value={galleryMode} onChange={setGalleryMode}>
                  <div className="relative mt-1 w-36 justify-start">
                    <Listbox.Button className=" w-full cursor-default rounded-lg bg-green-600 py-3 pl-3 pr-10 text-left text-white shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                      <span className="block truncate">{galleryMode}</span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <div className="h-7 w-7 rounded-full bg-yellow-300">
                          <ChevronDownIcon
                            className="mx-auto mt-1 h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </div>
                      </span>
                    </Listbox.Button>
                    <Transition
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-green-100 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {options.map((option, idx) => (
                          <Listbox.Option
                            key={idx}
                            className={({ active }) =>
                              `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                active
                                  ? "bg-amber-100 text-amber-900"
                                  : "bg-green-100 text-gray-900"
                              }`
                            }
                            value={option}
                          >
                            {({ selected }) => (
                              <>
                                <span
                                  className={`block truncate ${
                                    selected ? "font-medium" : "font-normal"
                                  }`}
                                >
                                  {option}
                                </span>
                                {selected ? (
                                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-yellow-600">
                                    <CheckIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </Listbox>
              </div>
              {galleryMode === "Images" ? <ImageAddForm /> : <VideoAddForm />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImagesAddModal;
