"use client";

import LoginForm from "@/components/auth/LoginForm";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useHttpPost } from "@/hooks/Http/useHttpPost";
import { ClipLoader } from "react-spinners";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/Auth/useAuth";
import { useEffect } from "react";

const Login = () => {
  const { login } = useAuth();
  const { sendPostRequest, isLoading, error } = useHttpPost();
  const router = useRouter();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user?.token) {
      router.replace("/");
    }
  }, []);

  const submitLogin = async (enteredData) => {
    const response = await sendPostRequest(
      "/api/auth/login",
      "POST",
      enteredData
    );
    console.log(response);

    login(response.token);
    router.push("/");
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
      <LoginForm submitLoginHandler={submitLogin} />
    </>
  );
};

export default Login;
