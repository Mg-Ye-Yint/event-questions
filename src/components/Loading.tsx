import { Box, CircularProgress, Modal, Typography } from "@mui/material";
const styleLoading = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    "&:focus": {
        outline: "none",
    },
    "&:active": {
        boxShadow: "none",
    },
    textAlign: "center",
    background: "black",
    padding: "20px",
    borderRadius: "10px",
};

interface ILoading {
    openLoading: boolean;
}

export default function Loading(props: ILoading) {
    return (
        <>
            <Modal open={props.openLoading}>
                <Box sx={styleLoading}>
                    <CircularProgress
                        disableShrink
                        size={80}
                        color="inherit"
                        sx={{ color: "white" }}
                    />
                    <Typography variant="h5" color={"white"}>
                        Please wait...
                    </Typography>
                </Box>
            </Modal>
        </>
    );
}
