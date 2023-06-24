"use client";

const layout = ({ children }) => {
  return (
    <div className="main_layout">
      <div className="content">{children}</div>
    </div>
  );
};
export default layout;
