import { useState, useEffect } from "react";
import axios from "../helpers/axios";
export default function Rooms() {
  const [roomList, setRoomList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const response = await axios.get("/room");
        const data = response.data;
        setRoomList(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRoom();
  }, []);

  return (
    <div className="flex flex-wrap justify-center">
      {isLoading ? (
        <div className="flex justify-center items-center h-full mt-5">
          <span className="loading loading-bars loading-lg text-black h-96"></span>
        </div>
      ) : (
        roomList.map((game, index) => (
          <div
            key={index}
            className={`flex w-64 flex-col rounded-xl text-black mt-5 mx-2 mb-5 h-auto ${
              index % 4 === 0 ? "clear-left" : ""
            }`}
          >
            <div className="mx-3 overflow-hidden rounded-md">
              <img
                src={game.imgUrl}
                className="h-96 w-auto object-cover"
                alt={game.roomName}
              />
            </div>
            <div className="p-6">
              <div className="mb-2 flex flex-col">
                <p className="block font-sans text-black font-medium leading-relaxed text-blue-gray-900 antialiased">
                  {game.roomName}
                </p>
                <p className="block font-sans text-sm font-normal leading-normal text-black antialiased opacity-75">
                  {game.description}
                </p>
              </div>
              <p className="block font-sans text-sm font-normal leading-normal text-black antialiased opacity-75">
                Credits {game.costPerHour}
              </p>
            </div>
            <div className="p-6 pt-0">
              <button
                className="block w-full select-none rounded-lg bg-black text-white py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-blue-gray-900 transition-all hover:scale-105 focus:scale-105 focus:opacity-[0.85] active:scale-100 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
              >
                Book Now
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
