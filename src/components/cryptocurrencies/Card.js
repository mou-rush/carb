import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Avatar,
  Box,
} from "@mui/material";

const CryptoCards = () => {
  const [cryptoData, setCryptoData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.coindesk.com/v1/bpi/currentprice.json"
        );
        setCryptoData(response.data);
      } catch (error) {
        console.error("Error fetching cryptocurrency data:", error);
      }
    };

    fetchData();
  }, []);

  const cardStyles = {
    backgroundColor: "#1f1f1f",
    color: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0 4px 8px primary",
    transition: "all 0.3s ease-in-out",
    height: "100%",
  };

  const cardContent = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  };

  const renderCurrencyCards = () => {
    if (!cryptoData) {
      return <div>Loading...</div>;
    }

    const avatarStyles = {
      bgcolor: "#ffc107",
      color: "#1f1f1f",
      width: "56px",
      height: "56px",
    };

    return Object.entries(cryptoData.bpi).map(([currency, data]) => (
      <Grid item xs={12} sm={6} md={4} lg={3} key={currency}>
        <Card sx={cardStyles}>
          <CardContent sx={cardContent}>
            <Avatar mb="20px" sx={avatarStyles}>
              {currency}
            </Avatar>
            <Typography variant="h5" gutterBottom>
              {data.description}
            </Typography>
            <Typography color="primary" gutterBottom>
              {cryptoData.chartName}
            </Typography>
            <Typography variant="h4">{data.rate}</Typography>

            <Typography variant="body2">{cryptoData.disclaimer}</Typography>
          </CardContent>
        </Card>
      </Grid>
    ));
  };

  return (
    <Box className="currency-cards-container">
      <Grid container spacing={3} justifyContent="center">
        {renderCurrencyCards()}
      </Grid>
    </Box>
  );
};

export default CryptoCards;
