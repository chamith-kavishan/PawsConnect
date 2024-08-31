import { Link } from "react-router-dom";

export const PrimaryButton = ({ text, onClick }) => {
  return (
    <Link
      className="duration-400 rounded-[6px] bg-gradient-to-b from-[#ffd907] to-[#ffca3a] px-4 py-3 font-semibold shadow-2xl transition-all hover:from-[#8ccfd3] hover:to-[#41a7ab] hover:text-white"
      onClick={onClick}
    >
      {text}
    </Link>
  );
};
