import React from 'react';

const Alert = ({ message, type = "error" }) => {
  if (!message) return null;
  const typeClasses =
    type === "error"
      ? "bg-bronco/10 text-bronco border-bronco/20 font-medium"
      : "bg-mesa-clay/20 text-mesa-clay border-green-400 text-green-700";
  return (
    <div
      className={`border px-4 py-3 rounded-md my-4 text-center text-sm ${typeClasses}`}
    >
      {message}
    </div>
  );
};

export default Alert;
