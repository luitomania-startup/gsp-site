import React, { useEffect, useRef, useState, Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/20/solid";
import CloseIcon from "../../assets/icons8-close-window-100.png";

import { useAppDispatch, useAppSelector } from "../../store";
import EditFormModal from "./Form/editFormMembershipFormModal";
// import EditFormModal from "./Form/editForm";
import parse from "html-react-parser";
import { selectDarkMode } from "../../store/globals/globalsSlice";
import { CircleLoader, HashLoader } from "react-spinners";
import {
  fetchMembershipFormThunk,
  loading,
  selectMembershipForm,
  toggleEditMembershipFormModal,
  selectEditModal,
  selectReadMoreModalText,
  selectReadMoreModal,

} from "../../store/membershipForm/membershipFormSlice";
import MembershipForm from "./Register";
import ReadMoreTextModal from "./shared/ReadMoreTextModal";

const AdminMembershipForm = () => {
  const dispatch = useAppDispatch();
  // const [createModalShow, setCreateModalShow] = useState(false);

  const createClickHandler = () => {
    dispatch(toggleEditMembershipFormModal());
  };
  const ReadMoreModal = useAppSelector(selectReadMoreModal);
  const EditModal = useAppSelector(selectEditModal);
  const darkMode = useAppSelector(selectDarkMode);
  const loadingMembershipForm = useAppSelector(loading);
  const data = useAppSelector(selectMembershipForm);
  useEffect(() => {
    setTimeout(() => {
      dispatch(fetchMembershipFormThunk())
        .then(() => {
          console.log("Successfully fetched about us");
        })
        .catch((err) => {
          console.log(err.message);
        });
    }, 1000);
  }, []);
  return (
    <div className="">
      <h2
        className="bg-white  pt-10 pb-4 text-center text-5xl font-bold text-black dark:bg-dark-primary "
        style={{ color: "#00A652", fontFamily: "Open Sans" }}
      >
        ADMIN REGISTER
      </h2>
      <div className="mx-auto w-[90%]">
        <button
          className="btn create float-right mt-1 h-12 w-36 self-end "
          onClick={createClickHandler}
        >
          Edit
        </button>
      </div>

      {EditModal ? <EditFormModal /> : ""}
      {ReadMoreModal ? <ReadMoreTextModal/> : ""}
      <div className="">
        <MembershipForm/>
      </div>
    </div>
  );
};

export default AdminMembershipForm;
