import React from "react";

const Navbar = () => {
  const downloadCSV = () => {
    const link = document.createElement("a");
    link.href = "/data-to-visualize/Electric_Vehicle_Population_Data.csv"; // Link to the CSV file in the public folder
    link.setAttribute("download", "EV Dataset.csv"); // Setting the download attribute
    document.body.appendChild(link);
    link.click(); // Simulating click to trigger download
    document.body.removeChild(link); // Clean up
  };

  return (
    <nav className="flex w-full justify-between p-4 md:p-6 bg-gray-800 rounded items-center">
      <div className="text-base md:text-xl font-sans text-orange-400 font-bold">
        EV Analytics Dashboard
      </div>
      <button
        onClick={downloadCSV}
        className="text-sm md:text-lg flex items-center bg-gray-800 text-orange-400 px-2 py-1 md:px-4 md:py-2 border border-orange-400 rounded hover:bg-orange-400 hover:text-white transition duration-300"
      >
        Dataset
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 ml-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 15v6m0 0l-3-3m3 3l3-3M4 7h16a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V8a1 1 0 011-1z"
          />
        </svg>
      </button>
    </nav>
  );
};

export default Navbar;
