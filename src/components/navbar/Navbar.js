import React, { useState } from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import {
  Box,
  Button,
  Typography,
  IconButton,
  ListItem,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Toolbar,
  Divider,
  Drawer,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Groups2Icon from "@mui/icons-material/Groups2";
import MenuIcon from "@mui/icons-material/Menu";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import InfoIcon from "@mui/icons-material/Info";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const drawerWidth = 340;

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [activeItem, setActiveItem] = useState(null);

  const connectWallet = async () => {
    try {
      if (window?.ethereum?.isMetaMask) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log("Wallet connected:", accounts[0]);
        toast.success("Wallet connected successfully!");
      } else {
        console.error("MetaMask is not installed or not running");
        toast.error(
          "Please install MetaMask extension or open the MetaMask application."
        );
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
      toast.error("Error connecting wallet. Please try again later.");
    }
  };

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const handleItemClick = (text) => {
    setActiveItem(text);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider color="#ffbb00" />
      <List>
        {[
          {
            text: "Population",
            link: "/",
            icon: <Groups2Icon color="secondary" />,
          },
          {
            text: "Cryptocurrency Prices",
            link: "/cryptocurrency",
            icon: <MonetizationOnIcon color="secondary" />,
          },
          { text: "Info", link: "/info", icon: <InfoIcon color="secondary" /> },
          {
            text: "Activity",
            link: "/activity",
            icon: <ReceiptLongIcon color="secondary" />,
          },
        ].map(({ text, link, icon }, index) => (
          <ListItem
            key={text}
            disablePadding
            button
            onClick={() => handleItemClick(text)}
            selected={activeItem === text}
            component={Link}
            to={link}
          >
            <ListItemButton>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
        <Divider color="#ffbb00" />
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <ToastContainer />
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#1f1f1f",
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <IconButton
            color="secondary"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h4" alignContent="center" color="secondary">
            My Wallet
          </Typography>

          <Button
            onClick={connectWallet}
            variant="contained"
            sx={{
              backgroundColor: "#ffbb00",
              color: "#ffffff",
              "&:hover": {
                backgroundColor: "primary",
              },
            }}
          >
            Connect Wallet
          </Button>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="menu options"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#1f1f1f",
              color: "#ffffff",
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              color: "#ffffff",
              width: drawerWidth,
              backgroundColor: "#1f1f1f",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
      </Box>
    </Box>
  );
}
