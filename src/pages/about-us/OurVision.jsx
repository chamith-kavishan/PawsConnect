import { visions } from "../../utils/dataArrays";

export const OurVision = () => {
  return (
    <section className="my-16 px-[16%] font-poppins">
      <div>
        <div className="my-10 px-[10%] text-center text-[36px] font-medium">
          Our vision is a world where every street animal is safe, cared for,
          and loved.
        </div>
        <div className="flex flex-wrap items-stretch justify-between px-[5%]">
          {visions.map((vision) => {
            return (
              <VisionCard
                key={vision.title}
                image={vision.image}
                title={vision.title}
                description={vision.description}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export const VisionCard = ({ image, title, description }) => {
  return (
    <div className="flex w-[200px] flex-col items-center gap-3 font-poppins">
      <img src={image} className="w-full rounded-sm object-cover" />
      <span className="text-[24px]">{title}</span>
      <div className="text-center">{description}</div>
    </div>
  );
};
