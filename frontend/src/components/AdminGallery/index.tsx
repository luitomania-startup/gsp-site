import React, { useEffect, useRef, useState, Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/20/solid";
import Images from "./Images";
import Videos from "./Videos";
import CloseIcon from "../../assets/icons8-close-window-100.png";
import {
  selectAddModal,
  selectEditModal,
  selectReadMoreModal,
  toggleAddGalleryModal,
} from "../../store/gallery/gallerySlice";
import { useAppDispatch, useAppSelector } from "../../store";
import AddFormModal from "./Form/addFormGalleryModal";
import EditFormModal from "./Form/editFormGalleryModal";
import ReadMoreTextModal from "./shared/ReadMoreTextModal";
// import EditFormModal from "./Form/editForm";

const AdminGallery = () => {
  const options = ["Images", "Videos"];
  const dispatch = useAppDispatch();
  const [galleryMode, setGalleryMode] = useState(options[0]);
  // const [createModalShow, setCreateModalShow] = useState(false);

  const createClickHandler = () => {
    dispatch(toggleAddGalleryModal());
  };
  const AddModal = useAppSelector(selectAddModal);
  const EditModal = useAppSelector(selectEditModal);
  const ReadMoreModal = useAppSelector(selectReadMoreModal);
  return (
    <>
      <h2
        className="bg-white  pt-10 pb-4 text-center text-5xl font-bold text-black"
        style={{ color: "#00A652", fontFamily: "Open Sans" }}
      >
        ADMIN GALLERY
      </h2>
      <div className="mx-auto my-5 w-[90%]">
        <Listbox value={galleryMode} onChange={setGalleryMode}>
          <div className="relative z-[100] float-left mt-1 w-36">
            <Listbox.Button className=" w-full  rounded-lg bg-green-600 py-3 pl-3 pr-10 text-left text-white shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
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
        <button
          className="btn create float-right mt-1 h-12 w-36 self-end "
          onClick={createClickHandler}
        >
          Create
        </button>
      </div>
      <div className="mx-auto w-[90%] pt-10">
        {galleryMode === "Images" ? <Images /> : <Videos />}
      </div>
      {AddModal ? <AddFormModal /> : ""}
      {EditModal ? <EditFormModal galleryMode={galleryMode} /> : ""}
      {ReadMoreModal ? <ReadMoreTextModal /> : ""}
    </>
  );
};

export default AdminGallery;
