import React, { useLayoutEffect, useRef } from "react";
import blogicon from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import { selectDarkMode } from "../../store/globals/globalsSlice";

const Login = () => {
  const darkMode = useAppSelector(selectDarkMode);
  const navigate = useNavigate();
  const navigateRegister = () => {
    navigate("/register");
  };
  const spanRef = useRef<HTMLSpanElement>(null);

  const onSubmitHandler = (event: any) => {
    // HTMLElement is superset of HTMLELement
    event.preventDefault();

  };
  return (

    <div className={`${darkMode?"dark":""}`}>
    <section className={`dark:bg-gradient-login  h-screen w-full shadow-2xl shadow-teal-300`}>
      <div className="mx-auto container py-12 px-6 h-full w-full">
        <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800 ">
          <div className="xl:w-10/12">
            <div className="block bg-white shadow-lg rounded-lg dark:shadow-lg dark:shadow-[#ffee00c7] dark:backdrop-blur-lg">
              <div className="flex flex-wrap justify-center flex-row g-0">
                <div
                  className="lg:w-6/12 flex items-center lg:rounded-r-lg rounded-b-lg lg:rounded-bl-none"
                  style={{
                    background:
                      "linear-gradient(to right, #2dbd6e, #a6f77b);",
                  }}
                >
                  <div className="w-full text-white px-4 py-6 md:p-12 md:mx-6">
                    <div className="text-center my-5">
                      <img className="mx-auto w-48" src={blogicon} alt="logo" />
                    </div>
                    <h4 className="text-xl text-center font-semibold mb-6 text-red-300">
                      GANA SURAKSHA PARTY
                    </h4>
                    <p className="text-center text-sm text-slate-700">
                      A Party for the Protection of the Masses
                    </p>
                  </div>
                </div>
                <div className="lg:w-6/12 px-4 md:px-0">
                  <div className="md:p-12 md:mx-6">
                    <form onSubmit={(e) => onSubmitHandler(e)}>
                      <p className="my-4">Please login to your account</p>
                      <div className="mb-4">
                        <input
                          type="text"
                          className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          id="email"
                          placeholder="Email"
                          name="email"
                          onChange={() => {
                            if (null !== spanRef.current) {
                              spanRef.current.classList.add("hidden");
                            }
                          }}
                        />
                      </div>
                      <div className="mb-4">
                        <input
                          type="password"
                          className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          id="password"
                          placeholder="Password"
                          name="password"
                          onChange={() => {
                            if (null !== spanRef.current) {
                              spanRef.current.classList.add("hidden");
                            }
                          }}
                        />
                      </div>
                      <div className="flex flex-col text-center pt-1 mb-12 pb-1">
                        <button
                          className=" hover:opacity-80 inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg  focus:outline-none  active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                          type="submit"
                          data-mdb-ripple="true"
                          data-mdb-ripple-color="light"
                          style={{
                            background:
                              "linear-gradient(to right,#2dbd6e, #a6f77b)",
                          }}
                        >
                          Log in
                        </button>
                        <span
                          className="hidden text-red-500 font-bold text-sm"
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
                          className="inline-block px-6 py-2 border-2 border-[#a6f77b] text-[#37810f] font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none  transition duration-150 ease-in-out"
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

export default Login;
