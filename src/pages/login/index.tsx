import { GetServerSideProps, GetStaticProps, NextPage } from "next";
import { FormEventHandler, useState, useContext } from "react";
import { UserContext, UserContextProps } from "../../context/user/UserContext";
import { getToken } from "next-auth/jwt";

const SignIn: NextPage = (props): JSX.Element => {
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });
  const { login } = useContext<UserContextProps>(UserContext);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await login(userInfo);
  };
  return (
    <div className="sign-in-form">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <input
          value={userInfo.email}
          onChange={({ target }) =>
            setUserInfo({ ...userInfo, email: target.value })
          }
          type="email"
          placeholder="john@email.com"
        />
        <input
          value={userInfo.password}
          onChange={({ target }) =>
            setUserInfo({ ...userInfo, password: target.value })
          }
          type="password"
          placeholder="****"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default SignIn;
