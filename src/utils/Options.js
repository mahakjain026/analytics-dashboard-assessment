export const pieOptions = {
  animation: {
    animateRotate: true,
    animateScale: true,
    duration: 1500,
    easing: "easeOutCirc",
  },
  plugins: {
    legend: {
      position: "bottom",
      labels: {
        font: {
          size: 10,
          weight: "bold",
        },
        color: "white",
        padding: 10,
        usePointStyle: true,
      },
    },
    datalabels: {
      color: "#fff",
      formatter: (value) => {
        return `${value}`;
      },
      font: {
        size: 12,
        weight: "bold",
      },
      anchor: "center",
      align: "center",
    },
  },
};

export const barOptions = {
  plugins: {
    legend: {
      position: "top",
      labels: {
        font: {
          size: 10,
          weight: "bold",
        },
        color: "white",
      },
    },
    datalabels: {
      color: "#fff",
      anchor: "end",
      align: "top",
      offset: -5,
      font: {
        size: 10,
        weight: "bold",
      },
      formatter: (value) => {
        return `${value}`;
      },
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: "Manufacturers",
        color: "white",
        font: {
          size: 12,
          weight: "bold",
        },
      },
      ticks: {
        color: "white",
      },
    },
    y: {
      title: {
        display: true,
        text: "Number of Vehicles",
        color: "white",
        font: {
          size: 12,
          weight: "bold",
        },
      },
      ticks: {
        color: "white",
      },
    },
  },
  animation: {
    delay: (context) => {
      let delay = 0;
      if (context.type === "data" && context.mode === "default") {
        delay = context.dataIndex * 50 + context.datasetIndex * 50;
      }
      return delay;
    },
  },
};

export const histogramOptions = {
  plugins: {
    legend: {
      position: "top",
      labels: {
        font: {
          size: 10,
          weight: "bold",
        },
        color: "white",
      },
    },
    datalabels: {
      display: true,
      color: "#fff",
      font: {
        size: 12,
        weight: "bold",
      },
      anchor: "end",
      align: "top",
      offset: -5,
      formatter: (value) => `${value}`,
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: "Electric Range (miles)",
        color: "white",
        font: {
          size: 12,
          weight: "bold",
        },
      },
      ticks: {
        color: "white",
      },
    },
    y: {
      title: {
        display: true,
        text: "Number of Vehicles",
        color: "white",
        font: {
          size: 12,
          weight: "bold",
        },
      },
      ticks: {
        color: "white",
      },
    },
  },
  animation: {
    delay: (context) => {
      let delay = 0;
      if (context.type === "data" && context.mode === "default") {
        delay = context.dataIndex * 300 + context.datasetIndex * 100;
      }
      return delay;
    },
  },
};

export const lineOptions = {
  animation: {
    duration: 1000,
    delay: (context) => context.dataIndex * 150,
    loop: false,

    animations: {
      y: {
        from: 0,
        delay: (context) => context.dataIndex * 50,
        duration: 100,
      },
    },
  },
  plugins: {
    legend: {
      position: "top",
      labels: {
        font: {
          size: 10,
          weight: "bold",
        },
        color: "white",
      },
    },
    datalabels: {
      color: "#fff",
      font: {
        size: 12,
        weight: "bold",
      },
      anchor: "end",
      align: "top",
      offset: -5,
      formatter: (value) => `${value}`,
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: "Year",
        color: "white",
        font: {
          size: 12,
          weight: "bold",
        },
      },
      ticks: {
        color: "white",
      },
    },
    y: {
      title: {
        display: true,
        text: "Number of Registrations",
        color: "white",
        font: {
          size: 12,
          weight: "bold",
        },
      },
      ticks: {
        color: "white",
      },
    },
  },
};
