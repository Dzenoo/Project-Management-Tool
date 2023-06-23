"use client";

import LoginForm from "@/components/auth/LoginForm.jsx";
import { useHttpPost } from "@/hooks/Http/useHttpPost";
import { ClipLoader } from "react-spinners";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/Auth/useAuth";
import { useEffect } from "react";

const Login = () => {
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

  const submitLogin = async (enteredData) => {
    const response = await sendPostRequest(
      "/api/auth/login",
      "POST",
      enteredData,
    );

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

  return <LoginForm submitLoginHandler={submitLogin} />;
};

export default Login;
