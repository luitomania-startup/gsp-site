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
// import DATA from './members.json'
import { Button } from "../shared/Button";
import {
  fetchFeeds,
  postFeeds_,
  selectLoading,
  selectAddModal,
  selectEditModal,
  selectFeeds,
  toggleAddModal,
  toggleEditModal,
} from "../../store/feed/feedSlice";
import { useAppDispatch, useAppSelector } from "../../store";
import AddFormModal from "./addForm";
import EditFormModal from "./editForm";


// import {useDispatch}  from 'react-redux'
// import { useColumns } from './ReactTable/columns';
const Feeds = () => {
  const data = useAppSelector(selectFeeds);
  const loading = useAppSelector(selectLoading);
  const dispatch = useAppDispatch();

  const AddModal = useAppSelector(selectAddModal);
  const EditModal = useAppSelector(selectEditModal);
  // const columns = useMemo(()=>COLUMNS,[])
  const handleAddToggle = () => {
    dispatch(toggleAddModal());
  };

  useEffect(() => {
    dispatch(fetchFeeds()).then(() => {
      // console.log("FETCHED Members");
    });
  }, []);

  // const data = useMemo(()=>DATA,[])
  return (
    <>
      <div
        className={`${
          AddModal || EditModal ? "blur" : " "
        } mx-auto mt-10   h-screen w-[90%] flex-col`}
      >
        <div className="flex h-[5rem] w-full flex-col justify-center">
          <Button className="self-end bg-green-200" onClick={handleAddToggle}>
            Add Feed
          </Button>
        </div>
        {loading == "pending" || loading == "idle" ? (
          "Loading ..."
        ) : (
          <Table columns={COLUMNS} data={data} />
        )}
      </div>

    
      {AddModal ? <AddFormModal /> : ""}
      {EditModal ? <EditFormModal /> : ""}
    </>
  );
};

export default Feeds;
