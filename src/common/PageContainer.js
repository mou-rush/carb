import { Box, Typography } from "@mui/material";
import "./PageContainer.css";

const container = ({ pageTitle, content }) => {
  return (
    <Box className="container">
      <Box mb={5}>
        <Typography variant="h4" color="primary">
          {pageTitle}
        </Typography>
      </Box>

      <Box sx={{ alignContent: "center" }}>{content}</Box>
    </Box>
  );
};

export default container;
