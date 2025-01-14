import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
} from "chart.js";
import { Bar, Doughnut, Line, Pie } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

ChartJS.register(
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement
);

const Chart = ({
  heading,
  description,
  data,
  options,
  type,
  field,
  styleValue = "",
}) => {
  const [geminiAnalysis, setGeminiAnalysis] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    const geminiAnalysis = async () => {
      try {
        const gptQuery =
          "Act as a Professional Analysis Expert for large Electric Vehicle Population dataset which consist of these columns: VIN (1-10), County, City, State, Postal Code, Model Year, Make, Model, Electric Vehicle Type, Clean Alternative Fuel Vehicle (CAFV) Eligibility, Electric Range, Base MSRP	Legislative District, DOL Vehicle ID, Vehicle Location, Electric Utility, 2020 Census Tract." +
          "The data which is provided is an Object for" +
          field +
          "column, and heading:" +
          heading +
          "; along with description:" +
          description +
          "; Through which" +
          type +
          "of chart will be displayed for the data:" +
          data +
          ". Only provide the analysis in one single line within 10-20 words. Also, without any bold letters.";

        const dataResponse = await model.generateContent(gptQuery);
        const dataResult = dataResponse?.response?.text();
        setGeminiAnalysis(dataResult);
        setError(false);
      } catch (error) {
        console.error("Error while generating AI analysis:", error);
        setGeminiAnalysis(
          "There was an error while generating the result. Please try again later."
        );
        setError(true);
      }
    };

    geminiAnalysis();
  }, [data, description, field, heading, type]);

  return (
    <div className={`bg-gray-800 rounded-lg p-3 ${styleValue}`}>
      <h2 className="text-sm md:text-xl font-semibold mb-2 text-white">
        {heading}
      </h2>
      <p className="text-sm font-semibold text-orange-300 mb-2">
        {description}
      </p>
      {type === "Pie" && (
        <Pie data={data} options={options} plugins={[ChartDataLabels]} />
      )}
      {type === "Bar" && (
        <Bar data={data} options={options} plugins={[ChartDataLabels]} />
      )}
      {type === "Doughnut" && (
        <Doughnut data={data} options={options} plugins={[ChartDataLabels]} />
      )}
      {type === "Line" && (
        <Line data={data} options={options} plugins={[ChartDataLabels]} />
      )}
      <p
        className={`text-sm ${error ? "text-red-500" : "text-orange-300"} mb-2`}
      >
        <span className="font-bold text-red-300">AI Analysis: </span>
        {geminiAnalysis}
      </p>
    </div>
  );
};

export default Chart;
