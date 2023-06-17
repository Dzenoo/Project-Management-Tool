"use client";

import SignupForm from "@/components/auth/SignupForm";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useHttpPost } from "@/hooks/Http/useHttpPost";
import { ClipLoader } from "react-spinners";

const Signup = () => {
  const { sendPostRequest, isLoading, error } = useHttpPost();

  const submitSignup = async (enteredData) => {
    await sendPostRequest("/api/auth/signup", "POST", enteredData);
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
    console.log(error);
  }

  return (
    <>
      <ToastContainer />
      <SignupForm submitSignupHandler={submitSignup} />;
    </>
  );
};

export default Signup;
