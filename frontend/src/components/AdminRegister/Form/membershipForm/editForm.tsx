import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FiSend } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../store";
const styles = {
  label: "block text-gray-700 text-sm font-bold pt-2 pb-1",
  field:
    "bg-gray-100 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none focus:bg-gray-200",
  select:
    "bg-gray-100 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none focus:bg-gray-200",
  val: "bg-gray-100 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4  w-full appearance-none focus:bg-gray-200",
  button:
    " bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600",
  errorMsg: "text-red-500 text-sm",
  textarea:
    "bg-gray-100 w-[300px] sm:w-[600px] lg:w-[800px] focus:shadow-outline rounded block w-full appearance-none focus:bg-gray-200 p-5",
};
import UpIcon from "../../../../assets/icons8-up-arrows-64.png";
import DownIcon from "../../../../assets/icons8-down-arrow-64.png";
import DeleteIcon from "../../../../assets/icons8-remove-96.png";

import { MembershipForm } from "../../../../types/types";
import { getUploadMembershipFormSign } from "../../../../services/membershipForm";
import membershipFormSlice, {
  editMembershipFormThunk,
  fetchMembershipFormThunk,
  loading,
  selectMembershipForm,
  toggleEditMembershipFormModal,
} from "../../../../store/membershipForm/membershipFormSlice";
import { Editor } from "@tinymce/tinymce-react";
import { useCloudinaryGenericSetter } from "../../../../hooks/cloudinaryGenericSetter";
const EditFormModal = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const redirectLogin = () => {
    navigate("/login");
  };
  const loadingState = useAppSelector(loading);
  const initialMembershipForm = useAppSelector(selectMembershipForm);
  useEffect(() => {
    dispatch(fetchMembershipFormThunk());
  }, []);
  // useEffect(() => {
  //   setTimeout(() => {
  //     if(initialMembershipForm._id === ""){
  //       dispatch(toggleEditMembershipFormModal());
  //     }
  //   }, 1000)
  // }, [])

  // console.log("URL", secureUrl, publicId)
  // const formInitialValues = {
  //   _id: initialMembershipForm._id,
  //   description: initialMembershipForm.description,
  //   membershipFormImagePublicId: initialMembershipForm.membershipFormImagePublicId,
  //   membershipFormImageUrl: initialMembershipForm.membershipFormImageUrl,
  //   title: initialMembershipForm.title,
  // } as MembershipForm;
  // // console.log("VITE CLOUD NAME: " + import.meta.env.VITE_CLOUD_NAME);
  // // console.log("VITE CLOUD API KEY: " + import.meta.env.VITE_CLOUD_API_KEY);
  const options: {
    name: string;
    value: string;
  }[] = [
    { name: "Text", value: "text" },
    { name: "Name", value: "name" },
    { name: "Email", value: "email" },
    { name: "Image", value: "imageUrl" },
    { name: "Editor", value: "editor" },
  ];
  const typeDisplay: { [type: string]: string } = {
    text: "Text",
    name: "Name",
    email: "Email",
    imageUrl: "Image",
    editor: "Editor",
  };
  console.log(initialMembershipForm);

  return (
    <>
      {!["idle", "pending"].includes(loadingState) ? (
        <Formik
          initialValues={{
            fields: initialMembershipForm,
            selected: "text",
          }}
          validate={(values) => {
            const errors: any = {};
            if (values.fields.length === 0) {
              errors.fields = "Form should not be empty";
            }
            if (
              JSON.stringify(values.fields) ===
              JSON.stringify(initialMembershipForm)
            ) {
              errors.fields = "Form has not been edited";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            // setSubmitting(false);
            const formData: MembershipForm = { fields: values.fields };
            // console.log("REQUIRED DATA: ", formData);
            dispatch(editMembershipFormThunk(formData))
              .unwrap()
              .then(() => {
                alert("successfully added");
              })
              .catch((err: Error) => {
                alert(
                  `Unsuccessful:  ${err.message ? err.message : ""}${
                    err ? err : ""
                  }`
                );
              });
            // resetForm();
            // dispatch(toggleEditMembershipFormModal());
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
            <div className=" my-10 flex w-full px-4">
              <Form className=" form-training w-full sm:w-[400px] lg:w-[600px] ">
                {values.fields.map((e: any, idx: number) => {
                  return (
                    <div className="form-group row px-sm-3" key={idx}>
                      <div className="flex flex-row items-center justify-between">
                        <div className="font-sans text-xl font-bold">
                          Field {idx + 1}
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="pl-5 font-normal">
                            {values.fields[idx].name}
                          </span>
                          {idx === 0 ? (
                            <></>
                          ) : (
                            <button
                            title="Press to push the field up by one"
                              onClick={(e) => {
                                e.preventDefault();
                                setFieldValue("fields", [
                                  ...values.fields.slice(0, idx-1),
                                  values.fields[idx],
                                  values.fields[idx-1],
                                  ...values.fields.slice(idx+1),
                                ]);
                              }}
                            >
                              <img
                                src={UpIcon}
                                alt="Up"
                                className="h-12 w-12"
                              />
                            </button>
                          )}
                          {idx === values.fields.length - 1 ? (
                            <></>
                          ) : (
                            <button
                            title="Press to push the field down by one"
                              onClick={(e) => {
                                e.preventDefault();
                                setFieldValue("fields", [
                                  ...values.fields.slice(0, idx),
                                  values.fields[idx+1],
                                  values.fields[idx],
                                  ...values.fields.slice(idx+2),
                                ]);
                              }}
                            >
                              <img
                                src={DownIcon}
                                alt="Down"
                                className="h-12 w-12"
                              />
                            </button>
                          )}
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              setFieldValue("fields", [
                                ...values.fields.slice(0, idx),
                                ...values.fields.slice(idx + 1),
                              ]);
                            }}
                          >
                            <img
                              src={DeleteIcon}
                              alt="Delete"
                              className="h-12 w-12"
                            />
                          </button>
                        </div>
                      </div>
                      {/* {JSON.stringify(e)} */}
                      <label
                        htmlFor={`fields[${idx}].name`}
                        title="When you change the type of an existing field, unexpected results occur in the Submissions table which are hard account for entirely in code. So clear the database before doing so."
                      >
                        Type of Field
                      </label>
                      <Field
                        as="select"
                        className={`${styles.select}`}
                        value={e.type}
                        name={`fields[${idx}].type`}
                      >
                        {options.map((option) => (
                          <option value={option.value}>{option.name}</option>
                        ))}
                      </Field>
                      <label
                        htmlFor={`fields[${idx}].display`}
                        title="How the label of the field looks on the form"
                      >
                        Display Name on Form
                      </label>
                      <Field
                        type="text"
                        className={`${styles.field}`}
                        value={e.display}
                        name={`fields[${idx}].display`}
                        required
                      />
                      <label
                        htmlFor={`fields[${idx}].name`}
                        title="How it is stored in the server"
                      >
                        Field Name
                      </label>
                      <Field
                        type="text"
                        className={`${styles.field}`}
                        value={e.name}
                        name={`fields[${idx}].name`}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setFieldValue(
                            `fields[${idx}].name`,
                            e.target.value.trim().replace(" ", "")
                          )
                        }
                        required
                      />
                      <div className="w-full py-3">
                        <Field
                          className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                          name={`fields[${idx}].validation.required`}
                          type="checkbox"
                        />
                        <label
                          className="text-md pl-2 font-bold text-gray-700 "
                          htmlFor={`fields[${idx}].validation.required`}
                        >
                          Required
                        </label>
                      </div>
                      <label htmlFor={`fields[${idx}].validation.min`}>
                        Min
                      </label>
                      <Field
                        type="number"
                        min="1"
                        className={`${styles.select} w-[70%] lg:w-[80%]`}
                        name={`fields[${idx}].validation.min`}
                      />
                      <label htmlFor={`fields[${idx}].validation.max`}>
                        Max
                      </label>
                      <Field
                        type="number"
                        min="1"
                        className={`${styles.select} w-[70%] lg:w-[80%]`}
                        name={`fields[${idx}].validation.max`}
                      />
                      <hr className="my-5 border-dotted border-black" />
                    </div>
                  );
                })}
                <div className="form-group row py-sm-1 px-sm-3 ">
                  <Field
                    as="select"
                    name="selected"
                    className={`${styles.select} w-[70%] gap-5 lg:w-[80%]`}
                  >
                    {options.map((option) => (
                      <option value={option.value}>{option.name}</option>
                    ))}
                  </Field>
                  <button
                    className=" right-0 rounded-lg bg-green-600 p-5 py-3 text-left text-white shadow-md hover:bg-yellow-300 focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
                    onClick={() =>
                      setFieldValue("fields", [
                        ...values.fields,
                        {
                          name: "",
                          display: "",
                          type: values.selected,
                          validation: { required: false, min: "", max: "" },
                        },
                      ])
                    }
                  >
                    <div className="flex items-center justify-center">
                      ADD FIELD
                    </div>
                  </button>
                </div>

                <div className=" flex flex-wrap items-center justify-center rounded-b-md border-t border-gray-200 py-4">
                  <button
                    type="submit"
                    className="w-full  rounded-lg bg-green-600 py-3 text-left text-white shadow-md hover:bg-yellow-300 focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light"
                  >
                    <div className="flex items-center justify-center">
                      EDIT
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
      ) : null}
    </>
  );
};

export default EditFormModal;
