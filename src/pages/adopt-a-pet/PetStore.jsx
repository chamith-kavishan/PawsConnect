import { useState, useEffect } from "react";
import pet from "../../assets/images/pets/pet.jpg";
import axiosClient from "../../../axios-client";

export const PetStore = () => {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const fetchPets = () => {
      axiosClient
        .get(`/pet/`)
        .then((res) => {
          setPets(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchPets();
  }, []);

  return (
    <section className="px-[16%] font-poppins">
      <div className="pt-20 text-center text-[36px] font-medium">
        Are you looking for a new companion?
      </div>
      <div className="pt-5 text-center text-[20px] font-normal">
        Our available pets list is updated daily. Please read our adoption
        policies as well as each pet’s profile before applying.
      </div>
      <div className="flex flex-wrap justify-between">
        <div className="mt-5 flex w-[280px] flex-col border p-5">
          <img src={pet} />
          <div className="text-center text-[24px]">Sausage</div>
          <div className="mt-3 text-center text-[18px] text-[#6caca9]">
            Mixed Breed
          </div>
          <div className="mt-3 text-center text-[18px]">Male</div>
          <div className="mt-3 text-center text-[18px]">
            The European languages are members of the same family. Their
            separate existence is a myth.
          </div>
        </div>
        <div className="mt-5 flex w-[280px] flex-col border p-5">
          <img src={pet} />
          <div className="text-center text-[24px]">Sausage</div>
          <div className="mt-3 text-center text-[18px] text-[#6caca9]">
            Mixed Breed
          </div>
          <div className="mt-3 text-center text-[18px]">Male</div>
          <div className="mt-3 text-center text-[18px]">
            The European languages are members of the same family. Their
            separate existence is a myth.
          </div>
        </div>
        <div className="mt-5 flex w-[280px] flex-col border p-5">
          <img src={pet} />
          <div className="text-center text-[24px]">Sausage</div>
          <div className="mt-3 text-center text-[18px] text-[#6caca9]">
            Mixed Breed
          </div>
          <div className="mt-3 text-center text-[18px]">Male</div>
          <div className="mt-3 text-center text-[18px]">
            The European languages are members of the same family. Their
            separate existence is a myth.
          </div>
        </div>
        <div className="mt-5 flex w-[280px] flex-col border p-5">
          <img src={pet} />
          <div className="text-center text-[24px]">Sausage</div>
          <div className="mt-3 text-center text-[18px] text-[#6caca9]">
            Mixed Breed
          </div>
          <div className="mt-3 text-center text-[18px]">Male</div>
          <div className="mt-3 text-center text-[18px]">
            The European languages are members of the same family. Their
            separate existence is a myth.
          </div>
        </div>
      </div>
    </section>
  );
};
