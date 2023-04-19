import React from 'react';

const ChartInfoBox = ({ label, value, roundedClass }) => {
  return (
    <div className="bg-secondary font-light tracking-wide inline-block py-1 px-2 text-white rounded-md">
      <span> {label}: </span>
      <span>{value}</span>
    </div>
  );
};

export default ChartInfoBox;
