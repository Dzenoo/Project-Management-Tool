"use client";

import LoginForm from "@/components/Auth/LoginForm";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useHttpPost } from "@/hooks/Http/useHttpPost";
import { ClipLoader } from "react-spinners";

const Login = () => {
  const { sendPostRequest, isLoading, error } = useHttpPost();

  const submitLogin = async (enteredData) => {
    await sendPostRequest("", "", enteredData);
  };

  if (isLoading) {
    return (
      <div className="loader_wrapper">
        <ClipLoader />
      </div>
    );
  }

  if (error) {
    toast.error(error);
  }

  return (
    <>
      <ToastContainer />
      <LoginForm submitLoginHandler={submitLogin} />;
    </>
  );
};

export default Login;
