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
    <>
      <title>Login</title>
      <div className="flex w-full h-full justify-center items-center ">
        <section className="p-20  bg-slate-500 rounded-lg">
          <form onSubmit={handleSubmit} className="flex flex-col gap-9">
            <div className="w-full flex justify-center">
              <h1 className="font-bold text-2xl text-white">Login</h1>
            </div>
            <div className="flex flex-col">
              <label>Email</label>
              <input
                className="p-5 rounded-md"
                value={userInfo.email}
                onChange={({ target }) =>
                  setUserInfo({ ...userInfo, email: target.value })
                }
                type="email"
                placeholder="john@email.com"
              />
            </div>
            <div className="flex flex-col">
              <label>Password</label>
              <input
                className="p-5 rounded-md"
                value={userInfo.password}
                onChange={({ target }) =>
                  setUserInfo({ ...userInfo, password: target.value })
                }
                type="password"
                placeholder="****"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>
        </section>
      </div>
    </>
  );
};

export default SignIn;
