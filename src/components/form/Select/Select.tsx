import React, { FC } from "react";
import cn from "classnames";
import ReactSelect, { Props, StylesConfig } from "react-select";
import { ThemeConfig } from "react-select/src/theme";

type SelectProps = {
  error?: string;
};

const theme: ThemeConfig = (theme) => ({
  ...theme,
  colors: {
    ...theme.colors,
    // danger: '#005EFF',
    dangerLight: "transparent",
  },
});

const customStyles: StylesConfig = {
  multiValue: (styles, state) => {
    return {
      ...styles,
      padding: "2px 6px",
      backgroundColor: "#DFE1E6",
      border: "1px solid #C1C7D0",
      boxSizing: "border-box",
      borderRadius: "3px",
    };
  },
  multiValueLabel: (styles, state) => ({
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "12px",
    lineHeight: "16px",
    color: "#005EFF",
  }),
};

const Select: FC<Props & SelectProps> = ({ error, className, ...props }) => (
  <div className="SelectWrapper">
    <ReactSelect
      {...props}
      className={cn("SelectWrapper__Select", className, {
        "SelectWrapper__Select--error": error,
      })}
      styles={customStyles}
      theme={theme}
    />
    <span className="SelectWrapper__Error">{error}</span>
  </div>
);

export default Select;
