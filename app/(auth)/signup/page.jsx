"use client";

import SignupForm from "@/components/auth/SignupForm";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useHttpPost } from "@/hooks/Http/useHttpPost";
import { ClipLoader } from "react-spinners";
import { useAuth } from "@/hooks/Auth/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Signup = () => {
  const { login } = useAuth();
  const { sendPostRequest, isLoading, error } = useHttpPost();
  const router = useRouter();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user?.token) {
      router.replace("/");
    }
  }, []);

  const submitSignup = async (enteredData) => {
    const response = await sendPostRequest(
      "/api/auth/signup",
      "POST",
      enteredData
    );
    console.log(response);

    if (response.ok) {
      login(response.token);
      router.push("/");
    }
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
      <SignupForm submitSignupHandler={submitSignup} />;
    </>
  );
};

export default Signup;
