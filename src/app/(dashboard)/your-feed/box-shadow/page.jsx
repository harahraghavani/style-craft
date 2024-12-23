"use client";
import CommonModal from "@/components/modal/CommonModal";
import { useConstantValues } from "@/hooks/Constant/useConstantValues";
import { useFirebase } from "@/hooks/Firebase/useFirebase";
import { copyToClipboard } from "@/utils/utils";
import {
  Box,
  CardHeader,
  Chip,
  Grid,
  IconButton,
  Skeleton,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useRef, useState } from "react";

const BoxShadowList = () => {
  const router = useRouter();
  const [isPreview, setIsPreview] = useState(false);
  const selectedShadow = useRef(null);

  const { getBoxShadowString } = useConstantValues();
  const { firebaseMethods, states } = useFirebase();
  const { getBoxShadowData } = firebaseMethods;
  const { user, isFetchingList, userBoxShadowData, loader } = states;

  const handlePreviewModal = () => {
    setIsPreview(!isPreview);
  };

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
                        }}
                      >
                        {getBoxShadowString(item?.boxShadow)}
                      </Box>
                      <Box display="flex" gap={2.5} alignItems="center">
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
                        <IconButton
                          sx={{
                            padding: 0,
                          }}
                          onClick={() => {
                            selectedShadow.current = item?.boxShadow;
                            setTimeout(() => {
                              handlePreviewModal();
                            }, 100);
                          }}
                        >
                          <i className="tabler-eye" />
                        </IconButton>
                        <IconButton
                          sx={{
                            padding: 0,
                          }}
                          onClick={() => {
                            router.push(`/playground/box-shadow/${item?.id}`);
                          }}
                        >
                          <i className="tabler-edit" />
                        </IconButton>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        )}
      </div>
      {isPreview && (
        <CommonModal
          isOpen={isPreview}
          handleClose={() => {
            handlePreviewModal();
            selectedShadow.current = null;
          }}
          title="Shadow Style Preview"
        >
          <Box display="flex" justifyContent="center" p={3}>
            <Box
              boxShadow={getBoxShadowString(selectedShadow?.current)}
              height={350}
              width={400}
              borderRadius={2}
              border={"1px solid #d9d9d9"}
            >
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height={"100%"}
                onClick={() => {
                  copyToClipboard(getBoxShadowString(selectedShadow?.current));
                }}
                sx={{
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                {getBoxShadowString(selectedShadow?.current)}
              </Box>
            </Box>
          </Box>
        </CommonModal>
      )}
    </Fragment>
  );
};

export default BoxShadowList;
