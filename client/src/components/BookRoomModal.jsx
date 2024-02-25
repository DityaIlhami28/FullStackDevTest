import { useState } from "react";
import axios from "../helpers/axios";
import Swal from "sweetalert2";

export default function BookRoomModal({ roomId ,closeModal, onAddSuccess }) {
  const [form, setForm] = useState({
    roomId: roomId,
    startTime: "",
    endTime: "",
    bookingDate: "",
    quotaUsed: "",
  });

  const handleOnAdd = async (event) => {
    event.preventDefault();
    try {
      await axios.post(`/roomUsage`, form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setForm({
        roomId: roomId,
        startTime: "",
        endTime: "",
        bookingDate: "",
        quotaUsed: "",
      });
      onAddSuccess();
      closeModal();
      Swal.fire("Success", "Room booked successfully", "success").then(
          window.location.reload()
      );
    } catch (error) {
      console.error(error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        const errorMessage = error.response.data.message;
        Swal.fire("Error", errorMessage, "error");
      } else {
        Swal.fire("Error", "Something went wrong", "error");
      }
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
                  Booking Form
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
                        Start Time
                      </label>
                      <div className="relative">
                        <input
                          type="time"
                          id="startTime"
                          name="startTime"
                          value={form.startTime}
                          onChange={handleInputAdd}
                          className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-bold ml-1 mb-2 dark:text-white"
                      >
                        End Time
                      </label>
                      <div className="relative">
                        <input
                          type="time"
                          id="endTime"
                          name="endTime"
                          value={form.endTime}
                          onChange={handleInputAdd}
                          className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-bold ml-1 mb-2 dark:text-white"
                      >
                        Booking Date
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          id="bookingDate"
                          name="bookingDate"
                          value={form.bookingDate}
                          onChange={handleInputAdd}
                          className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-bold ml-1 mb-2 dark:text-white"
                      >
                        Number of People
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          id="quotaUsed"
                          name="quotaUsed"
                          value={form.quotaUsed}
                          onChange={handleInputAdd}
                          className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-black text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                    >
                      Book
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
