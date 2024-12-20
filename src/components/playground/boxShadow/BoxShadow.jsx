"use client";

import { Fragment } from "react";
import { Box, Button, CardHeader, Grid } from "@mui/material";
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
  const methods = useForm({
    mode: "all",
    defaultValues: INITIAL_BOX_SHADOW,
  });

  const { firebaseMethods, states } = useFirebase();
  const { storeBoxShadowInCollection } = firebaseMethods;
  const { isShadowStoring } = states;

  const { boxShadow } = useConstantValues();

  const handleSave = async ({ isPublic = false }) => {
    const shadowId = params?.id ? params.id : uuidv4();
    await storeBoxShadowInCollection({
      boxShadow,
      isPublic,
      id: shadowId,
    });
    router.push(isPublic ? "/" : "/your-feed/box-shadow");
  };

  return (
    <FormProvider {...methods}>
      <Fragment>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <CardHeader
            title="The Box Shadow Generator"
            className="p-0 font-bold"
          />
          <Box display="flex" alignItems="center" gap={3}>
            <Button
              variant="contained"
              disabled={isShadowStoring}
              onClick={() => {
                handleSave({ isPublic: false });
              }}
            >
              Create
            </Button>
            <Button
              variant="contained"
              disabled={isShadowStoring}
              onClick={() => {
                handleSave({ isPublic: true });
              }}
            >
              Publish
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
    </FormProvider>
  );
};

export default BoxShadow;
