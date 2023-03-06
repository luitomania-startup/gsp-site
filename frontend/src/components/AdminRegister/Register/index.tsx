import React, { useEffect, useRef, useState } from "react";
import ReactPaginate from "react-paginate";

import "./PaginationBar.css";
import CloseIcon from "../../../assets/icons8-close-window-100.png";
import { useAppDispatch, useAppSelector } from "../../../store";
import {
  fetchMembershipFormThunk,
  fetchMembershipSubmissionThunk,
  loading,
  selectMembershipForm,
  selectMembershipSubmissions,
} from "../../../store/membershipForm/membershipFormSlice";
import { MembershipForm } from "../../../types/types";
import parse from "html-react-parser";
import { Column } from "react-table";
import { selectDarkMode } from "../../../store/globals/globalsSlice";
import Table, {
  EditGallery,
  DownloadPDFIngredient,
  ReadMore,
  RegistrationImage,
  ReadMoreRegister,
  RegistrationText,
} from "../Table";
import { HashLoader } from "react-spinners";
const Register = () => {
  const dispatch = useAppDispatch();
  const membershipForm = useAppSelector(selectMembershipForm);
  const membershipSubmissions = useAppSelector(selectMembershipSubmissions);
  const loadingRegister = useAppSelector(loading);
  useEffect(() => {
    dispatch(fetchMembershipFormThunk());
    dispatch(fetchMembershipSubmissionThunk());
  }, []);
  const toggleScrollbar = () => {
    const element = document.getElementsByTagName("body")[0];

    if (element.classList.contains("overflow-hidden")) {
      element.classList.remove("overflow-hidden");
    } else element.classList.add("overflow-hidden");
  };
  const darkMode = useAppSelector(selectDarkMode);
  const columnType = (name: string, type: string, display: string) => {
    const columnMap: { [type: string]: any } = {
      name: {
        Header: display,
        accessor: name,
        Cell: RegistrationText,
      },
      email: {
        Header: display,
        accessor: name,
        Cell: RegistrationText,
      },
      text: {
        Header: display,
        accessor: name,
        Cell: RegistrationText,
      },
      imageUrl: {
        Header: display,
        accessor: name,
        flagAccessor: name,
        Cell: RegistrationImage,
      },
      editor: {
        Header: display,
        accessor: name,
        Cell: ReadMoreRegister,
      },
    };
    return columnMap[type] || null;
  };
  const columns = [
      {
        Header: "id",
        accessor: "_id",
      },
      ...membershipForm.reduce((acc: {name: string, type: string, display: string, validation: Object}[], { name, type, display }: {name: string, type: string, display: string, validation: Object}) => {
        const columnVal: {name: string, type: string, display: string, validation: Object} = columnType(name, type, display);
        if (columnVal) acc.push(columnVal);
        return acc;
      }, [])
    ];

  return (
    <>
      {["pending", "idle"].includes(loadingRegister) ? (
        <div
          className="flex h-screen w-screen 
      items-center justify-center"
        >
          <HashLoader color="#fdf100" />
        </div>
      ) : (
        <div className="z-0 mt-10">
          <Table
            columns={columns}
            data={membershipSubmissions.map((e: any) => {
              return { ...e.values[0], _id: e._id };
            })}
          />
        </div>
      )}
    </>
  );
};

export default Register;
