import { useEffect, useState } from "react";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { gql, useMutation } from "@apollo/client";
import { useMutation as queryMutation } from "react-query";
import Cookies from "js-cookie";

const LOGIN_MUTATION = gql`
  mutation LoginMutation($input: LoginInput!) {
    login(input: $input) {
      id
    }
  }
`;

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginMutation, { loading, error }] = useMutation(LOGIN_MUTATION);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await loginMutation({
        variables: {
          input: {
            email,
            password,
          },
        },
      });

      const userId = data.login.id;
      Cookies.set("auth_user_id", userId);

      // Navigate to the desired page using react-router-dom history
      // Replace '/homepage' with the actual path you want to navigate to
      // history.push("/homepage");
    } catch (error) {
      console.error("Login Error:", error.message);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <form
          className="flex flex-col p-10 border m-3 gap-4 w-[40%] rounded-lg"
          onSubmit={handleSubmit}
        >
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email1" value="Your email" />
            </div>
            <TextInput
              id="email1"
              placeholder="name@flowbite.com"
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password1" value="Your password" />
            </div>
            <TextInput
              id="password1"
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </>
  );
}

export default Login;
