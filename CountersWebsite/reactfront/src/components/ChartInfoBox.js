import React from 'react';

const ChartInfoBox = ({ label, value, roundedClass }) => {
  return (
    <div className="w-full bg-secondary text-center font-light tracking-wide inline-block py-2 px-2 text-white rounded-2xl shadow-lg">
      <span> {label}: </span>
      <span>{value}</span>
    </div>
  );
};

export default ChartInfoBox;
