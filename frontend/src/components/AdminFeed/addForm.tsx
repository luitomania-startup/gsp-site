import React, { useEffect, useState } from "react";
import { getFeed } from "../../services/feed";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  useField,
  useFormikContext,
} from "formik";
import { FiSend } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import PasswordShowHide from "../shared/PasswordShowHide";
import { useAppDispatch } from "../../store";
import { postFeeds_ } from "../../store/feed/feedSlice";
import MyTextArea from "./shared/TextArea";
import { Button } from "./shared/Button";
import { IFeed } from "../../types/types";
const styles = {
  label: "block text-gray-700 text-sm font-bold mt-3 mb-2",
  field:
    "bg-gray-100 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none focus:bg-gray-200",
  button:
    " bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600",
  errorMsg: "text-red-500 text-sm",
  textarea:
    "bg-gray-100 w-[300px] sm:w-[600px] lg:w-[800px] focus:shadow-outline rounded block w-full appearance-none focus:bg-gray-200 p-5",
};
import { useCloudinary } from "../../hooks/cloudinary"; // CUSTOM CLOUDINARY HOOK
import { toggleAddModal } from "../../store/feed/feedSlice";
import { Editor } from "@tinymce/tinymce-react";
import BlurhashImageEncoder from "./shared/BlurHash";
const FeedsModal = () => {
  const [readmore , setReadmore] = useState("");
  
  const [url1, upload1] = useCloudinary("", "feed", "feedsUpload", "feed");
  
  const [bh , setBh] = useState("");
  useEffect(() => {
  }, [url1])
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const redirectLogin = () => {
    navigate("/login");
  };
  const formInitialValues = {
    title: "",
    subtext: "",
    description: "",
    imageUrl: ""
  } as IFeed;
  // // console.log("VITE CLOUD NAME: " + import.meta.env.VITE_CLOUD_NAME);
  // // console.log("VITE CLOUD API KEY: " + import.meta.env.VITE_CLOUD_API_KEY);
  const [encodedHash, setEncodedHash] = useState("");
  return (
    <div
      id="defaultModal"
      tabIndex={-1}
      aria-hidden="true"
      className=" modal fixed top-0 left-0 py-[16rem] right-0 h-screen w-screen overflow-x-hidden overflow-y-auto  "
    >
      <div className="relative flex h-screen w-full items-center justify-center ">
        <div className="relative rounded-lg  bg-white shadow dark:bg-gray-700">
          <div className="flex pl-[5rem] pr-[8rem] md:px-[1rem] items-start justify-around rounded-t border-b p-4 dark:border-gray-600 ">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Add a New Feed
            </h3>
            <button
              type="button"
              className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle="defaultModal"
              onClick={() => dispatch(toggleAddModal())}
            >
              <svg
                aria-hidden="true"
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          <div className="flex h-full w-full items-center justify-center">
            <div className="flex  w-[500px] items-center justify-center rounded-lg bg-white shadow-lg sm:w-[700px] lg:w-[900px]">
              <Formik
                initialValues={formInitialValues}
                validate={(values) => {
                  const errors: any = {};
                  if (!values.title) {
                    errors.title = "Title is Required";
                  }
                  else if(values.title.length <=5){
                    errors.title = "Title must be at least 5 characters"
                  }
                  else if(values.title.length >=50){
                    errors.title = "Title must be at most 50 characters"
                  }
                  if (!values.subtext) {
                    errors.subtext = "SubText is Required";
                  }
                  if (!values.description) {
                    errors.description = "Description is Required";
                  }
                  else if(values.description.length <=50){
                    errors.description = "Description should be at least 50 characters"
                  }
                  // console.log(url1)
                  if (!url1 || url1=="") {
                    errors.imageUrl = "Image Url is  Required";
                  }
                  return errors;
                }}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                  setSubmitting(false);
                  const requiredData = {
                    title: values.title,
                    subtext: values.subtext,
                    description: values.description,
                    imageUrl: url1,
                    readmore: readmore,
                    blurHash: encodedHash
                  } as IFeed;
                  // // console.log("REQUIRED DATA: ", requiredData);
                  dispatch(postFeeds_(requiredData)).unwrap()
                    .then(() => {
                      alert("Successfully Added a New Feed");
                      dispatch(toggleAddModal());
                    })
                    .catch((err: any) => {
                      // console.log("ERROR"+err)
                      alert("Unsuccessful update" + JSON.stringify(err.response));
                    });
                  // alert(JSON.stringify(requiredData))
                  resetForm();
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
                  <div className=" my-10 flex w-[400px] justify-center sm:w-[600px] lg:w-[800px] ">
                    <Form className=" form-training w-[300px] sm:w-[600px] lg:w-[800px]">
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
                          placeholder="Enter Title"
                        />
                        <ErrorMessage
                          name="title"
                          component="span"
                          className={styles.errorMsg}
                        />
                      </div>
                      <div className="form-group row py-sm-1 px-sm-3">
                        <label className={styles.label} htmlFor="subtext">
                          SUBTEXT
                          {errors.subtext ? (
                            <span className={styles.errorMsg}>*</span>
                          ) : (
                            ""
                          )}
                        </label>
                        <Field
                          className={`${styles.field} ${
                            touched.subtext && errors.subtext
                              ? "is-invalid"
                              : ""
                          }`}
                          type="text"
                          name="subtext"
                          placeholder="Enter Subtext"
                        />
                        <ErrorMessage
                          name="subtext"
                          component="span"
                          className={styles.errorMsg}
                        />
                      </div>
                      <div className="form-group row py-sm-2 px-sm-3">
                        <label className={styles.label} htmlFor="description">
                          DESCRIPTION
                          {errors.description ? (
                            <span className={styles.errorMsg}>*</span>
                          ) : (
                            ""
                          )}
                        </label>
                        <Field
                          className={`${styles.field} ${
                            touched.description && errors.description
                              ? "is-invalid"
                              : ""
                          }`}
                          type="text"
                          name="description"
                          placeholder="Enter Description"
                        />

                        <ErrorMessage
                          name="description"
                          component="div"
                          className={styles.errorMsg}
                        />
                      </div>
                      <div className="form-group row py-sm-2  px-sm-3 my-2 pb-5">
                        <label className={styles.label} htmlFor="imageUrl">
                          BACKGROUND IMAGE URL
                        </label>
                        <Field
                          className={`${styles.field} ${
                             errors.imageUrl
                              ? "is-invalid"
                              : ""
                          }`}
                          type="text"
                          name="imageUrl"
                          value={url1}
                          placeholder="Click on Upload to Upload Image"
                        />
                         <ErrorMessage
                          name="imageUrl"
                          component="div"
                          className={styles.errorMsg}
                        />
                        <Button
                          onClick={(
                            e: React.MouseEvent<HTMLButtonElement, MouseEvent>
                          ) => {
                            e.preventDefault();
                            upload1();
                          }}
                          type="button"
                        >
                          UPLOAD Image
                        </Button>
                        <BlurhashImageEncoder
                          onChange={(hash) => setEncodedHash(hash)}
                          value={encodedHash}
                          url={url1}
                        />

                        {/* {bookingUploadedFilename!=''?<span className=" overflow-x-auto max-w-[400px] h-full">{bookingUploadedFilename}</span>:""} */}

                        {/* <MyTextArea
                    label="About Me"
                    name="aboutme"
                    rows="6"
                    cols=""
                    styles={styles}
                    placeholder="Enter Something About You"
                    className={`${styles.textarea}`}
                  /> */}
                      </div>

                      <label className={styles.label} htmlFor="readmore">
                          READ MORE 
                          {errors.subtext ? (
                            <span className={styles.errorMsg}>*</span>
                          ) : (
                            ""
                          )}
                        </label>

                      <Editor
                        apiKey={import.meta.env.VITE_TINYMCE_APIKEY}
                        initialValue="<p>This is the initial content of the editor.</p>"
                        init={{
                          height: 500,
                          menubar:
                            "tools insert file edit  view format table help",
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
                          draggable_modal: true,
                          toolbar:
                            "fonts" +
                            "undo redo | blocks | " +
                            "bold italic forecolor | alignleft aligncenter " +
                            "alignright alignjustify | bullist numlist outdent indent | " +
                            "removeformat | help" +
                            "link image | code ",
                          content_style:
                            "body { font-family:abril,Arial,cursive; font-size:18px }",
                        }}
                        onEditorChange={(newText: string) => {
                          setReadmore(newText);
                        }}
                      />

                      <div className=" flex flex-wrap items-center justify-center rounded-b-md border-t border-gray-200 p-4">
                        <Button
                          type="submit"
                          className=""
                          data-mdb-ripple="true"
                          data-mdb-ripple-color="light"
                        >
                          <div className="flex items-center justify-center">
                            ADD
                            <span className="ml-1 flex items-center">
                              <FiSend />
                            </span>
                          </div>
                        </Button>
                      </div>
                    </Form>
                  </div>
                )}
              </Formik>
              {/* <span>Already Have an Account ? <button className="bg-transparent text-orange-400 hover:cursor-pointer hover:text-orange-600 " onClick={redirectLogin} >Login</button> </span> */}
            </div>
          </div>
          {/* 
          <div className="flex items-center space-x-2 rounded-b border-t border-gray-200 p-6 dark:border-gray-600">
            <button
              data-modal-toggle="defaultModal"
              type="button"
              className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              I accept
            </button>
            <button
              data-modal-toggle="defaultModal"
              type="button"
              className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-600"
            >
              Decline
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default FeedsModal;
