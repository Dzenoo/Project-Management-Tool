"use client";

import NewProjectForm from "@/components/projects/create/NewProjectForm";
import { Container } from "@mui/material";

const AddNewProject = () => {
  return (
    <Container maxWidth="sm" sx={{ padding: "20px" }}>
      <NewProjectForm />
    </Container>
  );
};

export default AddNewProject;
