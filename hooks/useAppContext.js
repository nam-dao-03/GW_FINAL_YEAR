import { useContext } from "react";
import { AppContext } from "../context/app";
function useAppContext() {
  const [state, dispatch] = useContext(AppContext);

  return [state, dispatch];
}

export default useAppContext;
