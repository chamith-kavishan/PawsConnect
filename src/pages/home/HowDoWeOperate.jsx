import { howDoWeOperate } from "../../utils/dataArrays";

export const HowDoWeOperate = () => {
  return (
    <section className="w-full px-[8%] pb-20 pt-[420px] font-poppins">
      <div className="w-full px-12">
        <div className="text-center text-[36px] font-medium">
          How Do We Operate?
        </div>
        <div className="mt-8 flex w-full justify-between">
          {howDoWeOperate.map((card) => (
            <OperateCard key={card.step} step={card.step} text={card.text} />
          ))}
        </div>
      </div>
    </section>
  );
};

export const OperateCard = ({ step, text }) => {
  return (
    <div className="flex w-[33%] flex-col items-center justify-center text-center">
      <span className="text-[50px] text-[#02aee0]">{step}</span>
      <div className="w-[70%] text-[18px]">{text}</div>
    </div>
  );
};
