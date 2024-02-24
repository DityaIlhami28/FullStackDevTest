import { useState } from "react";
import axios from "../helpers/axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("/register", form);
      navigate("/login");
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
  const handleInputChange = (event) => {
      const { name, value } = event.target;
      setForm((prevForm) => {
        return { ...prevForm, [name]: value };
      });
  }
  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{
        backgroundImage: `url("https://www.officenow.co.id/wp-content/uploads/2021/12/jakarta-stock-exchange-boardroom-4.jpg")`,
        backgroundSize: "cover",
      }}
    >
      <div className="bg-[#E5E4E2] p-8 rounded-lg shadow-md w-full sm:w-3/6">
        <h2 className="text-2xl font-semibold mb-4 text-center text-black">
          Register to VOffice
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
              htmlFor="name"
              className="block text-sm font-medium text-black"
            >
              Name:
            </label>
            <input
              type="name"
              id="name"
              name="name"
              value={form.name}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full bg-white rounded-md text-black"
            />
          </div>
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
              onChange={handleInputChange}
              className="mt-1 p-2 w-full bg-white rounded-md text-black"
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-black"
            >
              Phone:
            </label>
            <input
              type="phone"
              id="phone"
              name="phone"
              value={form.phone}
              onChange={handleInputChange}
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
              onChange={handleInputChange}
              className="mt-1 p-2 w-full bg-white rounded-md text-black"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900 focus:outline-none focus:border-gray-700 focus:ring focus:ring-gray-200 font-bold"
          >
            Register
          </button>
          <Link to="/login">
            <div className="text-black hover:underline text-center mt-5">
              Already have an Account? Login Here
            </div>
          </Link>
        </form>
      </div>
    </div>
  );
}
