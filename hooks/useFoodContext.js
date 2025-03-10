import { useContext } from "react";
import { FoodContext } from "../context/food";

export default function useFoodContext() {
  const [state, dispatch] = useContext(FoodContext);
  return [state, dispatch];
}
