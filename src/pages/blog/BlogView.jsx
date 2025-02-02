import React, { useState, useEffect } from "react";
import { Nav } from "../../components/layouts/Nav";
import { BlogViewHero } from "./BlogViewHero";
import { Footer } from "../../components/layouts/Footer";
import { RecentBlogs } from "./RecentBlogs";
import { Content } from "./Content";
import { useParams } from "react-router-dom";
import axiosClient from "../../../axios-client";

export const BlogView = () => {
  const { id } = useParams();

  const [blog, setBlog] = useState([]);

  useEffect(() => {
    const fetchBlog = () => {
      axiosClient
        .get(`/blog/single/${id}`)
        .then((res) => {
          setBlog(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchBlog();
  }, []);

  return (
    <div>
      <Nav />
      <BlogViewHero blog={blog} />
      <Content blog={blog} />
      <RecentBlogs />
      <Footer />
    </div>
  );
};
