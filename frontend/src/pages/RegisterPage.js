import React, { useState } from "react";
import { Link } from "react-router-dom";

function RegisterPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    passwordConfirmation: "",
    course: "",
    class: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <main
      id="container"
      className="flex min-h-screen pt-16 justify-center flex-col items-center"
    >
      <div className="flex flex-col">
        <div className="bg-gray-700 py-2 px-4 font-space font-bold text-white w-full">
          <h1 className="text-3xl">Register</h1>
        </div>

        <form
          className="flex flex-col shadow-xl p-5 md:text-lg bg-gray-500 gap-5"
          onSubmit={handleSubmit}
        >
          <div className="form-control font-mono flex flex-col">
            <label className="text-white" htmlFor="email">
              Email
            </label>
            <input
              className="py-1 px-2 shadow-lg"
              onChange={handleChange}
              id="email"
              value={formData.email}
              type="email"
              required
              name="email"
              placeholder="Enter your email"
            />
          </div>
          <div className="form-control font-mono w-[20vw] flex flex-col">
            <label className="text-white" htmlFor="password">
              Password
            </label>
            <input
              className="py-1 px-2 shadow-lg"
              value={formData.password}
              id="password"
              onChange={handleChange}
              type="password"
              name="password"
              required
              placeholder="Enter your password"
            />
          </div>
          <div className="form-control font-mono flex flex-col">
            <label className="text-white" htmlFor="passwordConfirmation">
              Confirm Password
            </label>
            <input
              className="py-1 px-2 shadow-lg"
              value={formData.passwordConfirmation}
              id="passwordConfirmation"
              onChange={handleChange}
              type="password"
              name="passwordConfirmation"
              placeholder="Confirm your password"
              required
            />
          </div>
          <div className="form-control font-mono flex flex-col">
            <label className="text-white" htmlFor="course">
              Course
            </label>
            <select
              onChange={handleChange}
              className="py-1 px-2 shadow-lg"
              name="course"
              value={formData.course}
              id="course"
              required
            >
              <option value="dit">DIT</option>
              <option value="dcitp">DCITP</option>
              <option value="dism">DISM</option>
              <option value="daa">DAAA</option>
            </select>
          </div>
          <div className="form-control font-mono flex flex-col">
            <label className="text-white" htmlFor="class">
              Class
            </label>
            <input
              className="py-1 px-2 shadow-lg"
              required
              type="text"
              name="class"
              id="class"
              placeholder="e.g. 1A/02"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 font-karla text-white self-start shadow-lg py-1 px-2"
          >
            Register
          </button>
          <p className="text-xs text-white">
            Already have an account?{" "}
            <u>
              <Link to="/login">Login.</Link>
            </u>
          </p>
        </form>
      </div>
    </main>
  );
}

export default RegisterPage;
