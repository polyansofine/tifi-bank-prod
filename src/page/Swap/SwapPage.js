import { Grid, Hidden } from "@mui/material";
import React from "react";
import Swap from ".";
import SwapChart from "./SwapChart";

const SwapPage = () => {
  return (
    <Grid container justifyContent="space-between" alignItems="top" spacing={4}>
      <Grid item md={7} sm={12}>
        <Hidden smDown>
          <SwapChart />
        </Hidden>
      </Grid>
      <Grid item md={5} sm={12} xs={12}>
        <Swap />
      </Grid>
    </Grid>
  );
};

export default SwapPage;
