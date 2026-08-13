import React from 'react';

export const ClassCell = ({ entry }) => {
  if (typeof entry === "string" && entry === "LUNCH")
    return (
      <div className="font-semibold text-bronco/60 text-center h-full flex items-center justify-center">
        LUNCH
      </div>
    );
  if (!entry || !entry.subject)
    return (
      <div className="text-bronco/70 text-center h-full flex items-center justify-center">
        ·
      </div>
    );
  const isTeacherAvailable = entry.teacher && entry.teacher !== "Not Available";
  const bgColor = isTeacherAvailable
    ? "bg-blue-100 hover:bg-blue-200"
    : "bg-red-100 hover:bg-red-200";
  const textColor = isTeacherAvailable ? "text-blue-800" : "text-red-800";
  const roomColor = isTeacherAvailable ? "text-blue-600" : "text-red-600";
  return (
    <div
      className={`p-2 rounded-lg h-full transition-colors duration-200 ${bgColor} ${textColor}`}
    >
      <p className="font-bold text-sm">{entry.subject}</p>
      <p className={`text-xs ${roomColor}`}>{entry.teacher}</p>
      <p className={`text-xs font-medium ${roomColor}`}>Room: {entry.room}</p>
    </div>
  );
};
