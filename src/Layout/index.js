import { Container, Grid } from "@mui/material";
import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div style={{ height: "90vh" }}>
      <Header />
      <Container sx={{ py: 5 }} style={{ minHeight: "70vh" }}>
        <Grid container justifyContent="center">
          <Grid item>{children}</Grid>
        </Grid>
      </Container>
      <Footer />
    </div>
  );
};

export default Layout;
