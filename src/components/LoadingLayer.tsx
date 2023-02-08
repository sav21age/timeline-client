import { Backdrop, Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import React from "react";

// const styles = {
//   Parent: {
//     position: "relative",
//     zIndex: 0,
//   },
//   Child: {
//     position: "absolute",
//     backgroundColor: "rgba(255, 255, 255, 0.5)",
//     zIndex: (theme) => theme.zIndex.drawer + 1,
//   },
// };

interface Props {
    children: JSX.Element,
    isLoading: boolean
}

export const LoadingLayer = ({ children, isLoading }: Props) => {
    return (
        <>
            {isLoading ? (
                <Box
                    sx={{
                        position: "relative",
                        zIndex: 0,
                    }}
                >
                    <Backdrop
                        sx={{
                            position: "absolute",
                            backgroundColor: "rgba(255, 255, 255, 0.5)",
                            zIndex: (theme) => theme.zIndex.drawer + 1,
                        }}
                        open={true}
                    >
                        <CircularProgress disableShrink />
                    </Backdrop>
                    {children}
                </Box>
            ) : (
                <>{children}</>
            )}
        </>
    );
};
