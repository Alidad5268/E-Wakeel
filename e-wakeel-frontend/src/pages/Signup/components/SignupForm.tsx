import { Link } from "react-router-dom";

const SignupForm = () => {
  return (
    <div className="flex flex-col gap-4 h-full w-full justify-center items-center">
      <h1 className="text-3xl font-semibold text-[#F44336]">Signup</h1>
      <p className="">Create your account to get started with E-Wakeel</p>
      <div className="flex flex-col mt-4 w-[70%]">
        <div className="my-0 flex flex-col gap-1">
          <label className="font-semibold">Name</label>
          <input
            type="text"
            placeholder="Enter your Full Name"
            className="border p-2 rounded-xl"
          />
        </div>
        <div className="my-2 flex flex-col gap-1">
          <label className="font-semibold">Email</label>
          <input
            type="email"
            placeholder="Enter your email address"
            className="border p-2 rounded-xl"
          />
        </div>
        <div className="my-2 flex flex-col gap-1">
          <label className="font-semibold">Password</label>
          <input
            type="password"
            placeholder="**************"
            className="border p-2 rounded-xl"
          />
        </div>
        <div className="my-2 flex flex-col gap-1">
          <label className="font-semibold">Confirm Password</label>
          <input
            type="password"
            placeholder="**************"
            className="border p-2 rounded-xl"
          />
        </div>
        <button className="w-full bg-[#F44336] rounded-xl p-3 text-white">
          Signup
        </button>
        <p className="mt-4 text-sm">
          Already have an account? {` `}
          <Link to="/login" className="text-[#F44336] cursor-pointer">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
