import React, { useState } from 'react';

const BatchListItem = ({ batch, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="text-sm p-2 border-b border-bronco/10">
      <div className="w-full flex justify-between items-center text-left">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex-grow flex items-center font-semibold text-bronco/80"
        >
          <svg
            className={`w-4 h-4 transition-transform mr-2 ${
              isOpen ? "rotate-90" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
          {batch.name}
        </button>
        <button
          onClick={() => onDelete(batch._id)}
          className="text-bronco hover:text-bronco p-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      {isOpen && (
        <div className="mt-2 pl-8 text-bronco/70">
          <p className="font-semibold">Subjects:</p>
          <ul className="list-disc pl-5">
            {batch.subjects.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          {batch.labs && batch.labs.length > 0 && (
            <>
              <p className="font-semibold mt-1">Labs:</p>
              <ul className="list-disc pl-5">
                {batch.labs.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default BatchListItem;
