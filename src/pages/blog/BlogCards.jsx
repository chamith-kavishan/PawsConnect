import { PrimaryButton } from "../../components/global/PrimaryButton";
import { recentBlogsCard } from "../../utils/dataArrays";

export const BlogCards = () => {
  return (
    <section className="w-full px-[16%] pb-20 pt-16 font-poppins">
      <div className="pb-10 text-left text-[36px] font-medium text-black">
        Recent Blogs
      </div>
      <div className="flex w-full flex-wrap justify-between gap-5">
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
    </section>
  );
};

export const RecentBlogsCard = ({ image, category, title, date }) => {
  return (
    <div className="mb-8 flex w-[300px] flex-col items-center gap-8 font-poppins">
      <div className="w-full">
        <img src={image} className="w-full rounded-[12px] object-cover" />
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
