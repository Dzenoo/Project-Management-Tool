"use client";

import NewProjectForm from "@/components/projects/create/NewProjectForm";
import { AppContext } from "@/context/AppContext";
import { useHttpPost } from "@/hooks/Http/useHttpPost";
import { Container } from "@mui/material";
import { useContext, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { useRouter } from "next/navigation";

const AddNewProject = () => {
  const { sendPostRequest, isLoading } = useHttpPost();
  const { isLoggedIn } = useContext(AppContext);
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/login");
    }
  }, []);

  const submitCreateProject = async (enteredData) => {
    try {
      await sendPostRequest("/api/projects/create", "POST", enteredData);
      router.push("/projects");
    } catch (error) {
      console.log(error);
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
    <Container maxWidth="sm" sx={{ padding: "20px" }}>
      <NewProjectForm submitCreateProject={submitCreateProject} />
    </Container>
  );
};

export default AddNewProject;
