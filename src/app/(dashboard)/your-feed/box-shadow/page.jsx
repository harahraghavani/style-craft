"use client";

import { useConstantValues } from "@/hooks/Constant/useConstantValues";
import { useFirebase } from "@/hooks/Firebase/useFirebase";
import { copyToClipboard } from "@/utils/utils";
import { Box, Button, CardHeader, Chip, Grid, Skeleton } from "@mui/material";
import React, { Fragment, useEffect } from "react";
import toast from "react-hot-toast";

const BoxShadowList = () => {
  const { getBoxShadowString } = useConstantValues();
  const { firebaseMethods, states } = useFirebase();
  const { getBoxShadowData } = firebaseMethods;
  const { user, isFetchingList, userBoxShadowData, loader } = states;

  useEffect(() => {
    !loader && user && getBoxShadowData();
  }, [user]);

  return (
    <Fragment>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <CardHeader title="Box Shadow List" className="p-0 font-bold" />
      </Box>
      <div className="py-8">
        {isFetchingList ? (
          <Grid container spacing={12}>
            <Grid item xs={12} md={6}>
              <Skeleton
                variant="rectangular"
                height={100}
                sx={{
                  borderRadius: 2,
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Skeleton
                variant="rectangular"
                height={100}
                sx={{
                  borderRadius: 2,
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Skeleton
                variant="rectangular"
                height={100}
                sx={{
                  borderRadius: 2,
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Skeleton
                variant="rectangular"
                height={100}
                sx={{
                  borderRadius: 2,
                }}
              />
            </Grid>
          </Grid>
        ) : (
          <Grid container spacing={12}>
            {userBoxShadowData?.map((item) => {
              return (
                <Grid item xs={12} md={6}>
                  <Box
                    key={item?.id}
                    p={7}
                    borderRadius={2}
                    border={"1px solid #d9d9d9"}
                  >
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Box
                        boxShadow={getBoxShadowString(item?.boxShadow)}
                        p={2.7}
                        borderRadius={2}
                        sx={{
                          cursor: "pointer",
                          fontWeight: "bold",
                        }}
                        onClick={() => {
                          copyToClipboard(getBoxShadowString(item?.boxShadow));
                          toast.success("Copied to clipboard");
                        }}
                      >
                        {getBoxShadowString(item?.boxShadow)}
                      </Box>
                      <Box>
                        <Chip
                          variant={item?.isPublic ? "filled" : ""}
                          color={item?.isPublic ? "success" : "secondary"}
                          label={item?.isPublic ? "Public" : "Private"}
                          size="medium"
                          sx={{
                            borderRadius: 1.5,
                            fontSize: "medium",
                          }}
                        />
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        )}
      </div>
    </Fragment>
  );
};

export default BoxShadowList;
