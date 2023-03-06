import React, { useEffect, useState } from "react";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
} from "formik";
import { FiSend } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../store";
const styles = {
  label: "block text-gray-700 text-sm font-bold pt-2 pb-1",
  field:
    "bg-gray-100 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none focus:bg-gray-200",
  button:
    " bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600",
  errorMsg: "text-red-500 text-sm",
  textarea:
    "bg-gray-100 w-[300px] sm:w-[600px] lg:w-[800px] focus:shadow-outline rounded block w-full appearance-none focus:bg-gray-200 p-5",
};
import { Post } from "../../../../types/types";
import { getUploadPostSign } from "../../../../services/post";
import {
  editPostThunk,
  fetchPostThunk,
  loading,
  selectPostIdOne,
  selectPostOne,
  toggleEditPostModal,
} from "../../../../store/posts/postsSlice";
import { Editor } from "@tinymce/tinymce-react";
import { useCloudinaryGenericSetter } from "../../../../hooks/cloudinaryGenericSetter";
const EditFormModal = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const redirectLogin = () => {
    navigate("/login");
  };
  const loadingState = useAppSelector(loading);
  const id = useAppSelector(selectPostIdOne);
  const initialPost = useAppSelector(selectPostOne);
  useEffect(() => {
    dispatch(fetchPostThunk(id));
  }, []);
  // useEffect(() => {
  //   setTimeout(() => {
  //     if(initialPost._id === ""){
  //       dispatch(toggleEditPostModal());
  //     }
  //   }, 1000)
  // }, [])
  const [secureUrl, publicId, setUploadedFilename, setUploadedFilenamePublic, upload, clearData] = useCloudinaryGenericSetter(
    "posts",
    "posts",
    getUploadPostSign,
    "posts"
  );
  useEffect(() => {
    setUploadedFilename(initialPost.postImageUrl || "");
    setUploadedFilenamePublic(initialPost.postImagePublicId || "");
  }, [initialPost]);
  // console.log("URL", secureUrl, publicId)
  // const formInitialValues = {
  //   _id: initialPost._id,
  //   description: initialPost.description,
  //   postImagePublicId: initialPost.postImagePublicId,
  //   postImageUrl: initialPost.postImageUrl,
  //   title: initialPost.title,
  // } as Post;
  // // console.log("VITE CLOUD NAME: " + import.meta.env.VITE_CLOUD_NAME);
  // // console.log("VITE CLOUD API KEY: " + import.meta.env.VITE_CLOUD_API_KEY);

  return (
    <>
      {!["idle", "pending"].includes(loadingState) ? (
        <Formik
          initialValues={{
            _id: initialPost._id,
            description: initialPost.description,
            postImagePublicId: initialPost.postImagePublicId,
            postImageUrl: initialPost.postImageUrl,
            title: initialPost.title,
          } as Post}
          validate={(values) => {
            const errors: any = {};
            return errors;
          }}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setSubmitting(false);
            const formData: Post = {
              _id: id,
              title: values.title,
              description: values.description,
              postImageUrl: secureUrl,
              postImagePublicId: publicId,
            };
            // console.log("REQUIRED DATA: ", formData);
            dispatch(editPostThunk({ formData, page: 1, limit: 4 })).unwrap()
            .then(() => {
              alert("successfully added");
            })
            .catch((err:Error) => {
              alert(`Unsuccessful:  ${err.message ? err.message: ''}  ${err ? err : ''}`)
            });
            clearData();
            resetForm();
            dispatch(toggleEditPostModal());
          }}
        >
          {({
            values,
            isSubmitting,
            isValid,
            errors,
            touched,
            setFieldValue,
          }) => (
            <div className=" my-10 flex px-4 ">
              <Form className=" form-training w-[300px] sm:w-[600px] lg:w-[800px]">
              <div className="form-group row py-sm-1 px-sm-3">
                  <label className={styles.label} htmlFor="_id">
                    ID
                    {errors._id ? (
                      <span className={styles.errorMsg}>*</span>
                    ) : (
                      ""
                    )}
                  </label>
                  <Field
                    className={`${styles.field} bg-gray-300 ${
                      touched._id && errors._id ? "is-invalid" : ""
                    }`}
                    type="text"
                    name="_id"
                    placeholder="_id"
                    disabled
                  />
                  <ErrorMessage
                    name="_id"
                    component="span"
                    className={styles.errorMsg}
                  />
                </div>
                <div className="form-group row py-sm-1 px-sm-3">
                  <label className={styles.label} htmlFor="title">
                    TITLE
                    {errors.title ? (
                      <span className={styles.errorMsg}>*</span>
                    ) : (
                      ""
                    )}
                  </label>
                  <Field
                    className={`${styles.field} ${
                      touched.title && errors.title ? "is-invalid" : ""
                    }`}
                    type="text"
                    name="title"
                    placeholder="Title"
                  />
                  <ErrorMessage
                    name="title"
                    component="span"
                    className={styles.errorMsg}
                  />
                </div>
                <div className="form-group row py-sm-1 px-sm-3">
                  <label className={styles.label} htmlFor="description">
                    DESCRIPTION
                    {errors.description ? (
                      <span className={styles.errorMsg}>*</span>
                    ) : (
                      ""
                    )}
                  </label>
                  {/* <Field
                className={`${styles.field} ${
                  touched.description && errors.description ? "is-invalid" : ""
                }`}
                type="text"
                name="description"
                placeholder="Description"
              /> */}
                  <Editor
                    apiKey={import.meta.env.VITE_TINYMCE_APIKEY}
                    initialValue={initialPost.description}
                    init={{
                      content_style:
                        "body { font-family:abril,Arial,cursive; font-size:18px }",
                      draggable_modal: true,
                      height: 500,
                      menubar: "tools insert file edit  view format table help",
                      plugins: [
                        "image code",
                        "advlist",
                        "autolink",
                        "lists",
                        "link",
                        "image",
                        "charmap",
                        "preview",
                        "anchor",
                        "searchreplace",
                        "visualblocks",
                        "code",
                        "fullscreen",
                        "insertdatetime",
                        "media",
                        "table",
                        "code",
                        "help",
                        "wordcount",
                      ],
                      toolbar:
                        "fonts" +
                        "undo redo | blocks | " +
                        "bold italic forecolor | alignleft aligncenter " +
                        "alignright alignjustify | bullist numlist outdent indent | " +
                        "removeformat | help" +
                        "link image | code ",
                    }}
                    onEditorChange={(newText: string) => {
                      setFieldValue("description", newText);
                    }}
                  />
                  <ErrorMessage
                    name="description"
                    component="span"
                    className={styles.errorMsg}
                  />
                </div>
                <div className="form-group row py-sm-2  px-sm-3 my-2 pb-5">
                  <label className={styles.label} htmlFor="profileurl">
                    UPLOAD IMAGE
                  </label>

                  <button
                    onClick={(
                      e: React.MouseEvent<HTMLButtonElement, MouseEvent>
                    ) => {
                      e.preventDefault();
                      upload();
                    }}
                    type="button"
                    className="mt-5 rounded-lg bg-green-600 px-5 py-3 text-left text-white shadow-md hover:bg-yellow-300 focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
                  >
                    UPLOAD
                  </button>
                  <a
                    className={`${
                      styles.label
                    } w-full border-0 font-bold text-green-600 hover:text-yellow-500 ${
                      touched.postImageUrl && errors.postImageUrl ? "is-invalid" : ""
                    }`}
                    href={secureUrl}
                  >
                    {secureUrl !== "" ? (
                      <>
                        <span className="text-black">Post uploaded at</span>{" "}
                        <span>{secureUrl}</span>{" "}
                      </>
                    ) : (
                      ""
                    )}
                  </a>
                </div>

                <div className=" flex flex-wrap items-center justify-center rounded-b-md border-t border-gray-200 py-4">
                  <button
                    type="submit"
                    className="w-full  rounded-lg bg-green-600 py-3 text-left text-white shadow-md hover:bg-yellow-300 focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light"
                  >
                    <div className="flex items-center justify-center">
                      ADD
                      <span className="ml-1 flex items-center">
                        <FiSend />
                      </span>
                    </div>
                  </button>
                </div>
              </Form>
            </div>
          )}
        </Formik>
      ): null}
    </>
  );
};

export default EditFormModal;
