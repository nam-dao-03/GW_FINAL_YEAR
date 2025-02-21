import Context from "./Context";
import { useReducer } from "react";
import { reducer, initialValue } from "./reducer";
function Provider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialValue);
  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
}

export default Provider;
