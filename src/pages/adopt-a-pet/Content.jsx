import React from "react";

export const Content = ({ pet }) => {
  return (
    <section className="px-[16%] py-20 font-poppins">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Pet Description</h1>
        <p className="mt-4 text-gray-700">{pet.Description}</p>
      </div>

      <div className="mt-10 border-t pt-6">
        <h2 className="text-xl font-semibold">Organization Details</h2>
        <div className="mt-4 text-gray-800">
          <p>
            <span className="font-medium">Name:</span> {pet.OrganizationName}
          </p>
          <p>
            <span className="font-medium">Contact Number:</span> {pet.Contact}
          </p>
          <p>
            <span className="font-medium">Address:</span> {pet.Address}
          </p>
        </div>
      </div>
    </section>
  );
};
