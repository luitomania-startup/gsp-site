import React, { useEffect, useRef, useState, Fragment } from "react";
import Images from "./Images";
import Videos from "./Videos";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import {selectDarkMode} from '../../store/globals/globalsSlice'
import { useAppSelector } from "../../store";
const Gallery = () => {
  const darkMode = useAppSelector(selectDarkMode)
  const options = ["Images", "Videos"];
  const [galleryMode, setGalleryMode] = useState(options[1]);
  // const [pageCurrent, setPageCurrent] = useState(1);
  return ( 

    <div className={`${darkMode?"dark":""} dark:bg-dark-primary`}>
    <div className="dark:bg-dark-primary h-screen">


      {/* <div className="mx-auto my-5 w-[90%] pb-10">
        <Listbox value={galleryMode} onChange={setGalleryMode}>
          <div className="relative z-[100] float-left mt-1 w-36">
            <Listbox.Button className=" w-full cursor-default rounded-lg bg-green-600 py-3 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm text-white">
              <span className="block truncate">{galleryMode}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <div className="w-7 h-7 bg-yellow-300 rounded-full">
              <ChevronDownIcon
                  className="h-5 w-5 text-gray-400 mx-auto mt-1"
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
                        active ? "bg-amber-100 text-amber-900" : "text-gray-900 bg-green-100"
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
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
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
      </div> */}
      {/* <div className="ml-52 mt-20 h-12 w-44">
        <select
          className="relative rounded-md bg-green-600"
          // style="width: 176px; height: 52px;"
        >
          <option
            className="absolute bg-green-600 text-center text-xl font-medium text-white"
            // style="left: 50.03px; top: 13.30px;"
          >
            Images
          </option>
          <option
            className="absolute bg-white text-center text-xl font-medium text-white"
            // style="left: 50.03px; top: 13.30px;"
          >
            Videos
          </option>
        </select>
      </div> */}
<Images />
<Videos />
      {/* {galleryMode === "Images" ?  : } */}
    </div>
     </div>
  );
};

export default Gallery;
