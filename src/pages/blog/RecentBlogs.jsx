import { useState, useEffect } from "react";
import { PrimaryButton } from "../../components/global/PrimaryButton";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../../axios-client";

export const RecentBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  const navigate = useNavigate();

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

  const handleNavigateBlogs = () => {
    navigate("/blogs");
  };

  return (
    <section className="w-full px-[10%] pb-20 pt-16 font-poppins">
      <div className="pb-10 text-left text-[36px] font-medium text-black">
        Recent Blogs
      </div>
      <div className="flex flex-wrap">
        {blogs.slice(0, 4).map((card) => {
          return (
            <RecentBlogsCard
              image={card.profileImageURL}
              category={card.category}
              title={card.Title}
              date={formatDate(card.Date_Time)}
            />
          );
        })}
      </div>
      <div className="mt-5">
        <PrimaryButton text="More Blogs" onClick={handleNavigateBlogs} />
      </div>
    </section>
  );
};

export const RecentBlogsCard = ({ image, category, title, date }) => {
  return (
    <div className="mb-8 flex w-full items-center gap-8 font-poppins md:w-[50%]">
      <div className="w-[30%]">
        <img src={image} className="w-full" />
      </div>
      <div className="flex w-full flex-col">
        <div className="flex items-center gap-5">
          <span className="text-[14px] text-[#02aee0]">{date}</span>
        </div>
        <div className="mt-4 text-[20px]">{title}</div>
      </div>
    </div>
  );
};
