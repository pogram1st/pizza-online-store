import React from 'react';
import classnames from 'classnames';

const Button = ({ outline, className, children }) => {
  return (
    <button className={classnames('button', { 'button--outline': outline }, className)}>
      {children}
    </button>
  );
};
export default Button;
