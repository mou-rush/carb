import PageContainer from "../../common/PageContainer";
import CryptoCard from "./Card";
import { Box } from "@mui/material";
const Cryptocurrency = () => {
  return (
    <Box className="content-container">
      <PageContainer pageTitle="Crypto Prices" content={<CryptoCard />} />
    </Box>
  );
};

export default Cryptocurrency;
