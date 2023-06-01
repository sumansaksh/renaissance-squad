import { createContext } from "react";
export const UserContext = createContext({
  id: null,
  name: null,
  username: null,
  role: null,
});
