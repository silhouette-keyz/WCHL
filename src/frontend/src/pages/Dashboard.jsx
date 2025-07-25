import React, { useEffect, useState, useContext } from "react";
import { AuthClient } from "@dfinity/auth-client";
import Layout from "../components/Layout/Layout";
import { getActorInstance } from "../utils/actor";

import HomePage from "./LandingPage/HomePage";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth';

function Dashboard(props) {
  const { loading, user} = useAuth();

  if (loading) {
    return <div className="p-8 text-center">Memuat...</div>;
  }

  return (
    <>
      <h2 className="text-xl text-center font-semibold mb-4">
        Selamat datang di Dashboard!
      </h2>
      {user ? (
        <div className="text-center">
          <p className="mb-1">👤 <strong>Username:</strong> {user.username}</p>
          <p className="mb-1">🔐 <strong>Role:</strong> {user.role}</p>
          <p className="mb-1">🕒 <strong>Registered At:</strong> {new Date(user.registeredAt / 1_000_000).toLocaleString()}</p>
        </div>
      ) : (
        <div className="text-center text-gray-500">Loading user info...</div>
      )}
    </>
  );
}

export default Dashboard;
