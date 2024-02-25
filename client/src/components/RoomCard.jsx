import { useState, useEffect } from "react";
import axios from "../helpers/axios";
import BookRoomModal from "./BookRoomModal";
export default function Rooms() {
  const [roomList, setRoomList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState(null);

    const fetchRoom = async () => {
      try {
        const response = await axios.get("/room" , {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          }
        });
        const data = response.data;
        setRoomList(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
   useEffect(() => {
     fetchRoom();
   })
  const openTopUpModal = (roomId) => {
    setIsModalOpen(true)
    setSelectedRoomId(roomId)
  }
  const closeTopUpModal = () => {
    setIsModalOpen(false)
    setSelectedRoomId(null)
  }
  const handleAddSuccess = () => {
    fetchRoom()
  }
  const handleBookNowClick = (roomId) => {
    openTopUpModal(roomId);
  };
  return (
    <div className="flex flex-wrap justify-center">
      {isLoading ? (
        <div className="flex justify-center items-center h-full mt-5">
          <span className="loading loading-bars loading-lg text-black h-96"></span>
        </div>
      ) : (
        roomList.map((room, index) => (
          <div
            key={index}
            className={`flex w-64 flex-col rounded-xl text-black mt-5 mx-2 mb-5 h-auto ${
              index % 4 === 0 ? "clear-left" : ""
            }`}
          >
            <div className="mx-3 overflow-hidden rounded-md">
              <img
                src={room.imgUrl}
                className="h-96 w-auto object-cover"
                alt={room.roomName}
              />
            </div>
            <div className="p-6">
              <div className="mb-2 flex flex-col">
                <p className="block font-sans text-black font-medium leading-relaxed text-blue-gray-900 antialiased">
                  {room.roomName}
                </p>
                <p className="block font-sans text-sm font-normal leading-normal text-black antialiased opacity-75">
                  {room.description}
                </p>
              </div>
              <p className="block font-sans text-sm font-normal leading-normal text-black antialiased opacity-75">
                Credits {room.costPerHour}
              </p>
            </div>
            <div className="p-6 pt-0">
              <button
                className="block w-full select-none rounded-lg bg-black text-white py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-blue-gray-900 transition-all hover:scale-105 focus:scale-105 focus:opacity-[0.85] active:scale-100 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
                onClick={() => handleBookNowClick(room.id)}
              >
                Book Now
              </button>
            </div>
          </div>
        ))
      )}
      {isModalOpen && (
          <BookRoomModal roomId={selectedRoomId} closeModal={closeTopUpModal} onAddSuccess={handleAddSuccess} />
        )}
    </div>
  );
}


