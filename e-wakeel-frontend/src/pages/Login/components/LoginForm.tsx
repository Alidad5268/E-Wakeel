import { Link } from "react-router-dom";

const LoginForm = () => {
  return (
    <div className="flex flex-col gap-4 h-full w-full justify-center items-center">
      <h1 className="text-3xl font-semibold text-[#050A36]">Login</h1>
      <p className="">Enter your credentials to access your account</p>
      <div className="flex flex-col mt-4 w-[70%]">
        <div className="my-4 flex flex-col gap-1">
          <label className="font-semibold">Email</label>
          <input
            type="email"
            placeholder="Enter your email address"
            className="border p-2 rounded-xl"
          />
        </div>
        <div className="my-4 flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <label className="font-semibold">Password</label>
            <label className="text-[#464853c2] text-xs hover:underline cursor-pointer">
              Forgot your Password?
            </label>
          </div>
          <input
            type="password"
            placeholder="**************"
            className="border p-2 rounded-xl"
          />
        </div>
        <button className="my-4 w-full bg-[#0D1552] rounded-xl p-3 text-white">
          Login
        </button>
        <p className="mt-4 text-sm">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-[#3F51B5] cursor-pointer">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
