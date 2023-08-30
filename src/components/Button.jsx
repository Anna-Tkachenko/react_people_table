import React from 'react';

export const Button = ({
  children, className, ...props
}) => (
  <button
    className={`button is-rounded is-small ${className}`}
    type="button"
    {...props}
  >
    {children}
  </button>
);
