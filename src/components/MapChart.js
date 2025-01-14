import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const customIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [0, -41],
});

const MapChart = ({ heading, description, locationData }) => {
  const [geminiAnalysis, setGeminiAnalysis] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchGeminiAnalysis = async () => {
      try {
        const gptQuery =
          "As a professional analysis expert, provide a one-line insight (10-20 words) on the Electric Vehicle population distribution based on location data: " +
          JSON.stringify(locationData) +
          ". The analysis should be concise and without any bold letters.";

        const dataResponse = await model.generateContent(gptQuery);
        const dataResult = dataResponse?.response?.text();
        setGeminiAnalysis(dataResult);
        setError(false);
      } catch (error) {
        console.error("Error while generating AI analysis:", error);
        setGeminiAnalysis(
          "There was an error generating the result. Please try again later."
        );
        setError(true);
      }
    };

    fetchGeminiAnalysis();
  }, [locationData]);

  return (
    <div className="w-full bg-gray-800 rounded-lg p-3">
      <h2 className="text-xl font-semibold mb-2 text-white">{heading}</h2>
      <p className="text-sm font-semibold text-white mb-2">{description}</p>

      <MapContainer
        center={[47.6062, -122.3321]}
        zoom={8}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
        />

        {Object.entries(locationData).map(
          ([location, { count, latitude, longitude }]) => (
            <Marker
              key={location}
              position={[latitude, longitude]}
              icon={customIcon}
            >
              <Popup>
                <strong>{location}</strong>
                <br />
                EV Population: {count}
              </Popup>
            </Marker>
          )
        )}
      </MapContainer>

      <p
        className={`text-sm mt-3 ${error ? "text-red-500" : "text-orange-300"}`}
      >
        <span className="font-bold text-red-300">AI Analysis: </span>
        {geminiAnalysis}
      </p>
    </div>
  );
};

export default MapChart;
