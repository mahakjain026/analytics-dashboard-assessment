export const pieData = (data) => {
  return {
    labels: Object.keys(data),
    datasets: [
      {
        data: Object.values(data),
        backgroundColor: ["#fb923c", "#4b5563", "#fed7aa", "#fdba74"],
        hoverOffset: 4,
      },
    ],
  };
};

export const barData = (data, label) => {
  return {
    labels: Object.keys(data),
    datasets: [
      {
        label: label,
        data: Object.values(data),
        backgroundColor: "#fed7aa",
        borderColor: "#fb923c",
        borderWidth: 1,
      },
    ],
  };
};

export const lineData = (data) => {
  return {
    labels: Object.keys(data).sort(), // Sorting in ascending order
    datasets: [
      {
        label: "EV Registrations",
        data: Object.values(data),
        borderColor: "#fb923c",
        backgroundColor: "#fed7aa",
        fill: true,
        tension: 0.3,
      },
    ],
  };
};
