import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import { useDispatch } from "react-redux";
import {
  selectCurrentFeed,
  updateCurrentFeed,
  fetchFeed,
  selectLoading,
} from "../../store/feed/feedSlice";
import parse from 'html-react-parser'
import { current } from "@reduxjs/toolkit";
const ViewFeed = () => {
  const { id } = useParams();
  const currentFeed = useAppSelector(selectCurrentFeed);
  const loading = useAppSelector(selectLoading)
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchFeed(id!))
      .unwrap()
      .then(() => {
        // console.log("feed fetched successfully");
      })
      .catch((err) => {
        // console.log("Unable to fetch feed ");
      });
  }, []);
  return (
    <div className="flex h-screen w-screen items-center justify-center">
    {
      (loading=="success" && Object.keys(currentFeed).length!=0 )?
      <div>
        <h1>{currentFeed.title}</h1>
        <p>{parse(`${currentFeed?`${currentFeed.readmore}`:'<p> Loading ... </p>'}`)}</p>
      </div>:" loading..."
    }
    </div>
  );
};

export default ViewFeed;
