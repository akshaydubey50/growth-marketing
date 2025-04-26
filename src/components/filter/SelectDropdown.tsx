// Package Imports
import React from "react";
import Select from "react-select";

// Project Imports

export default function SelectDropdown(props:any) {
  const { label, options, onChange, disabled, placeholder, value } = props;

  const customStyles = {
    option: (styles:any, { isSelected }:any) => {
      return {
        ...styles,
        backgroundColor: isSelected ? "#2bb656" : "#eee",
        color:isSelected ? "#FFF":"#2bb656",
        fontSize: isSelected ? "17px" : "15px",
        borderBottom:"1px solid #2bb656",
        padding: "12px",
        cursor:"pointer",
        fontWeight: 600,
        ":hover": {
          backgroundColor: "#2bb656",
          color: "white",
        },
      };
    },
    control: (provided:any, state:any) => ({
      ...provided,
      backgroundColor: "#2bb656",
      color: "white",
      borderRadius: "100px",
      cursor:"pointer",
      fontSize: "15px",
      border: "none",
      boxShadow: state.isFocused && "none" ,
      fontWeight: 600,
    }),
    singleValue: (provided:any) => ({
      ...provided,
      color: "white",
      padding: "12px",
      textAlign: "center", 
      fontWeight: 600,

    }),
    dropdownIndicator: (provided:any) => ({
      ...provided,
      color: "white",
      paddingRight:"12px",
      ":hover": {
        color: "white",
      },
    }),
    menuList: (provided:any) => ({
      ...provided,
      backgroundColor: "#eee",
      padding: "12px",
      borderRadius:"20px",
      msOverflowStyle: 'none',
      scrollbarWidth: 'none',
      '&::-webkit-scrollbar': {
        width: 0,
      },
    }),
    menu: (provided:any) => ({
      ...provided,
      borderRadius: '20px',
      fontWeight: 600,
    }),
    placeholder: (styles:any) => {
      return {
        ...styles,
        padding: "10px",
        color: "white",
        fontWeight: 600,
        whiteSpace: "nowrap",
        textAlign:"center"
      };
    },
    noOptionsMessage: (styles:any) => ({
      ...styles,
      color: "white", 
    }),
  };
  return (
    <div>
      <Select
       key={value} 
        placeholder={placeholder}
        value={value}
        options={options}
        isDisabled={disabled}
        isSearchable={false}
        styles={customStyles}
        onChange={onChange}
        components={{
          IndicatorSeparator: () => null,
        }}
      />
    </div>
  );
};
