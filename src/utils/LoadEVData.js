import Papa from "papaparse";

// Function to load and parse the CSV data
export const loadEVData = (func, setDataCallback, field) => {
  Papa.parse("/data-to-visualize/Electric_Vehicle_Population_Data.csv", {
    download: true,
    header: true,
    complete: (result) => {
      func({ result, setDataCallback, field });
    },
  });
};

// Count EVs by a specific field
export const EVData = ({ result, setDataCallback, field }) => {
  const evData = {};

  result.data.forEach((row) => {
    const evField = row[field];
    if (evField) {
      evData[evField] = (evData[evField] || 0) + 1;
    }
  });

  setDataCallback(evData);
};

// Count EVs by location and extract coordinates
export const EVLocationData = ({ result, setDataCallback }) => {
  const locationData = {};

  result.data.forEach((row) => {
    const location = row["City"] || row["County"];
    const coordinates = row["Vehicle Location"];

    if (location && coordinates) {
      const match = coordinates.match(/-?\d+\.\d+/g);
      if (match) {
        const longitude = Number(match[0]);
        const latitude = Number(match[1]);

        if (!locationData[location]) {
          locationData[location] = { count: 0, latitude, longitude };
        }
        locationData[location].count += 1;
      }
    }
  });

  setDataCallback(locationData);
};

// Count EVs by battery range
export const EVBatteryRangeCount = ({ result, setDataCallback, field }) => {
  const batteryRangeCounts = {
    "0-50": 0,
    "50-100": 0,
    "100-150": 0,
    "150-200": 0,
    "200-250": 0,
    "250+": 0,
  };

  result.data.forEach((row) => {
    const batteryRange = parseInt(row[field], 10);

    if (!isNaN(batteryRange)) {
      if (batteryRange <= 50) batteryRangeCounts["0-50"] += 1;
      else if (batteryRange <= 100) batteryRangeCounts["50-100"] += 1;
      else if (batteryRange <= 150) batteryRangeCounts["100-150"] += 1;
      else if (batteryRange <= 200) batteryRangeCounts["150-200"] += 1;
      else if (batteryRange <= 250) batteryRangeCounts["200-250"] += 1;
      else batteryRangeCounts["250+"] += 1;
    }
  });

  setDataCallback(batteryRangeCounts);
};

// Count EVs by Base MSRP
export const EVBaseMSRPCount = ({ result, setDataCallback, field }) => {
  const msrpCounts = {
    "0-20k": 0,
    "20k-40k": 0,
    "40k-60k": 0,
    "60k-80k": 0,
    "80k-100k": 0,
    "100k+": 0,
  };

  result.data.forEach((row) => {
    const msrp = parseInt(row[field], 10);

    if (!isNaN(msrp) && msrp > 0) {
      if (msrp <= 20000) msrpCounts["0-20k"] += 1;
      else if (msrp <= 40000) msrpCounts["20k-40k"] += 1;
      else if (msrp <= 60000) msrpCounts["40k-60k"] += 1;
      else if (msrp <= 80000) msrpCounts["60k-80k"] += 1;
      else if (msrp <= 100000) msrpCounts["80k-100k"] += 1;
      else msrpCounts["100k+"] += 1;
    }
  });

  setDataCallback(msrpCounts);
};
