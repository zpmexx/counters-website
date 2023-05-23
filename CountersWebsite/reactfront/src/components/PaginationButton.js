import React from 'react';

const PaginationButton = ({ isDisabled, onClick, text, roundedClass }) => {
  const buttonClasses = isDisabled
    ? 'bg-secondary cursor-not-allowed'
    : 'bg-primary hover:bg-hoverbg hover:text-hovertext';

  return (
    <button
      className={`${buttonClasses} text-light-text w-32 py-2 text-lg tracking-wide transition-all w-1/3 ${roundedClass}`}
      onClick={onClick}
      disabled={isDisabled}
    >
      {text}
    </button>
  );
};

export default PaginationButton;