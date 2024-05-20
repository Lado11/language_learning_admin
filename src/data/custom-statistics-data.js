export const customStatisticsData = {
  labels: ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
  datasets: [
    {
      label: "369",
      data: [3, 6, 9, 5, 8, 2, 1, 4, 4],
      backgroundColor: "#EDF0F7",
      borderRadius: "10",
      selectedColor: "#FF6633",
      hoverBackgroundColor: ["#FF6633"],
      borderWidth: 0,
    }, //
  ],
};

export const customStatisticsOptions = {
  plugins: {
    legend: {
      display: false, // Hide the legend
    },
  },
  scales: {
    x: {
      xAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
      grid: {
        display: false, // Removes the background lines from the x-axis
      },
    },
    y: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
      grid: {
        display: false, // Removes the background lines from the y-axis
      },
      ticks: {
        display: false,
      },
      drawBorder: false,
    },
  },
};
