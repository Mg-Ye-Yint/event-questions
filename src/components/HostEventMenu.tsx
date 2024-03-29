import { Box, IconButton, Modal, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ContentCopy } from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useState } from "react";
import { themeApp } from "../utils/Theme";
// import { deleteEventById } from '../api/event';
import { useNavigate } from "react-router-dom";
import ConfirmModalCard from "./ConfirmModalCard";
import { deleteEventById } from "../api/event";
import PopupAlert from "./PopupAlert";

interface IData {
    handleClose: () => void;
    setReset: () => void;
    eventId: string;
    title: string;
    hostName: string;
    open: boolean;
}

export default function HostEventMenu(props: IData) {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const patch = window.location.pathname;

    const handleCopyText = (text: string) => {
        navigator.clipboard.writeText(text);
        PopupAlert("Copied", "success");
    };

    const handleCloseCard = () => {
        setOpen(!open);
    };
    const handleEndEvent = async () => {
        await deleteEventById(props.eventId);
        props.setReset();
        navigate("/");
    };

    return (
        <Box>
            {/* <CloseEventCard
                handleClose={handleCloseCard}
                id={props.eventId}
                open={open}
                handleDelete={handleEndEvent}
            /> */}
            <ConfirmModalCard
                handleClose={() => setOpen(!open)}
                handleDeleteDiscard={handleEndEvent}
                open={open}
                discard={false}
                context="All of the question will be remove and no way to return it."
                buttonWord={"End"}
                title={"End this event?"}
            />

            <Modal open={props.open}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                    }}>
                    <Box
                        sx={{
                            background: "black",
                            height: "auto",
                            width: "100%",
                            [themeApp.breakpoints.up("md")]: {
                                width: "430px",
                            },
                        }}>
                        <Box
                            sx={{
                                display: "flex",
                                width: "100%",
                                justifyContent: "space-between",
                                alignContent: "center",
                                alignItems: "center",
                            }}>
                            <Typography
                                fontFamily={"Inter"}
                                color={"#2ECC71"}
                                fontSize={"32px"}
                                sx={{
                                    marginLeft: "16px",
                                    marginTop: "10px",
                                    fontWeight: "bold",
                                }}>
                                {props.title}
                            </Typography>
                            <IconButton
                                size="large"
                                sx={{
                                    width: "32px",
                                    height: "32px",
                                    marginRight: "16px",
                                    color: "white",
                                }}
                                onClick={props.handleClose}>
                                <CloseIcon />
                            </IconButton>
                        </Box>
                        <Box
                            textAlign={"left"}
                            color={"white"}
                            fontSize={"17px"}
                            sx={{
                                marginBottom: "30px",
                                marginLeft: "16px",
                                fontFamily: "Inter",
                            }}>
                            {props.hostName}
                        </Box>

                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignContent: "center",
                                alignItems: "center",
                                marginTop: "10px",
                                marginLeft: "16px",
                                color: "white",
                            }}>
                            <Box><u>Admin URL</u></Box>
                            <IconButton
                                onClick={() =>
                                    handleCopyText(
                                        import.meta.env.VITE_CLIENT + patch
                                    )
                                }
                                sx={{ marginRight: "16px", color: "white" }}>
                                <ContentCopy fontSize="small" />
                            </IconButton>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignContent: "center",
                                alignItems: "center",
                                marginTop: "10px",
                                marginLeft: "16px",
                                color: "white",
                            }}>
                            <Box>Code: {props.eventId}</Box>
                            <IconButton
                                onClick={() => handleCopyText(props.eventId)}
                                sx={{ marginRight: "16px", color: "white" }}>
                                <ContentCopy fontSize="small" />
                            </IconButton>
                        </Box>

                        <Box
                            sx={{
                                display: "flex",
                                alignContent: "center",
                                alignItems: "center",
                                marginTop: "10px",
                                cursor: "pointer",
                                color: "black",
                                transition: "background-color 0.3s ease",
                                marginLeft: "10px",
                                marginBottom: "10px",
                                "&:hover": {
                                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                                },
                            }}
                            onClick={handleCloseCard}>
                            <IconButton sx={{ color: "white" }}>
                                <LogoutIcon fontSize="small" />
                            </IconButton>
                            <Box sx={{ color: "white" }}>End this event</Box>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
}
