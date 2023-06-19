"use client";

import NewProjectForm from "@/components/projects/create/NewProjectForm";
import { Container } from "@mui/material";

const AddNewProject = () => {
  const submitCreateProject = (enteredData) => {
    console.log(enteredData);
  };

  return (
    <Container maxWidth="sm" sx={{ padding: "20px" }}>
      <NewProjectForm submitCreateProject={submitCreateProject} />
    </Container>
  );
};

export default AddNewProject;
