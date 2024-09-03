import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ViewEvents = () => {
  const [events, setEvents] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEvent, setCurrentEvent] = useState({
    _id: "",
    name: "",
    location: "",
    date: "",
    description: ""
  });

  const fetchEvent = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/getevent");
      setEvents(response.data.events);
    } catch (error) {
      console.error("Error fetching details", error);
    }
  };

  const deleteEvent = async (eventId) => {
    try {
      await axios.delete(`http://localhost:8000/api/delete/${eventId}`);
      toast.success("Event deleted successfully");
      setEvents(events.filter((event) => event._id !== eventId));
    } catch (error) {
      toast.error("Deletion error");
      console.error("Error deleting event", error);
    }
  };

  const editEvent = (event) => {
    setIsEditing(true);
    setCurrentEvent(event);
  };

  const handleChange = (e) => {
    setCurrentEvent({ ...currentEvent, [e.target.name]: e.target.value });
  };

  const updateEvent = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/event/${currentEvent._id}`, currentEvent);
      toast.success("Event updated successfully");
      setEvents(events.map(event => event._id === currentEvent._id ? currentEvent : event));
      setIsEditing(false);
    } catch (error) {
      toast.error("Error updating event");
      console.error("Error updating event", error);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, []);

  return (
    <div className="p-5">
      <ToastContainer />

      <h1 className="border-l-[9px] border-red-600 pl-7 text-2xl font-semibold">
        ALL EVENTS
      </h1>

      {isEditing ? (
        <form onSubmit={updateEvent} className="p-5">
          <h2>Edit Event</h2>
          <div>
            <label>Event Name:</label>
            <input
              type="text"
              name="name"
              value={currentEvent.name}
              onChange={handleChange}
              className="border p-2 w-full"
            />
          </div>
          <div>
            <label>Location:</label>
            <input
              type="text"
              name="location"
              value={currentEvent.location}
              onChange={handleChange}
              className="border p-2 w-full"
            />
          </div>
          <div>
            <label>Date:</label>
            <input
              type="String"
              name="date"
              value={currentEvent.date}
              onChange={handleChange}
              className="border p-2 w-full"
            />
          </div>
          <div>
            <label>Description:</label>
            <textarea
              name="description"
              value={currentEvent.description}
              onChange={handleChange}
              className="border p-2 w-full"
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded mt-3">
            Update Event
          </button>
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="bg-gray-500 text-white px-3 py-1 rounded mt-3 ml-4"
          >
            Cancel
          </button>
        </form>
      ) : (
        events.map((event) => (
          <div
            key={event._id}
            className="flow-root rounded-lg border border-gray-100 py-3 shadow-sm mt-10"
          >
            <dl className="-my-3 divide-y divide-gray-100 text-sm">
              <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Event Name</dt>
                <dd className="text-gray-700 sm:col-span-2">{event.name}</dd>
              </div>

              <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Location</dt>
                <dd className="text-gray-700 sm:col-span-2">{event.location}</dd>
              </div>

              <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Date</dt>
                <dd className="text-gray-700 sm:col-span-2">{event.date}</dd>
              </div>

              <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Description</dt>
                <dd className="text-gray-700 sm:col-span-2">
                  {event.description}
                </dd>
              </div>

              <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Actions</dt>
                <dd className="text-gray-700 sm:col-span-2 ">
                  <button
                    onClick={() => deleteEvent(event._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => editEvent(event)}
                    className="bg-green-500 text-white px-3 py-1 rounded ml-4"
                  >
                    Edit
                  </button>
                </dd>
              </div>
            </dl>
          </div>
        ))
      )}
    </div>
  );
};

export default ViewEvents;
