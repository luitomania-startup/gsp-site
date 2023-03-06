import React, { useEffect, useLayoutEffect } from "react";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  useField,
  useFormikContext,
} from "formik";
import { FiSend } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import PasswordShowHide from "../shared/PasswordShowHide";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  fetchMembershipFormThunk,
  loading,
  selectMembershipForm,
} from "../../store/membershipForm/membershipFormSlice";
import { Editor } from "@tinymce/tinymce-react";
import { HashLoader } from "react-spinners";
import {
  getUploadMembershipFormSign,
  submitMembershipForm,
} from "../../services/membershipForm";
import { useCloudinaryVariableSetter } from "../../hooks/cloudinaryGenericSetter";
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
const CustomField = (props: any) => {
  const [field, meta, helpers] = useField(props);
  // console.log(props);
  const [secureUrl, publicId, , , upload, clearData] =
    useCloudinaryVariableSetter(
      "memberForm",
      "memberForm",
      getUploadMembershipFormSign,
      "memberForm"
    );
  const components: { [type: string]: JSX.Element } = {
    text: (
      <Field name={props.name} id={props.name} type={props.type}>
        {({ field: { value }, form: { setFieldValue } }: any) => (
          <div>
            <label htmlFor={props.name} className={styles.label}>
              {props.display}
              {props.validation.required ? (
                <span className={styles.errorMsg}>*</span>
              ) : (
                ""
              )}
            </label>
            <div>
              <input
                type={props.type}
                className={`${styles.field} ${
                  meta.touched && meta.error ? "is-invalid" : ""
                }`}
                placeholder={props.display}
                value={value}
                onChange={(event) =>
                  setFieldValue(props.name, event.target.value)
                }
              />
            </div>
            {meta.touched && meta.error ? (
              <span className={styles.errorMsg}>{meta.error}</span>
            ) : null}
          </div>
        )}
      </Field>
    ),
    name: (
      <Field name={props.name} id={props.name} type={props.type}>
        {({ field: { value }, form: { setFieldValue } }: any) => (
          <div>
            <label htmlFor={props.name} className={styles.label}>
              {props.display}
              {props.validation.required ? (
                <span className={styles.errorMsg}>*</span>
              ) : (
                ""
              )}
            </label>
            <div>
              <input
                type={props.type}
                className={`${styles.field} ${
                  meta.touched && meta.error ? "is-invalid" : ""
                }`}
                placeholder={props.display}
                value={value}
                onChange={(event) =>
                  setFieldValue(props.name, event.target.value)
                }
              />
            </div>
            {meta.touched && meta.error ? (
              <span className={styles.errorMsg}>{meta.error}</span>
            ) : null}
          </div>
        )}
      </Field>
    ),
    email: (
      <Field name={props.name} id={props.name} type={props.type}>
        {({ field: { value }, form: { setFieldValue } }: any) => (
          <div>
            <label htmlFor={props.name} className={styles.label}>
              {props.display}
              {props.validation.required ? (
                <span className={styles.errorMsg}>*</span>
              ) : (
                ""
              )}
            </label>
            <div>
              <input
                type={props.type}
                className={`${styles.field} ${
                  meta.touched && meta.error ? "is-invalid" : ""
                }`}
                placeholder={props.display}
                value={value}
                onChange={(event) =>
                  setFieldValue(props.name, event.target.value)
                }
              />
            </div>
            {meta.touched && meta.error ? (
              <span className={styles.errorMsg}>{meta.error}</span>
            ) : null}
          </div>
        )}
      </Field>
    ),
    editor: (
      <Field name={props.name} id={props.name} type={props.type}>
        {({ field: { value }, form: { setFieldValue } }: any) => (
          <div>
            <label htmlFor={props.name} className={styles.label}>
              {props.display}
              {props.validation.required ? (
                <span className={styles.errorMsg}>*</span>
              ) : (
                ""
              )}
            </label>
            <div>
              <Editor
                apiKey={import.meta.env.VITE_TINYMCE_APIKEY}
                initialValue=""
                init={{
                  content_style:
                    "body { font-family:abril,Arial,cursive; font-size:18px }",
                  draggable_modal: true,
                  height: 500,
                  menubar: "tools insert file edit  view format table help",
                  plugins: [
                    "post code",
                    "advlist",
                    "autolink",
                    "lists",
                    "link",
                    "post",
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
                    "link post | code ",
                }}
                onEditorChange={(newText: string) => {
                  setFieldValue(props.name, newText);
                }}
              />
            </div>
            {meta.touched && meta.error ? (
              <span className={styles.errorMsg}>{meta.error}</span>
            ) : null}
          </div>
        )}
      </Field>
    ),
    imageUrl: (
      <Field name={props.name} id={props.name} type={props.type}>
        {({ field: { value }, form: { setFieldValue } }: any) => (
          <div>
            <label htmlFor={props.name} className={styles.label}>
              {props.display}
              {props.validation.required ? (
                <span className={styles.errorMsg}>*</span>
              ) : (
                ""
              )}
            </label>

            <div>
              <input
                name={props.name}
                type="text"
                className={`h-10 ${styles.field} ${
                  meta.touched && meta.error ? "is-invalid" : ""
                }`}
                placeholder={props.display}
                value={value.secureUrl}
                disabled
              />
            </div>
            <button
              onClick={async (
                e: React.MouseEvent<HTMLButtonElement, MouseEvent>
              ) => {
                e.preventDefault();
                upload(setFieldValue, props.name);
              }}
              type="button"
              className="my-5 rounded-lg bg-green-600 px-5 py-3 text-left text-white shadow-md hover:bg-yellow-300 focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
            >
              UPLOAD
            </button>
            <a
              className={`${
                styles.label
              } w-full border-0 font-bold text-green-600 hover:text-yellow-500 ${
                meta.touched && meta.error ? "is-invalid" : ""
              }`}
              href={secureUrl}
            >
              {secureUrl !== "" ? (
                <>
                  <span className="text-black">Post uploaded at</span>{" "}
                  <span>{value.secureUrl}</span>{" "}
                </>
              ) : (
                ""
              )}
            </a>
            {meta.touched && meta.error ? (
              <span className={styles.errorMsg}>{meta.error}</span>
            ) : null}
          </div>
        )}
      </Field>
    ),
  };
  return (
    components[props.type] || (
      <div>Component of type {props.type} not configured</div>
    )
  );
};

const Register = () => {
  const navigate = useNavigate();
  const redirectLogin = () => {
    navigate("/login");
  };
  const dispatch = useAppDispatch();
  const membershipForm = useAppSelector(selectMembershipForm);
  useLayoutEffect(() => {
    dispatch(fetchMembershipFormThunk());
  }, []);
  const loadingForm = useAppSelector(loading);
  return (
    <>
      {["pending", "idle"].includes(loadingForm) ? (
        <div
          className="flex h-screen w-screen 
      items-center justify-center"
        >
          <HashLoader color="#fdf100" />
        </div>
      ) : (
        <div className="flex w-full items-center justify-center py-10">
          <div className="flex max-w-md flex-col justify-around  rounded-lg bg-white p-6 shadow-lg">
            <Formik
              initialValues={membershipForm.reduce((acc: any, e: any) => {
                acc[e!.name] = "";
                if (e.type === "imageUrl") acc[e!.name] = {};
                return acc;
              }, {})}
              validate={(values) => {
                const errors: any = {};
                const validateMF = (type: string) => {
                  const checks: {
                    [type: string]: (
                      validation: any,
                      value: string,
                      name: string
                    ) => { errorBool: Boolean; errorMessage: string };
                  } = {
                    name: (validation: any, value: string, name: string) => {
                      let errorBool = false;
                      let errorMessage = "";
                      if (validation.required && !value) {
                        errorBool = true;
                        errorMessage += `${name} is required. `;
                      }
                      if (!!validation.min && value.length < validation.min) {
                        errorBool = true;
                        errorMessage += ` Minimum ${validation.min} characters.`;
                      }
                      if (!!validation.max && value.length > validation.max) {
                        errorBool = true;
                        errorMessage += ` Maximum ${validation.max} characters.`;
                      }
                      return { errorBool, errorMessage };
                    },
                    text: (validation: any, value: string, name: string) => {
                      let errorBool = false;
                      let errorMessage = "";
                      if (validation.required && !value) {
                        errorBool = true;
                        errorMessage += `${name} is required. `;
                      }
                      if (!!validation.min && value.length < validation.min) {
                        errorBool = true;
                        errorMessage += ` Minimum ${validation.min} characters.`;
                      }
                      if (!!validation.max && value.length > validation.max) {
                        errorBool = true;
                        errorMessage += ` Maximum ${validation.max} characters.`;
                      }
                      return { errorBool, errorMessage };
                    },
                    email: (validation: any, value: string, name: string) => {
                      let errorBool = false;
                      let errorMessage = "";
                      if (validation.required && !value) {
                        errorBool = true;
                        errorMessage += `${name} is required. `;
                      }
                      if (
                        value &&
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
                          values.email
                        )
                      ) {
                        errorBool = true;
                        errorMessage += `${name} is an invalid ${type}. `;
                      }
                      return { errorBool, errorMessage };
                    },
                    editor: (validation: any, value: string, name: string) => {
                      let errorBool = false;
                      let errorMessage = "";
                      if (validation.required && !value) {
                        errorBool = true;
                        errorMessage += `${name} is required. `;
                      }
                      if (!!validation.min && value.length < validation.min) {
                        errorBool = true;
                        errorMessage += ` Minimum ${validation.min} characters.`;
                      }
                      if (!!validation.max && value.length > validation.max) {
                        errorBool = true;
                        errorMessage += ` Maximum ${validation.max} characters.`;
                      }
                      return { errorBool, errorMessage };
                    },
                    imageUrl: (
                      validation: any,
                      value: string,
                      name: string
                    ) => {
                      let errorBool = false;
                      let errorMessage = "";
                      if (validation.required && !value) {
                        errorBool = true;
                        errorMessage += `${name} is required. `;
                      }
                      return { errorBool, errorMessage };
                    },
                  };
                  return checks[type];
                };
                membershipForm.forEach((element: any) => {
                  const { errorBool, errorMessage } = validateMF(element.type)(
                    element.validation,
                    values[element.name],
                    element.display
                  );
                  if (errorBool) {
                    errors[element.name] = errorMessage;
                  }
                });
                // if (!values.fName) {
                //   errors.fName = "First Name is Required";
                // } else if (!/^[A-Za-z]{2,30}$/.test(values.fName)) {
                //   errors.fName =
                //     "First Name should not contain special characters or numbers.";
                // }

                // if (!values.lName) {
                //   errors.lName = "Last Name is Required";
                // } else if (!/^[A-Za-z]{2,30}$/.test(values.lName)) {
                //   errors.lName =
                //     "Last Name should not contain special characters or numbers.";
                // }

                // if (!values.email) {
                //   errors.email = "Email is Required";
                // } else if (
                //   !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
                //     values.email
                //   )
                // ) {
                //   errors.email = "Invalid email address";
                // }

                // if (!values.password) {
                //   errors.password = "Password is Required";
                //   // //// console.log(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!#%*?&]{8,}$/i.test(values.password))
                // } else if (
                //   !/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/i.test(
                //     values.password
                //   )
                // ) {
                //   errors.password =
                //     "Password should contain Minimum eight characters, at least one letter, one number and one special character among @$!%*?&#";
                // }

                // if (!values.confirmPassword) {
                //   errors.confirmPassword = "Confirm Password is Required";
                // } else if (
                //   values.confirmPassword &&
                //   values.confirmPassword != values.password
                // ) {
                //   errors.confirmPassword = "Passwords donot match";
                // }
                return errors;
              }}
              onSubmit={async (values, { setSubmitting, resetForm }) => {
                setSubmitting(false);
                console.log(values);
                await submitMembershipForm(values).then(() => {
                  navigate(`/`);
                });
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
                <div className="my-10 flex w-full justify-center">
                  <Form className=" form-training w-[300px] sm:w-[600px] lg:w-[800px]">
                    {membershipForm.map((e: any) => (
                      <div className="form-group row py-sm-1 px-sm-3">
                        <CustomField {...e} />
                      </div>
                    ))}
                    {/* <div className="form-group row py-sm-1 px-sm-3">
                  <label className={styles.label} htmlFor="fName">
                    First Name
                    {errors.fName ? (
                      <span className={styles.errorMsg}>*</span>
                    ) : (
                      ""
                    )}
                  </label>
                  <Field
                    className={`${styles.field} ${
                      touched.fName && errors.fName ? "is-invalid" : ""
                    }`}
                    type="text"
                    name="fName"
                    placeholder="First Name"
                  />
                  <ErrorMessage
                    name="fName"
                    component="span"
                    className={styles.errorMsg}
                  />
                </div>
                <div className="form-group row py-sm-1 px-sm-3">
                  <label className={styles.label} htmlFor="lName">
                    Last Name
                    {errors.lName ? (
                      <span className={styles.errorMsg}>*</span>
                    ) : (
                      ""
                    )}
                  </label>
                  <Field
                    className={`${styles.field} ${
                      touched.lName && errors.lName ? "is-invalid" : ""
                    }`}
                    type="text"
                    name="lName"
                    placeholder="Last Name"
                  />
                  <ErrorMessage
                    name="lName"
                    component="span"
                    className={styles.errorMsg}
                  />
                </div>
                <div className="form-group row py-sm-2 px-sm-3">
                  <label className={styles.label} htmlFor="email">
                    Email
                    {errors.email ? (
                      <span className={styles.errorMsg}>*</span>
                    ) : (
                      ""
                    )}
                  </label>
                  <Field
                    className={`${styles.field} ${
                      touched.email && errors.email ? "is-invalid" : ""
                    }`}
                    type="text"
                    name="email"
                    placeholder="Email"
                  />

                  <ErrorMessage
                    name="email"
                    component="div"
                    className={styles.errorMsg}
                  />
                </div>
                <div className="form-group row py-sm-2 px-sm-3">
                  <label className={styles.label} htmlFor="password">
                    Password
                    {errors.password ? (
                      <span className={styles.errorMsg}>*</span>
                    ) : (
                      ""
                    )}
                  </label>
                  <Field
                    className={`${styles.field} ${
                      touched.password && errors.password ? "is-invalid" : ""
                    } `}
                    name="password"
                    type="text"
                    placeholder="Enter a Password"
                  />

                  <ErrorMessage
                    name="password"
                    component="div"
                    className={styles.errorMsg}
                  />
                </div>

                {touched.password ? (
                  <div className="form-group row py-sm-2 px-sm-3">
                    <label className={styles.label} htmlFor="confirmPassword">
                      Confirm Password{" "}
                      {errors.confirmPassword ? (
                        <span className={styles.errorMsg}>*</span>
                      ) : (
                        ""
                      )}
                    </label>
                    <Field
                      className={`${styles.field} ${
                        touched.confirmPassword && errors.confirmPassword
                          ? "is-invalid"
                          : ""
                      } `}
                      component={PasswordShowHide}
                      name="confirmPassword"
                      placeholder="Enter a Password"
                    />

                    <ErrorMessage
                      name="confirmPassword"
                      component="div"
                      className={styles.errorMsg}
                    />
                  </div>
                ) : (
                  ""
                )} */}

                    <div className=" flex flex-wrap items-center justify-center rounded-b-md border-t border-gray-200 p-4">
                      <button
                        type="submit"
                        className="ml-1
                  rounded
                  bg-gradient-to-r
                  from-[#2dbd6e]
                  to-[#a6f77b]
                  px-6
                  py-2.5
                  text-xs
                  font-medium
                  uppercase
                  leading-tight
                  text-white
                  shadow-md transition
                  duration-150 ease-in-out hover:bg-orange-600 hover:shadow-lg
                  focus:bg-orange-600 focus:shadow-lg
                  focus:outline-none
                  focus:ring-0
                  active:bg-orange-700
                  active:shadow-lg"
                        disabled={isSubmitting}
                        style={{
                          color: "white",
                        }}
                        data-mdb-ripple="true"
                        data-mdb-ripple-color="light"
                      >
                        <div className="flex gap-2">
                          REGISTER <FiSend />
                        </div>
                      </button>
                    </div>
                  </Form>
                </div>
              )}
            </Formik>
            {/* <div>
              <span className="mr-2">Already Have an Account ?</span>
              <button
                className="bg-transparent text-[1.5rem] text-[#83d657] hover:cursor-pointer hover:text-[#3ca006] "
                onClick={redirectLogin}
              >
                Login
              </button>
            </div> */}
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
