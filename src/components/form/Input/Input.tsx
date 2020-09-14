import React, { FC, InputHTMLAttributes } from "react";
import cn from "classnames";

type InputProps = {
  error?: string;
};

const Input: FC<InputHTMLAttributes<HTMLInputElement> & InputProps> = ({
  error,
  className,
  ...rest
}) => (
  <div className="InputWrapper">
    <input
      className={cn("InputWrapper__Input", className, {
        "InputWrapper__Input--error": error,
      })}
      {...rest}
    />
    <span className="InputWrapper__Error">{error}</span>
  </div>
);

export default Input;
