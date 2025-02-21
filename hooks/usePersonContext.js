import { useContext } from "react";
import { PersonContext } from "../context/person";

export default function usePersonContext() {
  const [state, dispatch] = useContext(PersonContext);
  return [state, dispatch];
}
