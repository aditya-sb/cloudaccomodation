import React from 'react';

const Refer = () => {
  return (
    <div className="p-8  max-sm:w-full bg-gray-100  ">
      <h2 className='text-2xl  font-bold md:ml-4'>Referral Programs and Offers</h2>
      <div className="flex md:w-1/2 justify-between border border-black/40 rounded-lg shadow-sm items-start mb-8 mt-6 p-6  md:ml-5">
        <div className="flex flex-col md:w-3/5">
          <h2 className="text-lg font-semibold mb-2">
            Refer & Earn with Cloud Accommodation!
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Refer your friends to book their housing through us. They enjoy hassle-free accommodation, and you earn 50 Canadian dollars.
          </p>
          <button className="w-fit bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-md text-sm">
            Refer now
          </button>
        </div>
        <div className="ml-4 md:flex hidden">
          <img 
            src="/images/refer.png" 
            alt="Referral illustration" 
            className="w-[230px]"
          />
        </div>
      </div>
    </div>
  );
};

export default Refer;