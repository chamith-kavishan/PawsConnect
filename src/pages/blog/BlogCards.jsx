import { useState, useEffect } from "react";
import { recentBlogsCard } from "../../utils/dataArrays";
import axiosClient from "../../../axios-client";
import { Link } from "react-router-dom";

export const BlogCards = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = () => {
      axiosClient
        .get(`/blog/`)
        .then((res) => {
          setBlogs(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchBlogs();
  }, []);

  const formatDate = (dateString) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const date = new Date(dateString);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  };

  return (
    <section className="w-full px-[16%] pb-20 pt-16 font-poppins">
      <div className="pb-10 text-left text-[36px] font-medium text-black">
        Blogs
      </div>
      <div className="flex w-full flex-wrap justify-between gap-5">
        {blogs.map((card) => {
          return (
            <RecentBlogsCard
              image={card.profileImageURL}
              category={card.category}
              title={card.Title}
              date={formatDate(card.Date_Time)}
              id={card.idBlog}
            />
          );
        })}
      </div>
    </section>
  );
};

export const RecentBlogsCard = ({ image, id, title, date }) => {
  return (
    <div className="mb-8 flex w-[300px] flex-col items-center gap-8 font-poppins">
      <Link className="w-full" to={`/blog/${id}`}>
        <img src={image} className="w-full rounded-[12px] object-cover" />
      </Link>
      <div className="flex w-full flex-col">
        <div className="flex items-center gap-5">
          {/* <div className="rounded-[5px] bg-black px-2 py-1 text-white">
            {category}
          </div> */}
          <span className="text-[14px] text-[#02aee0]">{date}</span>
        </div>
        <Link className="mt-4 text-[20px]" to={`/blog/${id}`}>
          {title}
        </Link>
      </div>
    </div>
  );
};
