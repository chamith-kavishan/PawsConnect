import { PrimaryButton } from "../../components/global/PrimaryButton";
import { recentBlogsCard } from "../../utils/dataArrays";

export const RecentBlogs = () => {
  return (
    <section className="w-full px-[10%] pb-20 pt-16 font-poppins">
      <div className="pb-10 text-left text-[36px] font-medium text-black">
        Recent Blogs
      </div>
      <div className="flex flex-wrap">
        {recentBlogsCard.map((card) => {
          return (
            <RecentBlogsCard
              image={card.image}
              category={card.category}
              title={card.title}
              date={card.date}
            />
          );
        })}
      </div>
      <div className="mt-5">
        <PrimaryButton text="More Blogs" />
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
          <div className="rounded-[5px] bg-black px-2 py-1 text-white">
            {category}
          </div>
          <span className="text-[14px] text-[#02aee0]">{date}</span>
        </div>
        <div className="mt-4 text-[20px]">{title}</div>
      </div>
    </div>
  );
};
