import React, { useEffect, useRef, useState } from "react";
import ReactPaginate from "react-paginate";

import "./PaginationBar.css";
import CloseIcon from "../../../assets/icons8-close-window-100.png";
import { useAppDispatch, useAppSelector } from "../../../store";
import {
  fetchImagesThunk,
  selectCount,
  selectImages,
} from "../../../store/gallery/gallerySlice";
import { Image } from "../../../types/types";
import parse from 'html-react-parser'
import { Column } from "react-table";
import { selectDarkMode } from "../../../store/globals/globalsSlice";
import Table, {
  EditGallery,
  ImageCell,
  DeleteImage,
  ReadMore,
} from "../Table";
const Images = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectImages);
  useEffect(() => {
    dispatch(fetchImagesThunk({page: 1, limit: Number.MAX_SAFE_INTEGER}));
  }, []);
  const toggleScrollbar = () => {
    const element = document.getElementsByTagName("body")[0];

    if (element.classList.contains("overflow-hidden")) {
      element.classList.remove("overflow-hidden");
    } else element.classList.add("overflow-hidden");
  };
  // const [pageCurrent, setPageCurrent] = useState(1);
  // const [currentImg, setImg] = useState("");
  // const [showModal, setShowModal] = useState(false);
  const imgReference = useRef<HTMLImageElement>(null);

  // const onClickHandler = (url: string) => {
  //   setImg(url);
  //   setShowModal(true);
  //   toggleScrollbar();
  //   //// console.log(currentImg);
  // };
  const darkMode = useAppSelector(selectDarkMode);

  // useEffect(() => {
  //   imgReference?.current?.focus();
  // }, [showModal]);
  const totalImages = useAppSelector(selectCount);
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
        Header: "Image",
        accessor: "imageUrl",
        Cell: ImageCell,
        flagAccessor: "imagePublicId",
      },
      {
        Header: "Edit Image",
        editAccessor: "_id",
        Cell: EditGallery,
      },
      {
        Header: "Delete Image",
        delAccessor: "_id",
        Cell: DeleteImage,
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
    <div className="mt-10 z-0 overflow-x-scroll">
      <Table columns={columns} data={posts} />
    </div>
  );
};

export default Images;
