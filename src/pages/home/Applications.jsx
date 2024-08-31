import volunteerImage from "../../assets/images/applications/volunteer.jpg";
import { PrimaryButton } from "../../components/global/PrimaryButton";
import { applications } from "../../utils/dataArrays";

export const Applications = () => {
  return (
    <section className="w-full px-[8%] pt-6 font-poppins">
      <div className="bg-[#02aee0] py-10">
        <div className="pb-10 text-center text-[36px] font-medium text-white">
          Applications
        </div>
        <div className="flex w-full items-stretch justify-between gap-2 px-[5%]">
          {applications.map((card) => {
            return (
              <ApplicationCard
                key={card.title}
                image={card.image}
                title={card.title}
                description={card.description}
                buttonText={card.buttonText}
                link={card.link}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export const ApplicationCard = ({
  image,
  title,
  description,
  buttonText,
  onclick,
}) => {
  return (
    <div className="bg-transparent-600 flex w-full flex-col justify-between md:w-[20%]">
      <div>
        <img
          src={image}
          alt={title}
          className="h-[300px] w-full object-cover"
        />
        <div className="mt-5 text-center text-[28px] text-white">{title}</div>
        <div className="mt-5 text-center text-white">{description}</div>
      </div>
      <div className="mt-5 flex items-center justify-center">
        <PrimaryButton text={buttonText} onclick={onclick} />
      </div>
    </div>
  );
};
