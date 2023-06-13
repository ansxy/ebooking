import { GetServerSideProps, GetStaticProps, NextPage } from "next";
import { FormEventHandler, useState, useContext } from "react";
import { UserContext, UserContextProps } from "../../context/user/UserContext";
import { getToken } from "next-auth/jwt";
import { IoIosCloseCircle } from "react-icons/io";

const SignIn: NextPage = (props): JSX.Element => {
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });
  const [status, setStatus] = useState<Boolean>(false);
  const { login } = useContext<UserContextProps>(UserContext);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const result = await login(userInfo);
    if (result?.status === 401) {
      setStatus(true);
    }
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
            {status ? (
              <>
                <div className="alert alert-warning shadow-lg">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="stroke-current flex-shrink-0 h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                    <span>Warning: Invalid email address!</span>
                    <IoIosCloseCircle
                      className="cursor-pointer"
                      onClick={() => setStatus(false)}
                    ></IoIosCloseCircle>
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}
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
