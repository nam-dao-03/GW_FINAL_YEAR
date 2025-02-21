import { useReducer } from "react";
import Context from "./Context";
import { initialValue, reducer } from "./reducer";
const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialValue);

  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};

export default Provider;
