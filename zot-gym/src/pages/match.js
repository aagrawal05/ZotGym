import Image from "next/image";
import Head from "next/head";

import { useEffect, useState } from "react";
import { checkAuth } from "@/hooks/auth";
import styles from "@/styles/match.module.css";

import Profile from "@/components/profile";

export default function Matches() {
  const [user, setUser] = useState(null);
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const userData = checkAuth(true);
    if (userData) {
      setUser(userData);
      const asyncFetch = async () => {
        const res = await fetch(
          "http://127.0.0.1:5000/foryou/" + userData.id,
        ).then((res) => res.json());
        setMatches(res);
      };
      asyncFetch();
    }
  }, []);

  return (
    <>
      <Head>
        <title>Zot GymMates</title>
      </Head>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-5xl font-semibold text-gray-900 tracking-tight my-9 text-center">
            Your Matches 
        </h1>
        {matches.map((match) => {
          const matchData = {
            id: match[0],
            name: match[2],
            interests: match[5],
            avail: match[6],
            location: match[7],
            pfp: match[8],
          };

          return (
            <div className="bg-white rounded-lg shadow-md p-4 mb-6 flex flex-col items-center"
                    onClick = {() => window.location.href = '/room/'+matchData.id}>
              <img
                src={
                  matchData.pfp
                    ? matchData.pfp
                    : "https://static-00.iconduck.com/assets.00/profile-circle-icon-256x256-cm91gqm2.png"
                }
                alt={`${matchData.name}'s profile`}
                className="w-24 h-24 rounded-full object-cover mb-4"
              />
              <h2 className="text-xl font-semibold text-gray-800">
                {matchData.name}
              </h2>
              <p className="text-gray-600 mt-2">
                <strong>Interests:</strong> {matchData.interests}
              </p>
              <p className="text-gray-600 mt-2">
                <strong>Available:</strong> {matchData.avail}
              </p>
              <p className="text-gray-600 mt-2">
                <strong>Location:</strong> {matchData.location}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
}
