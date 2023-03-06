import React, { useEffect, useRef, useState, Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/20/solid";
import Posts from "./Posts";
import CloseIcon from "../../assets/icons8-close-window-100.png";
import { selectAddModal, selectEditModal, selectReadMoreModal, toggleAddPostModal } from "../../store/posts/postsSlice";
import { useAppDispatch, useAppSelector } from "../../store";
import AddFormModal from "./Form/addFormPostModal";
import EditFormModal from "./Form/editFormPostModal";
import ReadMoreTextModal from "./shared/ReadMoreTextModal";
// import EditFormModal from "./Form/editForm";

const AdminPosts = () => {
  const dispatch = useAppDispatch();
  // const [createModalShow, setCreateModalShow] = useState(false);
  
  const createClickHandler = () => {
    dispatch(toggleAddPostModal());
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
        ADMIN POSTS
      </h2>
      <div className="mx-auto w-[90%] my-5">
        <button className="self-end btn create float-right w-36 h-12 mt-1 " onClick={createClickHandler}>
          Create
        </button>
      </div>
      <div className="w-[90%] pt-10 mx-auto">
      <Posts/>
      </div>
      {AddModal ? <AddFormModal /> : ""}
      {EditModal ? <EditFormModal/> : ""}
      {ReadMoreModal ? <ReadMoreTextModal/> : ""}

    </>
  );
};

export default AdminPosts;
