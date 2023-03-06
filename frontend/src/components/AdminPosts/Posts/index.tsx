import React, { useEffect, useRef, useState } from "react";
import ReactPaginate from "react-paginate";

import "./PaginationBar.css";
import CloseIcon from "../../../assets/icons8-close-window-100.png";
import { useAppDispatch, useAppSelector } from "../../../store";
import {
  fetchPostsThunk,
  selectCount,
  selectPosts,
} from "../../../store/posts/postsSlice";
import { Post } from "../../../types/types";
import parse from 'html-react-parser'
import { Column } from "react-table";
import { selectDarkMode } from "../../../store/globals/globalsSlice";
import Table, {
  EditGallery,
  DownloadPDFIngredient,
  DeletePost,
  ReadMore,
  EditPost,
} from "../Table";
const Posts = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectPosts);
  useEffect(() => {
    dispatch(fetchPostsThunk({page: 1, limit: Number.MAX_SAFE_INTEGER}));
  }, []);
  const toggleScrollbar = () => {
    const element = document.getElementsByTagName("body")[0];

    if (element.classList.contains("overflow-hidden")) {
      element.classList.remove("overflow-hidden");
    } else element.classList.add("overflow-hidden");
  };
  const darkMode = useAppSelector(selectDarkMode);

  const totalPosts = useAppSelector(selectCount);
  const columns = React.useMemo(
    () => [
      {
        Header: "id",
        accessor: "_id",
      },
      {
        Header: "title",
        accessor: "title",
      },
      {
        Header: "Post",
        accessor: "postImageUrl",
        Cell: DownloadPDFIngredient,
        flagAccessor: "postImagePublicId",
      },
      {
        Header: "Edit Post",
        editAccessor: "_id",
        Cell: EditPost,
      },
      {
        Header: "Delete Post",
        delAccessor: "_id",
        Cell: DeletePost,
      },
      {
        Header: "Description",
        accessor: "description",
        Cell: ReadMore,
      },
    ],
    []
  );

  return (
    <div className="mt-10 z-0">
      <Table columns={columns} data={posts} />
    </div>
  );
};

export default Posts;
