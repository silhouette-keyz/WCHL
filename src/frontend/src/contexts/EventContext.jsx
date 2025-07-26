import React, { useState, useContext, createContext } from "react";
import { backend } from "declarations/backend";
const EventContext = createContext();

function EventProvider({ children }) {
  const [eventList, setEventList] = useState([]);
  const [participantList, setParticipantList] = useState([])

  const fixBigInt = (obj) =>
    JSON.parse(
      JSON.stringify(obj, (_, value) =>
        typeof value === "bigint" ? value.toString() : value
      )
  );
  const getAllEvent = async() => {
    const res = await backend.getAllEventData();
    console.log('getAllEvent', res)
    setEventList(fixBigInt(res))
  };

  const addDataEvent = async(eventName, eventType, eventDate) => {
    const res = await backend.addEventData(eventName, eventType, eventDate);
    getAllEvent()
  };

  const fetchParticipants = async (eventId) => {
    try {
      const result = await backend.getParticipantEvent(Number(eventId));
      console.log('result', result)
      setParticipantList(fixBigInt(result));
    } catch (err) {
      console.error("Gagal ambil peserta:", err);
    }
  };
  

  return (
    <EventContext.Provider value={{ eventList, getAllEvent, addDataEvent, participantList, fetchParticipants }}>
      {children}
    </EventContext.Provider>
  );
}

// Custom Hook
function useEvent() {
  const context = useContext(EventContext);
  if (context === undefined) {
    throw new Error("useLayout must be used within a LayoutProvider");
  }
  return context;
}

export { EventProvider, useEvent };
