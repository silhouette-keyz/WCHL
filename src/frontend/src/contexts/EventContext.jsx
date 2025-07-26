import React, { useState, useContext, createContext } from "react";
import { backend } from "declarations/backend";
import sha256 from 'crypto-js/sha256';
const EventContext = createContext();

function EventProvider({ children }) {
  const [eventList, setEventList] = useState([]);
  const [participantList, setParticipantList] = useState([])
  const [certificateList, setCertificateList] = useState([])
  const [myCertificateList, setMyCertificateList] = useState([])

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
    return fixBigInt(res)
  };

  const addDataEvent = async(eventName, eventType, eventDate) => {
    const res = await backend.addEventData(eventName, eventType, eventDate);
    getAllEvent()
  };

  const registerEvent = async(eventId) => {
    console.log('eventId', eventId)
    const res = await backend.joinEvent(Number(eventId));
    console.log('registerEvent', res)
    fetchParticipants(eventId)
  };

  const fetchParticipants = async (eventId) => {
    try {
      const result = await backend.getParticipantEvent(Number(eventId));
      console.log('result', result)
      setParticipantList(fixBigInt(result));
      return fixBigInt(result)
    } catch (err) {
      console.error("Gagal ambil peserta:", err);
    }
  };

  const createNFTCertificate = async(eventId, principal) => {
    console.log(eventId, principal)
    const timestamp = Date.now().toString();
    const inputString = `${eventId}-${principal}-${timestamp}`;
    console.log(inputString)
    const hash = sha256(inputString).toString(); // SHA256 hash
    console.log(hash)
    const res = await backend.createCertificate(Number(eventId), hash);
    console.log('createNFTCertificate', res)
    getCertificateEvent(eventId)
  };

  const getCertificateEvent = async (eventId) => {
    try {
      const result = await backend.getCertificatesByEvent(Number(eventId));
      setCertificateList(fixBigInt(result));
      return fixBigInt(result)
    } catch (err) {
      console.error("Gagal ambil peserta:", err);
    }
  };

  const getMyCertificates = async () => {
    try {
      const result = await backend.getMyCertificates();
      setMyCertificateList(fixBigInt(result));
      return fixBigInt(result)
    } catch (err) {
      console.error("Gagal ambil peserta:", err);
    }
  };
  

  return (
    <EventContext.Provider value={{ eventList, getAllEvent, addDataEvent, participantList, 
    fetchParticipants, registerEvent,
    getMyCertificates, getCertificateEvent,
    myCertificateList, certificateList,
    createNFTCertificate
    }}>
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
