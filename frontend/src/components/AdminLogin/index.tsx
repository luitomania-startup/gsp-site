import React, { useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import blogicon from "../../assets/logo.png";
import { useAppDispatch, useAppSelector } from "../../store";
import { loginAdminThunk, selectVerified } from "../../store/admin/adminSlice";
import { selectDarkMode } from "../../store/globals/globalsSlice";

const AdminLogin = () => {
  const darkMode = useAppSelector(selectDarkMode);
  const navigate = useNavigate();
  const navigateRegister = () => {
    navigate("/register");
  };
  const spanRef = useRef<HTMLSpanElement>(null);
  const dispatch = useAppDispatch();
  const [inputVal, setInputVal] = useState({});
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputVal({ ...inputVal, [event.target.name]: event.target.value });
  };
  const verified = useAppSelector(selectVerified);
  const [navRdtLogin, setNavRdtLogin] = useState(false);
  const onSubmitHandler = (event: any) => {
    // HTMLElement is superset of HTMLELement
    event.preventDefault();
    dispatch(loginAdminThunk(inputVal))
      .unwrap()
      .then(() => {
        setNavRdtLogin(true);
      });
  };
  return (
    <div className={`${darkMode?"dark":""}`}>
      {navRdtLogin && verified ? <Navigate to="/admin" /> : null}
      <section className=" dark:bg-gradient-login h-screen w-full shadow-2xl shadow-teal-300">
        <div className="container mx-auto h-full w-full py-12 px-6">
          <div className="g-6 flex h-full flex-wrap items-center justify-center text-gray-800">
            <div className="xl:w-10/12">
              <div className="block rounded-lg bg-white shadow-lg">
                <div className="g-0 flex flex-row flex-wrap justify-center">
                  <div
                    className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none"
                    style={{
                      background:
                        "linear-gradient(to right, #2dbd6e, #a6f77b);",
                    }}
                  >
                    <div className="w-full px-4 py-6 text-white md:mx-6 md:p-12">
                      <div className="my-5 text-center">
                        <img
                          className="mx-auto w-48"
                          src={blogicon}
                          alt="logo"
                        />
                      </div>
                      <h4 className="mb-6 text-center text-xl font-semibold text-red-300">
                        GANA SURAKSHA PARTY
                      </h4>
                      <p className="text-center text-sm text-slate-700">
                        A Party for the Protection of the Masses
                      </p>
                    </div>
                  </div>
                  <div className="px-4 md:px-0 lg:w-6/12">
                    <div className="md:mx-6 md:p-12">
                      <form onSubmit={(e) => onSubmitHandler(e)}>
                        <p className="my-4">Please login to your account</p>
                        <div className="mb-4">
                          <input
                            type="text"
                            className="form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
                            id="name"
                            placeholder="Name"
                            name="name"
                            onChange={(e) => {
                              if (null !== spanRef.current) {
                                spanRef.current.classList.add("hidden");
                              }
                              handleChange(e);
                            }}
                          />
                        </div>
                        <div className="mb-4">
                          <input
                            type="text"
                            className="form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
                            id="email"
                            placeholder="Email"
                            name="email"
                            onChange={(e) => {
                              if (null !== spanRef.current) {
                                spanRef.current.classList.add("hidden");
                              }
                              handleChange(e);
                            }}
                          />
                        </div>
                        <div className="mb-4">
                          <input
                            type="password"
                            className="form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
                            id="password"
                            placeholder="Password"
                            name="password"
                            onChange={(e) => {
                              if (null !== spanRef.current) {
                                spanRef.current.classList.add("hidden");
                              }
                              handleChange(e);
                            }}
                          />
                        </div>
                        <div className="mb-12 flex flex-col pt-1 pb-1 text-center">
                          <button
                            className=" mb-3 inline-block w-full rounded px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition  duration-150  ease-in-out hover:bg-blue-700 hover:opacity-80 hover:shadow-lg focus:outline-none active:shadow-lg"
                            type="submit"
                            data-mdb-ripple="true"
                            data-mdb-ripple-color="light"
                            style={{
                              background:
                                "linear-gradient(to right, #2dbd6e,  #a6f77b)",
                            }}
                          >
                            Log in
                          </button>
                          <span
                            className="hidden text-sm font-bold text-red-500"
                            ref={spanRef}
                          >
                            Invalid credentials
                          </span>

                          <a className="text-gray-500" href="#!">
                            Forgot password?
                          </a>
                        </div>
                        <div className="flex items-center justify-between pb-6">
                          <p className="mb-0 mr-2">Don't have an account?</p>
                          <button
                            type="button"
                            className="inline-block rounded border-2 border-[#a6f77b] px-6 py-2 text-xs font-medium uppercase leading-tight text-[#37810f] transition duration-150 ease-in-out  hover:bg-black hover:bg-opacity-5 focus:outline-none"
                            data-mdb-ripple="true"
                            data-mdb-ripple-color="light"
                            onClick={navigateRegister}
                          >
                            Register
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminLogin;
