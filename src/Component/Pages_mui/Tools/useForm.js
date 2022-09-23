import { useState } from "react";
// ******************************
const useForm = ({ initState, validator }) => {
  const [state, setState] = useState(initState);
  const [errors, setErrors] = useState({});

  // ******************************
  const handleChanges = e => {
    const { name, value } = e.target;
    setState(() => ({
      ...state,
      [name]: value
    }));
    
  };
  // ******************************
  const handleBlur = e => {
    const { name: fieldName } = e.target;
    const faildFiels = validator(state, fieldName);
    setErrors(() => ({
      ...errors,
      [fieldName]: Object.values(faildFiels)[0]
    }));
  };

  // ******************************
  return {
	handleChanges,
    handleBlur,
    state,
    errors
  };
};

export default useForm;
