import { useEffect, useState } from "react";
import axios from "../helpers/axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const response = await axios.get("/roomUsage", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      const data = response.data;
      setBookings(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchBookings();
  });
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/roomUsage/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      fetchBookings();
      Swal.fire(
        "Deleted!",
        "Your Appointment has been canceled.",
        "success"
      ).then(window.location.reload());
    } catch (error) {
      console.log(error);
      Swal.fire("Error!", "Something went wrong.", "error");
    }
  };
  if (bookings.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-screen mt-5">
        <p className="text-2xl font-bold">No bookings available</p>
        <Link
          to="/rooms"
          className="mt-3 bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full"
        >
          Start Booking Now
        </Link>
      </div>
    );
  } else {
    return (
      <>
        {isLoading ? (
          <div className="flex justify-center items-center h-full mt-5">
            <span className="loading loading-bars loading-lg text-black h-96"></span>
          </div>
        ) : (
          bookings.map((book, index) => (
            <div
              key={index}
              className="bg-white border rounded-xl shadow-sm sm:flex dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7] mx-auto mt-10"
              style={{ maxWidth: "720px" }}
            >
              <div className="flex-shrink-0 relative w-full rounded-t-xl overflow-hidden pt-[40%] sm:rounded-s-xl sm:max-w-60 md:rounded-se-none md:max-w-xs">
                <img
                  className="size-full absolute top-0 start-0 object-cover w-full h-full"
                  src={book.Room.imgUrl}
                  alt="Image Description"
                />
              </div>
              <div className="flex flex-wrap">
                <div className="p-4 flex flex-col sm:p-5">
                  <h3 className="text-base sm:text-lg font-bold text-gray-800 dark:text-white">
                    {book.Room.roomName}
                  </h3>
                  <p className="mt-1 text-sm sm:text-base text-black dark:text-gray-400">
                    {book.Room.description}
                  </p>
                  <p className="mt-5 text-sm sm:text-base text-black dark:text-gray-400">
                    For : {book.quotaUsed} People
                  </p>
                  <p className="mt-5 text-sm sm:text-base text-black dark:text-gray-400">
                    From : {book.startTime}
                  </p>
                  <p className="mt-1 text-sm sm:text-base text-black dark:text-gray-400">
                    To : {book.endTime}
                  </p>
                  <div className="mt-3 sm:mt-auto flex items-center">
                    <p className="text-s text-black dark:text-gray-500 mr-5">
                      Booking Date:{" "}
                      {new Date(book.bookingDate).toLocaleDateString()}
                    </p>
                    <button
                      className="block select-none rounded-lg bg-red-500 text-white py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-blue-gray-900 transition-all hover:scale-105 focus:scale-105 focus:opacity-[0.85] active:scale-100 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                      type="button"
                      onClick={() => handleDelete(book.id)}
                    >
                      Cancel Booking
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </>
    );
  }
}
