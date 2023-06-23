import { validate } from "@/utils/validators";
import { useReducer } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE": {
      return {
        ...state,
        value: action.value,
        isValid: validate(action.value, action.validators),
      };
    }
    case "INPUT_BLUR": {
      return {
        ...state,
        isTouched: true,
      };
    }
    default:
      return state;
  }
};

export const useValidation = (validators) => {
  const [state, dispatch] = useReducer(reducer, {
    value: "",
    isValid: false,
    isTouched: false,
  });

  const onChangeInputHandler = (e) => {
    dispatch({
      type: "INPUT_CHANGE",
      value: e.target.value,
      validators: validators,
    });
  };

  const onBlurInputHandler = () => {
    dispatch({
      type: "INPUT_BLUR",
    });
  };

  return {
    onChangeInputHandler,
    onBlurInputHandler,
    value: state.value,
    isValid: state.isValid,
    isTouched: state.isTouched,
  };
};
