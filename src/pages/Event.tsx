import {
    Box,
    Typography,
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    IconButton,
    Button,
    Avatar,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CancelIcon from "@mui/icons-material/Cancel";
import { themeApp } from "../utils/Theme";
import { getEventByRoomId } from "../api/event";
import { Ievent } from "../interface/Ievent";
import { addUser } from "../api/audience";
import PopupAlert from "../components/PopupAlert";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";

export default function Event() {
    const navigate = useNavigate();
    const { eventId } = useParams();
    const [eventData, setEventData] = useState<Ievent>();
    const [userName, setUsername] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const data = await getEventByRoomId(eventId ?? "");
            if (data[0]) {
                setEventData(data[0]);
            } else {
                navigate("/page404");
            }
        };

        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handleContinue = async () => {
        if (userName) {
            const user = {
                name: userName,
            };
            const response = await addUser(user);
            if (response.data !== 404) {
                const saveUser = {
                    userId: response.data,
                    name: userName,
                };
                localStorage.setItem("user", JSON.stringify(saveUser));
                navigate(`/eventRoom/${eventData?.eventId}/no`);
            } else {
                PopupAlert("The username has already exited!", "warning");
            }
        } else {
            setError("Please type your name!");
        }
    };

    function stringAvatar(name: string) {
        return {
            sx: {
                fontSize: "36px",
                bgcolor: "#D9D9D9",
                width: "100px",
                height: "100px",
                color: "black",
                border: "1px solid black",
            },
            children: `${name.slice(0, 2).toUpperCase()}`,
        };
    }

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
                    textAlign: "center",
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "398px",
                    [themeApp.breakpoints.down("sm")]: {
                        width: "90%",
                    },
                }}>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Avatar
                        {...stringAvatar(`${eventData?.ownerName}`)}
                        sx={{
                            background: "#2ECC71",
                            fontSize: "36px",
                            width: "100px",
                            height: "100px",
                            color: "white",
                        }}
                    />
                </Box>
                {eventData !== undefined && (
                    <>
                        <Typography
                            color={"black"}
                            fontSize={"36px"}
                            fontWeight={"bold"}>
                            {eventData?.title}
                        </Typography>
                        <Typography color={"#6C6C6C"} fontSize={"17px"}>
                            {eventData?.ownerName}
                        </Typography>
                    </>
                )}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        width: "100%",
                    }}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            width: "100%",
                        }}>
                        <Box>
                            <FormControl
                                sx={{
                                    width: "398px",
                                    marginTop: "32px",
                                    [themeApp.breakpoints.down("md")]: {
                                        width: "100%",
                                    },
                                }}
                                variant="outlined">
                                <InputLabel htmlFor="What should everyone call you?">
                                    What should everyone call you?
                                </InputLabel>
                                <OutlinedInput
                                    sx={{ borderRadius: "14px" }}
                                    value={userName}
                                    onChange={handleName}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            {userName ? (
                                                <IconButton
                                                    edge="end"
                                                    sx={{ border: "0px" }}
                                                    onClick={() =>
                                                        setUsername("")
                                                    }>
                                                    <CancelIcon />
                                                </IconButton>
                                            ) : (
                                                <></>
                                            )}
                                        </InputAdornment>
                                    }
                                    label="What should everyone call you?"
                                />
                            </FormControl>
                        </Box>
                        {error !== "" && !userName && (
                            <Typography color={"red"}>{error}</Typography>
                        )}
                        <Box>
                            <Button
                                sx={{
                                    height: "61px",
                                    width: "398px",
                                    background: "#000000",
                                    color: "white",
                                    borderRadius: "14px",
                                    marginTop: "24px",
                                    fontSize: "17px",
                                    "&:hover": {
                                        background: "black",
                                    },
                                    [themeApp.breakpoints.down("lg")]: {
                                        width: "100%",
                                    },
                                    fontFamily: "Inter",
                                }}
                                onClick={handleContinue}>
                                Join the event
                            </Button>
                        </Box>
                        {/* <Box>
                            <Button
                                variant="outlined"
                                sx={{
                                    height: "61px",
                                    fontSize: "17px",
                                    width: "398px",
                                    color: "black",
                                    borderRadius: "14px",
                                    marginTop: "14px",
                                    border: "1px solid black",
                                    "&:hover": {
                                        background: "white",
                                        color: "black",
                                        border: "1px solid black",
                                    },
                                    [themeApp.breakpoints.down("lg")]: {
                                        width: "100%",
                                    },
                                    fontFamily: "Inter",
                                }}
                                onClick={() => navigate("/")}>
                                Leave
                            </Button>
                        </Box> */}
                    </Box>
                </Box>
            </Box>
        </>
    );
}
