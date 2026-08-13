import React from 'react';

const Spinner = ({ text = "Loading..." }) => (
  <div className="flex flex-col justify-center items-center h-full my-10">
    <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-b border-bronco/20"></div>
    {text && <p className="mt-4 text-bronco/60">{text}</p>}
  </div>
);

export default Spinner;
