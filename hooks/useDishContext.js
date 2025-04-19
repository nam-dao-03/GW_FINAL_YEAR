import { useContext } from "react";
import { DishContext } from "../context/dish";

export default function useDishContext() {
  const [state, dispatch] = useContext(DishContext);
  return [state, dispatch];
}
