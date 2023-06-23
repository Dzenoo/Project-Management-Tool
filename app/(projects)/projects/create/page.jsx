"use client";

import NewProjectForm from "@/components/projects/create/NewProjectForm";
import { useHttpPost } from "@/hooks/Http/useHttpPost";
import { Container } from "@mui/material";
import { ClipLoader } from "react-spinners";
import { useRouter } from "next/navigation";

const AddNewProject = () => {
  const { sendPostRequest, isLoading } = useHttpPost();
  const router = useRouter();

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
