import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/images/logo.png";
import { useLoginMutation } from "../features/auth/authApi";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [login, { data, isLoading, error }] = useLoginMutation();
  const naviagate = useNavigate();

  useEffect(() => {
    if (error?.data) {
      setLoginError(error.data);
    }
    if (data?.acesToken && data?.user) {
      naviagate("/teams");
    }
  }, [error, naviagate, data]);

  // login handler
  const handleLogin = (e) => {
    e.preventDefault();
    login({
      email,
      password,
    });
  };

  return (
    <div className="grid place-items-center h-screen bg-[#F9FAFB">
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src={Logo}
              alt="Learn with sumit"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
            <p className="text-red-500">{error && loginError}</p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
        <div className="p-10 mx-10 bg-gray-100 rounded-md text-gray-700 ">
          <h4 className="text-emerald-400 text-4xl font-bold text-center my-5">Login</h4>
          <ul>
            <h5 className=" p-2 bg-gray-100">Email</h5>
            <li className="m-2 text-center bg-orange-200 p-2 px-4 rounded-md">ashab@gmail.com</li>
            <li className="m-2 text-center bg-orange-200 p-2 px-4 rounded-md">mokit@gmail.com</li>
            <li className="m-2 text-center bg-orange-200 p-2 px-4 rounded-md">saed@gmail.com</li>
            <li className="m-2 text-center bg-orange-200 p-2 px-4 rounded-md">zahir@gmail.com</li>
            <h4 className="bg-gray-100 ">Password</h4>
            <li className="m-2 bg-red-200 p-2 px-4 rounded-md text-center">12345</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Login;
