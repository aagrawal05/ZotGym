import { useState } from 'react';

export default function SignupForm() {
  const [formData, setFormData] = useState({
    fname: '',
    email: '',
    pword: '',
    phone_number: '',
    gender: '',
    physical_interest: '',
    gym_location: '',
    profile_pic: '',
  });
  const [selectedSports, setSelectedSports] = useState([]);
  const [step, setStep] = useState(1);
  const [schedule, setSchedule] = useState(
    Array(7).fill().map(() => Array(3).fill(false)) // 7 days, 3 times (Morning, Afternoon, Evening)
  );

  const availableSports = ["Basketball", "Soccer", "Tennis", "Baseball", "Football", "Hockey"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleChangeSport = (event) => {
    const value = Array.from(event.target.selectedOptions, (option) => option.value);

    // Limit the number of selections to 3
    if (value.length <= 3) {
      setSelectedSports(value);
    }
  };

  const handleToggleSchedule = (dayIndex, timeIndex) => {
    const updatedSchedule = [...schedule];
    updatedSchedule[dayIndex][timeIndex] = !updatedSchedule[dayIndex][timeIndex];
    setSchedule(updatedSchedule);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    console.log('Selected Sports:', selectedSports);
    console.log('Schedule:', schedule);
  };

  if (step === 1) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setStep(2);
          }}
          className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
        >
          <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">Sign Up</h2>

          {/* Full Name */}
          <div className="mb-4">
            <label
              htmlFor="fname"
              className="block text-sm font-medium text-gray-600"
            >
              Full Name:
            </label>
            <input
              type="text"
              id="fname"
              name="fname"
              value={formData.fname}
              onChange={handleChange}
              placeholder="Your full name"
              required
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
            />
          </div>

        {/* Email */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-600"
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            required
            className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label
            htmlFor="pword"
            className="block text-sm font-medium text-gray-600"
          >
            Password:
          </label>
          <input
            type="password"
            id="pword"
            name="pword"
            value={formData.pword}
            onChange={handleChange}
            placeholder="Your password"
            required
            className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
          />
        </div>

        {/* Phone Number */}
        <div className="mb-4">
          <label
            htmlFor="phone_number"
            className="block text-sm font-medium text-gray-600"
          >
            Phone Number:
          </label>
          <input
            type="tel"
            id="phone_num"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            placeholder="Your phone number"
            required
            className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
          />
        </div>

        {/* Gender */}
        <div className="mb-4">
          <label
            htmlFor="gender"
            className="block text-sm font-medium text-gray-600"
          >
            Gender:
          </label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
          >
            <option value="" disabled>Select your gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

          {/* Other form fields (email, password, etc.) go here */}



          {/* Sports Preference */}
          <div className="mb-4">
            <label
              htmlFor="physical_interest"
              className="block text-sm font-medium text-gray-600"
            >
              Sports Preference:
            </label>
            <select
              id="physical_interest"
              name="physical_interest"
              value={selectedSports}
              onChange={handleChangeSport}
              multiple
              required
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
            >
              {availableSports.map((sport) => (
                <option key={sport} value={sport}>
                  {sport}
                </option>
              ))}
            </select>

            {/* Selected Sports Badges */}
            <div className="mt-2">
              {selectedSports.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {selectedSports.map((sport, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full"
                    >
                      {sport}
                      <button
                        type="button"
                        onClick={() => {
                          const newSelectedSports = selectedSports.filter((item) => item !== sport);
                          setSelectedSports(newSelectedSports);
                        }}
                        className="ml-1 text-indigo-600"
                      >
                        x
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

        {/* Gym Location */}
        <div className="mb-4">
          <label
            htmlFor="gym_location"
            className="block text-sm font-medium text-gray-600"
          >
            Gym Locations:
          </label>
          <input
            type="text"
            id="gym_loc"
            name="gym_location"
            value={formData.gym_location}
            onChange={handleChange}
            placeholder="Gym location"
            required
            className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
          />
        </div>

        {/* Profile Picture */}
        <div className="mb-4">
          <label
            htmlFor="profile_pic"
            className="block text-sm font-medium text-gray-600"
          >
            Profile Picture (optional):
          </label>
          <input
            type="url"
            id="profile_pic"
            name="profile_pic"
            value={formData.profile_pic}
            onChange={handleChange}
            placeholder="URL of your profile picture"
            className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
          />
        </div>



          <button
            type="submit"
            className="w-full py-3 bg-indigo-500 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Next
          </button>
        </form>
      </div>
    );
  }

  if (step === 2) {
    const days = ["M", "T", "W", "T", "F", "S", "S"];
    const times = ["Morning", "Afternoon", "Evening"];

    return (
      <div className="min-h-screen flex flex-col items-center bg-gray-100 py-8">
        <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">Select Availability</h2>
        <div className="grid grid-cols-7 gap-4">
          {days.map((day, dayIndex) => (
            <div key={dayIndex} className="flex flex-col items-center">
              <span className="font-bold text-gray-600 mb-2">{day}</span>
              {times.map((time, timeIndex) => (
                <button
                  key={timeIndex}
                  className={`w-16 h-16 rounded-lg mb-2 text-sm ${
                    schedule[dayIndex][timeIndex] ? "bg-green-500" : "bg-red-500"
                  }`}
                  onClick={() => handleToggleSchedule(dayIndex, timeIndex)}
                >
                    {time}
                </button>
              ))}
            </div>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          className="mt-6 py-3 px-6 bg-indigo-500 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </div>
    );
  }
}

// import { useState } from 'react';

// export default function SignupForm() {
//   const [formData, setFormData] = useState({
//     fname: '',
//     email: '',
//     pword: '',
//     phone_number: '',
//     gender: '',
//     physical_interest: '',
//     workout_time: '',
//     gym_location: '',
//     profile_pic: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const [selectedSports, setSelectedSports] = useState([]);
//   const availableSports = ["Basketball", "Soccer", "Tennis", "Baseball", "Football", "Hockey"];

//   const handleChangeSport = (event) => {
//     const value = Array.from(event.target.selectedOptions, option => option.value);

//     // Limit the number of selections to 3
//     if (value.length <= 3) {
//       setSelectedSports(value);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle form submission logic here
//     console.log(formData);
//   };

//   return (
//     <div className="min-h-screen flex justify-center items-center bg-gray-100">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
//       >
//         <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">
//           Sign Up
//         </h2>

//         {/* Full Name */}
//         <div className="mb-4">
//           <label
//             htmlFor="fname"
//             className="block text-sm font-medium text-gray-600"
//           >
//             Full Name:
//           </label>
//           <input
//             type="text"
//             id="fname"
//             name="fname"
//             value={formData.fname}
//             onChange={handleChange}
//             placeholder="Your full name"
//             required
//             className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
//           />
//         </div>

        // {/* Email */}
        // <div className="mb-4">
        //   <label
        //     htmlFor="email"
        //     className="block text-sm font-medium text-gray-600"
        //   >
        //     Email:
        //   </label>
        //   <input
        //     type="email"
        //     id="email"
        //     name="email"
        //     value={formData.email}
        //     onChange={handleChange}
        //     placeholder="you@example.com"
        //     required
        //     className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
        //   />
        // </div>

        // {/* Password */}
        // <div className="mb-4">
        //   <label
        //     htmlFor="pword"
        //     className="block text-sm font-medium text-gray-600"
        //   >
        //     Password:
        //   </label>
        //   <input
        //     type="password"
        //     id="pword"
        //     name="pword"
        //     value={formData.pword}
        //     onChange={handleChange}
        //     placeholder="Your password"
        //     required
        //     className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
        //   />
        // </div>

        // {/* Phone Number */}
        // <div className="mb-4">
        //   <label
        //     htmlFor="phone_number"
        //     className="block text-sm font-medium text-gray-600"
        //   >
        //     Phone Number:
        //   </label>
        //   <input
        //     type="tel"
        //     id="phone_num"
        //     name="phone_number"
        //     value={formData.phone_number}
        //     onChange={handleChange}
        //     placeholder="Your phone number"
        //     required
        //     className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
        //   />
        // </div>

        // {/* Gender */}
        // <div className="mb-4">
        //   <label
        //     htmlFor="gender"
        //     className="block text-sm font-medium text-gray-600"
        //   >
        //     Gender:
        //   </label>
        //   <select
        //     id="gender"
        //     name="gender"
        //     value={formData.gender}
        //     onChange={handleChange}
        //     required
        //     className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
        //   >
        //     <option value="" disabled>Select your gender</option>
        //     <option value="male">Male</option>
        //     <option value="female">Female</option>
        //     <option value="other">Other</option>
        //   </select>
        // </div>

//         <div className="mb-4">
//           <label
//             htmlFor="physical_interest"
//             className="block text-sm font-medium text-gray-600"
//           >
//             Sports Preference:
//           </label>
//           <select
//             id="physical_interest"
//             name="physical_interest"
//             value={selectedSports}
//             onChange={handleChangeSport}
//             multiple
//             required
//             className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
//           >
//             {availableSports.map((sport) => (
//               <option key={sport} value={sport}>
//                 {sport}
//               </option>
//             ))}
//           </select>

//           <div className="mt-2">
//             {/* Show badges for selected sports */}
//             {selectedSports.length > 0 && (
//               <div className="flex flex-wrap gap-2">
//                 {selectedSports.map((sport, index) => (
//                   <span
//                     key={index}
//                     className="inline-flex items-center px-2 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full"
//                   >
//                     {sport}
//                     <button
//                       type="button"
//                       onClick={() => {
//                         const newSelectedSports = selectedSports.filter((item) => item !== sport);
//                         setSelectedSports(newSelectedSports);
//                       }}
//                       className="ml-1 text-indigo-600"
//                     >
//                       x
//                     </button>
//                   </span>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Gym Location */}
//         <div className="mb-4">
//           <label
//             htmlFor="gym_location"
//             className="block text-sm font-medium text-gray-600"
//           >
//             Gym Locations:
//           </label>
//           <input
//             type="text"
//             id="gym_loc"
//             name="gym_location"
//             value={formData.gym_location}
//             onChange={handleChange}
//             placeholder="Gym location"
//             required
//             className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
//           />
//         </div>

//         {/* Profile Picture */}
//         <div className="mb-4">
//           <label
//             htmlFor="profile_pic"
//             className="block text-sm font-medium text-gray-600"
//           >
//             Profile Picture (optional):
//           </label>
//           <input
//             type="url"
//             id="profile_pic"
//             name="profile_pic"
//             value={formData.profile_pic}
//             onChange={handleChange}
//             placeholder="URL of your profile picture"
//             className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
//           />
//         </div>

//         {/* Next Button */}
//         <button
//           type="Next"
//           className="w-full py-3 bg-indigo-500 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//         >
//           Next
//         </button>
//       </form>
//     </div>
//   );
// }
