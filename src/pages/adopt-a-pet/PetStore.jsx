import { useState, useEffect } from "react";
import pet from "../../assets/images/pets/pet.jpg";
import axiosClient from "../../../axios-client";
import { Link } from "react-router-dom";

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
        {pets.map((pet) => {
          return (
            <div
              className="mt-5 flex w-[280px] flex-col border p-5"
              key={pet.profileImageURL}
            >
              <Link to={`/pet/${pet.idPet}`}>
                <img src={pet.profileImageURL} />
              </Link>
              <Link
                to={`/pet/${pet.idPet}`}
                className="text-center text-[24px]"
              >
                {pet.Name}
              </Link>
              <div className="mt-3 text-center text-[18px] text-[#6caca9]">
                {pet.Breed}
              </div>
              <div className="mt-3 text-center text-[18px]">{pet.Sex}</div>
              <div className="mt-3 text-center text-[18px]">
                {pet.Description?.substring(0, 100)}
                {pet.Description?.length > 100 && "..."}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
