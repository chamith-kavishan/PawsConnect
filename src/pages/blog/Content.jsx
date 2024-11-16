import React from "react";

export const Content = ({ blog }) => {
  return (
    <section className="px-[16%] py-20 font-poppins">{blog.Content}</section>
  );
};
