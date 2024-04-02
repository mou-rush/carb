import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  ArcElement,
} from "chart.js";
import { Line, Bar, Doughnut, Bubble } from "react-chartjs-2";
import { Box, Grid } from "@mui/material";
import PageContainer from "../../common/PageContainer";

const Population = () => {
  Chart.register(
    ArcElement,
    LineElement,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    Title,
    Tooltip
  );

  const [populationData, setPopulationData] = useState(null);

  const fetchPopulationData = async () => {
    try {
      const response = await axios.get(
        "https://datausa.io/api/data?drilldowns=Nation&measures=Population"
      );
      setPopulationData(response.data.data);
    } catch (error) {
      console.error("Error fetching population data:", error);
    }
  };

  useEffect(() => {
    fetchPopulationData();
  }, []);

  if (!populationData) {
    return <div>Loading...</div>;
  }

  const nations = populationData.map((entry) => entry.Nation);
  const populations = populationData.map((entry) => entry.Population);
  const years = populationData.map((entry) => entry.Year);

  const lineChartData = {
    labels: years,
    datasets: [
      {
        label: "Population",
        data: populations,
        fill: false,
        borderColor: "#AEFE14",
        borderWidth: 3,
      },
    ],
  };

  const barChartData = {
    labels: nations,
    datasets: [
      {
        label: "Population",
        data: populations,
        backgroundColor: "#ff00ff",
        borderWidth: 1,
      },
    ],
  };

  const doughnutChartData = {
    labels: nations,
    datasets: [
      {
        label: "Population",
        data: populations,
        backgroundColor: ["#00ffff", "#ff00ff", "#ffff00"],
        borderWidth: 1,
      },
    ],
  };

  const bubbleChartData = {
    labels: nations,
    datasets: [
      {
        label: "Population",
        data: populationData.map((entry) => ({
          x: entry.Year,
          y: entry.Population,
          r: 10,
        })),
        backgroundColor: "#ff8000",
        borderWidth: 1,
      },
    ],
  };
  const options = {
    plugins: {
      title: {
        display: true,
        text: "Population Statistics",
        font: {
          size: 20,
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.dataset.label || "";
            const value = context.parsed.y || 0;
            const year = years[context.dataIndex];

            return `${label} (${year}): ${value.toLocaleString()}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Population",
          font: {
            size: 16,
          },
        },
      },
      x: {
        title: {
          display: true,
          text: "Year/Nation",
          font: {
            size: 16,
          },
        },
        ticks: {
          autoSkip: false,
          maxRotation: 45,
          minRotation: 0,
        },
      },
    },
    animation: {
      duration: 2000,
    },
  };

  const graphStyles = {
    height: "250px",
    width: "100%",
    borderRadius: "8px",
    boxShadow: "0 2px 2px #AEFE14",
    display: "flex",
    backgroundColor: "#e4cdcd08",
    justifyContent: "center",
    alignItems: "center",
    padding: "15px",
  };

  return (
    <PageContainer
      pageTitle="Population Page"
      content={
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box sx={graphStyles}>
              <Line data={lineChartData} options={options} />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={graphStyles}>
              <Bar data={barChartData} options={options} />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={graphStyles}>
              <Doughnut data={doughnutChartData} options={options} />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={graphStyles}>
              <Bubble data={bubbleChartData} options={options} />
            </Box>
          </Grid>
        </Grid>
      }
    />
  );
};

export default Population;
