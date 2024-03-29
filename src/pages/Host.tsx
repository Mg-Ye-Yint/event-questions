import {
    Box,
    Typography,
    Button,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
} from "@mui/material";
import { useState } from "react";
import { createEvent } from "../api/event";
import CancelIcon from "@mui/icons-material/Cancel";
import { useNavigate } from "react-router-dom";
import { themeApp } from "../utils/Theme";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";

export default function Host() {
    const [eventName, setEventName] = useState("");
    const [errorEventName, setErrorEventName] = useState("");
    const [errorHostName, setErrorHostName] = useState("");
    const [hostName, setHostName] = useState("");
    const navigate = useNavigate();
    const generateRandomNumber = () => {
        const random: number = Math.floor(Math.random() * 900) + 100;
        const currentHour = new Date().getHours();
        const combinedNumber =
            currentHour.toString().padStart(2, "0") +
            random.toString().padStart(2, "0");
        return combinedNumber;
    };

    const handleCreateEvent = async () => {
        if (hostName !== "" && eventName !== "") {
            const event = {
                temRoomId: generateRandomNumber(),
                title: eventName,
                ownerName: hostName,
            };
            const response = await createEvent(event);
            const responseBody = response;
            navigate(`/eventRoom/${responseBody.data}/host`);
            setEventName("");
            setHostName("");
        } else {
            setErrorEventName("Please type event name!");
            setErrorHostName("Please type host name!");
        }
    };
    const handleEventName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEventName(event.target.value);
    };
    const handleHostName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setHostName(event.target.value);
    };

    return (
        <>
            <IconButton
                onClick={() => navigate(-1)}
                size="small"
                sx={{
                    top: "5%",
                    position: "fixed",
                    left: "5%",
                    width: "32",
                    height: "32px",
                    background: "white",
                    "&:hover": {
                        background: "#FFFFFF",
                        color: "#black",
                    },
                }}>
                <KeyboardBackspaceOutlinedIcon sx={{ color: "black" }} />
            </IconButton>
            <Box
                sx={{
                    display: "flex",
                    gap: "10px",
                    flexDirection: "column",
                    textAlign: "left",
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "398px",
                    [themeApp.breakpoints.down("sm")]: {
                        width: "90%",
                    },
                }}>
                <Typography
                    fontFamily={"Inter"}
                    color={"#2ECC71"}
                    fontSize={"32px"}
                    fontWeight={"bold"}>
                    Fill your info
                </Typography>
                <Typography
                    fontFamily={"Inter"}
                    color={"#6C6C6C"}
                    fontSize={"17px"}>
                    Complete your event details.
                </Typography>
                <Box>
                    <FormControl
                        sx={{
                            width: "398px",
                            marginTop: "32px",
                            [themeApp.breakpoints.down("sm")]: {
                                width: "100%",
                            },
                        }}
                        variant="outlined">
                        <InputLabel
                            sx={{ fontFamily: "Inter" }}
                            htmlFor="Enter code here">
                            Event name
                        </InputLabel>
                        <OutlinedInput
                            sx={{ background: "white", borderRadius: "14px" }}
                            id="Event name"
                            value={eventName}
                            onChange={handleEventName}
                            endAdornment={
                                <InputAdornment position="end">
                                    {eventName ? (
                                        <IconButton
                                            edge="end"
                                            sx={{ border: "0px" }}
                                            onClick={() => setEventName("")}>
                                            <CancelIcon />
                                        </IconButton>
                                    ) : (
                                        <></>
                                    )}
                                </InputAdornment>
                            }
                            label="Event name"
                        />
                    </FormControl>
                </Box>
                {errorEventName !== "" && !eventName && (
                    <Typography color={"red"}>{errorEventName}</Typography>
                )}
                <Box>
                    <FormControl
                        sx={{
                            width: "398px",
                            marginTop: "24px",
                            [themeApp.breakpoints.down("sm")]: {
                                width: "100%",
                            },
                        }}
                        variant="outlined">
                        <InputLabel
                            sx={{ fontFamily: "Inter" }}
                            htmlFor="Enter code here">
                            Host name
                        </InputLabel>
                        <OutlinedInput
                            sx={{ background: "white", borderRadius: "14px" }}
                            id="Host name"
                            value={hostName}
                            onChange={handleHostName}
                            endAdornment={
                                <InputAdornment position="end">
                                    {hostName ? (
                                        <IconButton
                                            edge="end"
                                            sx={{ border: "0px" }}
                                            onClick={() => setHostName("")}>
                                            <CancelIcon />
                                        </IconButton>
                                    ) : (
                                        <></>
                                    )}
                                </InputAdornment>
                            }
                            label="Host name"
                        />
                    </FormControl>
                </Box>
                {errorHostName !== "" && !hostName && (
                    <Typography color={"red"}>{errorHostName}</Typography>
                )}
                <Box>
                    <Button
                        sx={{
                            height: "61px",
                            width: "398px",
                            background: "black",
                            color: "white",
                            borderRadius: "14px",
                            marginTop: "24px",
                            "&:hover": {
                                background: "black",
                                color: "white",
                            },
                            [themeApp.breakpoints.down("sm")]: {
                                width: "100%",
                            },
                            fontFamily: "Inter",
                        }}
                        onClick={handleCreateEvent}>
                        Continue
                    </Button>
                </Box>
                {/* <Box>
                    <Button
                        variant="outlined"
                        sx={{
                            height: "61px",
                            width: "398px",
                            color: "black",
                            borderRadius: "14px",
                            marginTop: "24px",
                            border: "1px solid black",
                            "&:hover": {
                                background: "white",
                                color: "black",
                                border: "1px solid black",
                            },
                            [themeApp.breakpoints.down("sm")]: {
                                width: "100%",
                            },
                            fontFamily: "Inter",
                        }}
                        onClick={() => navigate("/")}>
                        Back to Home
                    </Button>
                </Box> */}
            </Box>
        </>
    );
}
