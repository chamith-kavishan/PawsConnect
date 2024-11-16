import React, { useState, useEffect } from "react";
import { Nav } from "../../components/layouts/Nav";
import { PetViewHero } from "./PetViewHero";
import { Footer } from "../../components/layouts/Footer";
// import { RecentBlogs } from "./RecentBlogs";
import { Content } from "./Content";
import { useParams } from "react-router-dom";
import axiosClient from "../../../axios-client";

export const PetView = () => {
  const { id } = useParams();

  const [pet, setPet] = useState([]);

  useEffect(() => {
    const fetchPet = () => {
      axiosClient
        .get(`/pet/single/${id}`)
        .then((res) => {
          setPet(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchPet();
  }, []);

  return (
    <div>
      <Nav />
      <PetViewHero pet={pet} />
      <Content pet={pet} />
      {/* <RecentBlogs /> */}
      <Footer />
    </div>
  );
};
