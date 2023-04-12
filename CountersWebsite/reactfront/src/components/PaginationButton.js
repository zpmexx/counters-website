import React from 'react';

const PaginationButton = ({ isDisabled, onClick, text }) => {
  const buttonClasses = isDisabled
    ? 'bg-faded cursor-not-allowed'
    : 'bg-primary hover:bg-hoverbg hover:text-hovertext';

  return (
    <button
      className={`${buttonClasses} text-white w-32 py-2 text-xl tracking-wide transition-all w-1/3`}
      onClick={onClick}
      disabled={isDisabled}
    >
      {text}
    </button>
  );
};

export default PaginationButton;