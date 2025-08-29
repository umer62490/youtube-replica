import React from 'react';

const CurveButton = ({ label }) => {
  return (
    <button className="rounded-lg bg-gray-100 h-10 text-sm flex items-center justify-center px-4 py-2 whitespace-nowrap">
      {label}
    </button>
  );
};

export default CurveButton;
