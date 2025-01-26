import { useEffect, useState } from "react";

import { checkAuth } from "@/hooks/auth";

export default function ForYou() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = checkAuth(true);
    if (userData) setUser(userData);
    const matchData = fetch("http://localhost:3000/foryou/" + userData.id)
  }, []);

  return (
    <>
      <Head>
        <title>Zot GymMates</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Jersey+20&display=swap"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Hammersmith+One&family=Holtwood+One+SC&family=Jersey+20&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className="flex flex-col items-center p-5 bg-white min-h-screen">
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
            {user ? <Profile {...user} /> : <button className="text-xl">Login</button>}
          </nav>
        </header>

        <main className="flex justify-between items-center flex-grow w-full max-w-screen-lg">
          <div className="flex-1 flex flex-col items-center p-5 font-jersey mt-[170px] mb-[20%]">
            <h1 className="text-4xl text-black">Looking for Gymmates?</h1>
            <button className="mt-12 px-6 py-3 text-white bg-blue-500 rounded-3xl text-xl cursor-pointer">
              Find ZotMates
            </button>
          </div>

          <div className="flex-1 flex justify-center items-center rounded-full overflow-hidden">
            <img
              src="https://img.freepik.com/free-photo/group-people-exercising-together-outdoors_23-2151061449.jpg?semt=ais_hybrid"
              alt="Group workout"
              className="w-full max-w-[400px] max-h-[200px] object-cover"
            />
          </div>
        </main>
      </div>
    </>
  );
}
