import React, { useMemo, useEffect } from "react";
import { Document } from "react-pdf";
import pdf from "./members.pdf";
import Table, {
  AvatarCell,
  DateCell,
  DeleteOffer,
  DownloadPDFOffer,
  SelectColumnFilter,
  SelectDateFilter,
  StatusPill,
} from "./ReactTable/table";
import { COLUMNS } from "./ReactTable/columns";
import DATA from "./members.json";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  fetchMembers,
  selectLoading,
  selectMembers,
} from "../../store/members/membersSlice";
import { BarLoader } from "react-spinners";
import { selectDarkMode } from "../../store/globals/globalsSlice";
const Members = () => {
  const darkMode = useAppSelector(selectDarkMode);
  const data = useAppSelector(selectMembers);
  const loading = useAppSelector(selectLoading);
  const dispatch = useAppDispatch();
  const columns = useMemo(() => COLUMNS, []);
  useEffect(() => {
    setTimeout(() => {
      dispatch(fetchMembers())
        .then(() => {
          console.log("Successfully fetched members");
        })
        .catch((err) => {
          console.log(err.message);
        });
    }, 1000);
  }, []);
  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div className=" mx-auto h-screen w-full flex-col items-center justify-center py-10 px-10 dark:bg-dark-primary">
        {["pending", "idle"].includes(loading) ? (
          <div className="flex h-screen w-screen items-center justify-center">
            <BarLoader color=" #ffee00c7 " />
          </div>
        ) : (
          <Table columns={columns} data={data} />
        )}
      </div>
    </div>
  );
};

export default Members;
