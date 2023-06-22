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
  const { sendPostRequest, isLoading } = useHttpPost();
  const router = useRouter();
  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : null;

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

    if (response.token) {
      login(response.token);
      localStorage.setItem("User", JSON.stringify({ userId: response.userId }));
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

  return (
    <>
      <ToastContainer />
      <SignupForm submitSignupHandler={submitSignup} />;
    </>
  );
};

export default Signup;
