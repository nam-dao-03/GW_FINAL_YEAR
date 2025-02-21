import { useContext } from "react";
import Context from "../context/app/Context";
function useAppContext() {
  const [state, dispatch] = useContext(Context);

  return [state, dispatch];
}

export default useAppContext;
