import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Cookies from "js-cookie";
export function useUserData() {
  const [id, setID] = useState(null);
  const [name, setName] = useState(null);
  const [username, setUsername] = useState(null);
  const [role, setRole] = useState(null);
  const [section, setSection] = useState(null);
  const [Loading, setLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  const GET_AUTH_ME = `
      query getAuthMe {
        me {
          id
          name
          created_at
          username
          role
          sections_enrolled {
            id
            name
            active
            batch_id
            block_id
          }
        }
      }
    `;
  const { data, isLoading, isError } = useQuery(GET_AUTH_ME);

  console.log(data, isLoading, isError, "auth data");
  useEffect(() => {
    if (data && data.me) {
      const { id, name, username, role, sections_enrolled } = data.me;
      setID(id);
      Cookies.set("auth_user_id", id);
      setName(name);
      setUsername(username);
      setRole(role);
      setSection(sections_enrolled);
    } else if (isError) {
      setID(null);
      setUsername(null);
      setName(null);
      setRole(null);
      setError("Please log in");
      console.log("Error:", isError);
    }

    setLoading(false);
    setIsLoaded(true);
  }, [data, isError]);

  return {
    id,
    name,
    username,
    role,
    section,
    isLoading,
    isLoaded,
    error,
  };
}
