"use client";
import ProjectSidebar from "@/components/projects/ProjectSidebar";

const layout = ({ children }) => {
  return (
    <div className="main_layout">
      <ProjectSidebar />
      <div className="content">{children}</div>
    </div>
  );
};
export default layout;
