"use client";

import { Fragment, useEffect } from "react";
import { Box, Button, CardHeader, Grid, Skeleton } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

import ShadowInputWrapper from "./ShadowInputWrapper";
import ShadowPreview from "./ShadowPreview";
import { FormProvider, useForm } from "react-hook-form";
import { INITIAL_BOX_SHADOW } from "@/constant/appConstant";
import { useFirebase } from "@/hooks/Firebase/useFirebase";
import { useParams, useRouter } from "next/navigation";
import { useConstantValues } from "@/hooks/Constant/useConstantValues";

const BoxShadow = () => {
  const router = useRouter();
  const params = useParams();
  const shadowId = params?.id;

  const methods = useForm({
    mode: "onChange",
    defaultValues: INITIAL_BOX_SHADOW,
  });

  const btnDisable = !methods.formState.isDirty;

  const { firebaseMethods, states } = useFirebase();
  const { storeBoxShadowInCollection, getShadowById } = firebaseMethods;
  const { isShadowStoring, isShadowDetails, shadowDetails } = states;

  const { boxShadow } = useConstantValues();

  const handleSave = async ({ isPublic = false }) => {
    const shadowId = params?.id ? params.id : uuidv4();
    await storeBoxShadowInCollection({
      boxShadow,
      isPublic,
      id: shadowId,
    });
    router.push(
      shadowId
        ? "/your-feed/box-shadow"
        : isPublic
          ? "/"
          : "/your-feed/box-shadow"
    );
  };

  useEffect(() => {
    if (shadowId) {
      getShadowById(shadowId);
    }
  }, [shadowId]);

  useEffect(() => {
    if (shadowId && !isShadowDetails) {
      methods.reset(shadowDetails?.boxShadow, { keepDirty: true });
    }
  }, [isShadowDetails, shadowId]);

  return (
    <FormProvider {...methods}>
      {shadowDetails && isShadowDetails ? (
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          spacing={12}
        >
          <Grid item xs={12} md={6}>
            <Skeleton
              variant="rectangular"
              height={350}
              sx={{
                borderRadius: 2,
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Skeleton
              variant="rectangular"
              height={350}
              sx={{
                borderRadius: 2,
              }}
            />
          </Grid>
        </Grid>
      ) : (
        <Fragment>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <CardHeader
              title="The Box Shadow Generator"
              className="p-0 font-bold"
            />
            <Box display="flex" alignItems="center" gap={3}>
              <Button
                variant="contained"
                disabled={isShadowStoring || btnDisable}
                onClick={() => {
                  handleSave({
                    isPublic: shadowId ? shadowDetails?.isPublic : false,
                  });
                }}
              >
                {shadowId ? "Edit" : "Create"}
              </Button>
              <Button
                variant="contained"
                disabled={isShadowStoring || (shadowId ? false : btnDisable)}
                onClick={() => {
                  handleSave({
                    isPublic: shadowId
                      ? shadowDetails?.isPublic
                        ? false
                        : true
                      : true,
                  });
                }}
              >
                {shadowId
                  ? shadowDetails?.isPublic
                    ? "Make Private"
                    : "Publish"
                  : "Publish"}
              </Button>
              <Button
                variant="outlined"
                onClick={() => {
                  const redirectPath = shadowId ? "/your-feed/box-shadow" : "/";
                  router.push(redirectPath);
                }}
                startIcon={<i className="tabler-arrow-narrow-left" />}
              >
                Back
              </Button>
            </Box>
          </Box>
          <div className="py-8">
            <Grid container justifyContent="center" alignItems="center">
              <Grid item xs={12} md={6}>
                <ShadowInputWrapper />
              </Grid>
              <Grid item xs={12} md={6}>
                <ShadowPreview />
              </Grid>
            </Grid>
          </div>
        </Fragment>
      )}
    </FormProvider>
  );
};

export default BoxShadow;
