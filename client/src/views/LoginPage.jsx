import { useState } from "react";
import axios from "../helpers/axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState(""); // State to store error message

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post("/login", form);
      localStorage.setItem("access_token", data.access_token);
      navigate("/rooms");
    } catch (error) {
      console.log(error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErrorMessage(error.response.data.message); // Set error message from server response
      } else {
        setErrorMessage("An error occurred. Please try again."); // Default error message
      }
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{
        backgroundImage: `url("https://i.pinimg.com/originals/95/c2/fa/95c2fa6f5c758cacb3cf25682aee2223.jpg")`,
        backgroundSize: "cover",
      }}
    >
      <div className="bg-[#E5E4E2] p-8 rounded-lg shadow-md w-full sm:w-3/6">
        <h2 className="text-2xl font-semibold mb-4 text-center text-black">
          Login to Your Account
        </h2>

        {errorMessage && (
          <div
            className="bg-red-500 text-white p-2 mb-4 rounded-md text-center transition-opacity duration-300"
            style={{
              opacity: errorMessage ? 1 : 0,
            }}
          >
            {errorMessage}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-black"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={(event) => {
                setForm((prevForm) => {
                  return { ...prevForm, email: event.target.value };
                });
              }}
              className="mt-1 p-2 w-full bg-white rounded-md text-black"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-black"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={(event) => {
                setForm((prevForm) => {
                  return { ...prevForm, password: event.target.value };
                });
              }}
              className="mt-1 p-2 w-full bg-white rounded-md text-black"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900 focus:outline-none focus:border-gray-700 focus:ring focus:ring-gray-200 font-bold"
          >
            Login
          </button>
          <Link to="/register">
            <div className="text-black hover:underline text-center mt-5">
              New to vOffice? Register Here
            </div>
          </Link>
        </form>
      </div>
    </div>
  );
}
