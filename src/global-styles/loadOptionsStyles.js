import { Colors } from "../assets/colors";

export const customStyles = {
    option: (provided, state) => ({
      ...provided,
      with:"100%",
      backgroundColor: state.isSelected ? "#fff" : "#fff", // Background color for selected options
      color: state.isSelected ?  Colors.PURPLE : "black", // Text color for selected options
      padding: "8px 12px", // Padding for options
      fontSize: "14px", // Font size for options
      height: "60px", // Height of each option
      borderRadius:"10px",
      border:"none",
    }),
    control: (provided) => ({
      ...provided,
      border:"none", // Border color
      minHeight: "60px", // Minimum height of the control
      boxShadow: "none", // Remove box shadow
      borderRadius:"10px",
      backgroundColor:"#F7F8FA"

    }),
  };

  
  export const customStylesCategory = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#fff" : "#fff", // Background color for selected options
      color: state.isSelected ?  Colors.PURPLE : "black", // Text color for selected options
      padding: "8px 12px", // Padding for options
      fontSize: "14px", // Font size for options
      height: "60px", // Height of each option
      borderRadius:"10px",
      border: "none",
    }),
    control: (provided) => ({
      ...provided,
      width:"203px",
      border: "1px solid #7D8FB326", // Border color
      minHeight: "60px", // Minimum height of the control
      boxShadow: "none", // Remove box shadow
      borderRadius:"10px",
      backgroundColor:"#fff"

    }),
  };
 

  export const customStylesExportSelect = {
    option: (provided, state) => ({
      ...provided,
      with:"100%",
      backgroundColor: state.isSelected ? "#fff" : "#fff", // Background color for selected options
      color: state.isSelected ?  Colors.PURPLE : "black", // Text color for selected options
      padding: "8px 12px", // Padding for options
      fontSize: "14px", // Font size for options
      height: "60px", // Height of each option
      borderRadius:"10px",
      border:"none",
    }),
    control: (provided) => ({
      ...provided,
      border:"1px solid #7D8FB326", // Border color
      minHeight: "60px", // Minimum height of the control
      boxShadow: "none", // Remove box shadow
      borderRadius:"10px",
      backgroundColor:"#fff",
    }),
  };
