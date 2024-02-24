import { useState } from "react";
import axios from "../helpers/axios";

export default function TopUpModal({ closeModal, onAddSuccess }) {
  const [form, setForm] = useState({
    credits: ""
  });

  const handleOnAdd = async (event) => {
    event.preventDefault();
    try {
      await axios.patch("/credits", form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`
        }
      });
      setForm({
        credits: ""
      });
      onAddSuccess();
      closeModal();
    } catch (error) {
      console.error(error);
    }   
  };

  const handleInputAdd = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <>
      <div className="flex items-center justify-center fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50">
        <div className="w-full max-w-md mx-auto p-6">
          <div className="mt-7 bg-white rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700">
            <div className="p-4 sm:p-7">
              <div className="flex justify-between items-center">
                <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
                  Top Up
                </h1>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="mt-5">
                <form onSubmit={handleOnAdd}>
                  <div className="grid gap-y-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-bold ml-1 mb-2 dark:text-white"
                      >
                        Top Up Credits
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          id="credits"
                          name="credits"
                          value={form.credits}
                          onChange={handleInputAdd}
                          className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-black text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                    >
                      Top Up
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
