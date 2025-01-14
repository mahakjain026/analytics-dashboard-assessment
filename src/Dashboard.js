import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import {
  EVBaseMSRPCount,
  EVBatteryRangeCount,
  EVData,
  EVLocationData,
  loadEVData,
} from "./utils/LoadEVData";
import MapChart from "./components/MapChart";
import Chart from "./components/Chart";
import {
  barOptions,
  histogramOptions,
  lineOptions,
  pieOptions,
} from "./utils/Options";
import { barData, lineData, pieData } from "./utils/ChartData";
import Footer from "./components/Footer";

const Dashboard = () => {
  const [evTypeDistribution, setEvTypeDistribution] = useState({});
  const [make, setMake] = useState({});
  const [modalYear, setModalYear] = useState({});
  const [electricRange, setElectricRange] = useState({});
  const [evLocation, setEvLocation] = useState({});
  const [baseMsrp, setBaseMsrp] = useState({});

  useEffect(() => {
    if (Object.keys(evTypeDistribution).length) {
      sessionStorage.setItem(
        "evTypeDistribution",
        JSON.stringify(evTypeDistribution)
      );
    }
    if (Object.keys(make).length) {
      sessionStorage.setItem("make", JSON.stringify(make));
    }
    if (Object.keys(modalYear).length) {
      sessionStorage.setItem("modalYear", JSON.stringify(modalYear));
    }
    if (Object.keys(electricRange).length) {
      sessionStorage.setItem("electricRange", JSON.stringify(electricRange));
    }
    if (Object.keys(evLocation).length) {
      sessionStorage.setItem("evLocation", JSON.stringify(evLocation));
    }
    if (Object.keys(baseMsrp).length) {
      sessionStorage.setItem("baseMsrp", JSON.stringify(baseMsrp));
    }
  }, [
    evTypeDistribution,
    make,
    modalYear,
    electricRange,
    evLocation,
    baseMsrp,
  ]);

  useEffect(() => {
    const loadStoredData = (key, loaderFunction, setdata, field) => {
      try {
        const storedData = JSON.parse(sessionStorage.getItem(key));
        if (storedData) {
          setdata(storedData);
        } else {
          loadEVData(loaderFunction, setdata, field);
        }
      } catch (error) {
        console.error(`Failed to load data for ${key}`, error);
      }
    };

    loadStoredData(
      "evTypeDistribution",
      EVData,
      setEvTypeDistribution,
      "Electric Vehicle Type"
    );
    loadStoredData("make", EVData, setMake, "Make");
    loadStoredData("modalYear", EVData, setModalYear, "Model Year");
    loadStoredData(
      "electricRange",
      EVBatteryRangeCount,
      setElectricRange,
      "Electric Range"
    );
    loadStoredData("evLocation", EVLocationData, setEvLocation);
    loadStoredData("baseMsrp", EVBaseMSRPCount, setBaseMsrp, "Base MSRP");
  }, []);

  return (
    <div className="flex w-full flex-col p-2 gap-3">
      <Navbar />
      <div className="flex flex-col md:grid md:grid-cols-12 gap-2">
        <div className="col-span-8">
          <Chart
            heading="Year Wise EV Distribution"
            description="Trend of EV distributions over the years."
            data={lineData(modalYear)}
            options={lineOptions}
            type="Line"
            field="Model Year"
          />
        </div>
        <div className="col-span-4">
          <Chart
            heading="EV Type Distribution"
            description="Distribution of Electric Vehicle types across the dataset."
            data={pieData(evTypeDistribution)}
            options={pieOptions}
            type="Doughnut"
          />
        </div>
      </div>
      <div className="flex flex-col md:grid md:grid-cols-12 gap-2">
        <div className="col-span-6">
          <Chart
            heading="EV Manufacturer Distribution"
            description="Distribution of EVs by manufacturer across the dataset."
            data={barData(make, "Number of EVs")}
            options={barOptions}
            type="Bar"
          />
        </div>
        <div className="col-span-6">
          <Chart
            heading="Electric Range vs. EV Count"
            description="Distribution of EVs by Electric range."
            data={barData(electricRange, "EV Count")}
            options={histogramOptions}
            type="Bar"
          />
        </div>
      </div>
      <div className="gap-2">
        <MapChart
          heading="EV Population by Location"
          description="Distribution of EV population by county or city."
          locationData={evLocation}
        />
      </div>
      <div className="flex flex-col md:grid md:grid-cols-12 gap-2">
        <div className="col-span-12">
          <Chart
            heading="Base MSRP Distribution"
            description="Distribution of Electric Vehicles based on Base MSRP."
            data={barData(baseMsrp, "EV Count")}
            options={barOptions}
            type="Bar"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
