import Image from "next/image";
import Head from "next/head";

import { useEffect, useState } from "react";
import { checkAuth } from "@/hooks/auth";

import Profile from "@/components/profile";

export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = checkAuth(false);
    if (userData) setUser(userData);
  }, []);

  return (
    <>
      <Head>
        <title>Zot GymMates</title>
      </Head>

      <div className="flex flex-col items-center p-5 min-h-screen">
        <header className="flex flex-row justify-between gap-5 w-full px-5 py-2">
          <div className="flex items-center gap-2">
            <img
              src="https://brand.uci.edu/master-branding/marks/_img/BCeater-right-768x416.png"
              alt="peter"
              className="h-[50px]"
            />
            <div className="text-2xl font-holtwood text-black">Zot GymMates</div>
          </div>
          <nav className="grid grid-flow-col place-content-center gap-8">
              {user ? (<Profile {...user} />) : 
                (<div>
                  <button className="text-xl text-black mr-7" onClick={() => { window.location.href = '/login'}}>Login</button>
                  <button className="text-xl text-black" onClick={() => { window.location.href = '/signup'}}>Sign Up</button>
                </div>)
              }
          </nav>
        </header>

        <main className="flex justify-between items-center flex-grow w-full max-w-screen-lg">
          <div className="flex-1 flex flex-col items-center p-5 font-jersey mt-[170px] mb-[20%]">
            <h1 className="text-4xl text-black">Looking for Gymmates?</h1>
            <button className="mt-12 px-6 py-3 text-black bg-blue-500 rounded-3xl text-xl cursor-pointer">
              Find ZotMates
            </button>
          </div>

          <div className="flex-1 flex justify-center items-center rounded-full overflow-hidden">
            <img
              src="https://img.freepik.com/free-photo/group-people-exercising-together-outdoors_23-2151061449.jpg?semt=ais_hybrid"
              alt="Group workout"
              className="w-full object-cover"
            />
          </div>
        </main>
        <section class="grid md:grid-cols-3 gap-8 px-8 py-12 " style={{}}>
          <div class="flex flex-col bg-gray-50 rounded-lg shadow-lg overflow-hidden">
            <img src="image 3.png" alt="Mesa Court Fitness" class="h-64 w-full object-cover"/>
            <div class="p-6">
              <h3 class="text-xl font-bold text-black">Mesa Court Fitness</h3>
                <p class="mt-4 text-gray-700">
                  Monday - Friday: 9:30AM - 11PM<br />
                  Saturday: 9:30AM - 11PM<br />
                  Sunday: 9:30AM - 11PM
                </p>
            </div>
          </div>

          <div class="flex flex-col bg-gray-50 rounded-lg shadow-lg overflow-hidden">
            <img src="image 4.png" alt="Middle Earth Fitness" class="h-64 w-full object-cover"/>
              <div class="p-6">
                <h3 class="text-xl font-bold text-black">Middle Earth Fitness</h3>
                  <p class="mt-4 text-gray-700">
                    Monday - Friday: 9:30AM - 11PM<br />
                    Saturday: 9:30AM - 11PM<br />
                    Sunday: 9:30AM - 11PM
                  </p>
              </div>
          </div>

          <div class="flex flex-col bg-gray-50 rounded-lg shadow-lg overflow-hidden">
            <img src="image 5.png" alt="ARC" class="h-64 w-full object-cover"/>
              <div class="p-6">
                <h3 class="text-xl font-bold text-black">ARC</h3>
                  <p class="mt-4 text-gray-700">
                    Monday - Friday: 6AM - 12PM<br />
                    Saturday: 8AM - 9PM<br />
                    Sunday: 8AM - 12PM
                  </p>
              </div>
          </div>
        </section>
      </div>
    </>
  );
}

