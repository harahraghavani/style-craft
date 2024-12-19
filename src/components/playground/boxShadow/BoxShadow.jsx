import { Fragment } from "react";
import { CardHeader, Grid } from "@mui/material";

import ShadowInputWrapper from "./ShadowInputWrapper";
import ShadowPreview from "./ShadowPreview";

const BoxShadow = () => {
  return (
    <Fragment>
      <CardHeader title="The Box Shadow Generator" className="p-0 font-bold" />
      <div className="py-8">
        <Grid container>
          <Grid item xs={12} md={6}>
            <ShadowInputWrapper />
          </Grid>
          <Grid item xs={12} md={6}>
            <ShadowPreview />
          </Grid>
        </Grid>
      </div>
    </Fragment>
  );
};

export default BoxShadow;
