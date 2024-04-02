import { Box, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LogoutIcon from "@mui/icons-material/Logout";
import { useState } from "react";
import { ContentCopy } from "@mui/icons-material";
import { themeApp } from "../utils/Theme";
import ConfirmModalCard from "./ConfirmModalCard";
import { useNavigate } from "react-router-dom";
import { deleteUserById } from "../api/audience";
import PopupAlert from "./PopupAlert";

interface IData {
    handleClose: () => void;
    eventId: string;
    title: string;
    hostName: string;
    roomId: string;
}

export default function AudienceMenu(props: IData) {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const userInfo = JSON.parse(localStorage.getItem("user") || "null");

    const handleCloseCard = () => {
        setOpen(!open);
    };

    const handleCopyText = (text: string) => {
        navigator.clipboard.writeText(text);
        PopupAlert("Copied", "success");
    };
    const handleLeave = async () => {
        if (userInfo) {
            await deleteUserById(userInfo.userId);
            localStorage.removeItem("user");
            navigate("/");
        }
    };

    return (
        <>
            <ConfirmModalCard
                open={open}
                discard={false}
                buttonWord={"Leave"}
                title={"Are you sure to leave?"}
                context={"You can rejoin again by using the invitation code."}
                handleClose={handleCloseCard}
                handleDeleteDiscard={handleLeave}
            />
            <Box
                sx={{
                    background: "#2ECC71",
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
                        fontWeight={"bold"}
                        fontFamily={"Inter"}
                        color={"#000000"}
                        fontSize={"32px"}
                        sx={{ marginLeft: "16px", marginTop: "10px" }}>
                        {props.title}
                    </Typography>
                    <IconButton
                        size="large"
                        sx={{
                            width: "32px",
                            height: "32px",
                            marginRight: "16px",
                            color: "black",
                        }}
                        onClick={props.handleClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Box
                    fontFamily={"Inter"}
                    textAlign={"left"}
                    color={"black"}
                    fontSize={"17px"}
                    sx={{ marginBottom: "10px", marginLeft: "16px" }}>
                    {props.hostName}
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignContent: "center",
                        alignItems: "center",
                        marginTop: "20px",
                        marginLeft: "16px",
                        color: "black",
                    }}>
                    <Box>Invitation URL</Box>
                    <IconButton
                        onClick={() =>
                            handleCopyText(
                                import.meta.env.VITE_CLIENT +
                                    "/event/" +
                                    props.roomId
                            )
                        }
                        sx={{ marginRight: "16px", color: "black" }}>
                        <ContentCopy fontSize="small" />
                    </IconButton>
                </Box>
                <Box
                    sx={{
                        width: "95%",
                        display: "flex",
                        alignContent: "center",
                        height: "48px",
                        alignItems: "center",
                        marginTop: "10px",
                        cursor: "pointer",
                        color: "black",
                        transition: "background-color 0.3s ease",
                        marginLeft: "10px",
                        marginBottom: "10px",
                        "&:hover": {
                            borderRadius: "10px",
                            backgroundColor: "rgba(0, 0, 0, 0.1)",
                        },
                    }}
                    onClick={handleCloseCard}>
                    <IconButton sx={{ color: "black" }}>
                        <LogoutIcon fontSize="small" />
                    </IconButton>
                    <Box sx={{ color: "black" }}>Leave</Box>
                </Box>
            </Box>
        </>
    );
}
