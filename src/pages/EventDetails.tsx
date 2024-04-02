import {
    Box,
    Button,
    Divider,
    IconButton,
    Modal,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEventById } from "../api/event";
import PreviewQuestion from "../components/PreviewQuestion/PreviewQuestion";
import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined";
import { themeApp } from "../utils/Theme";
import { Ievent } from "../interface/Ievent";
import MenuIcon from "@mui/icons-material/Menu";
import AudienceMenu from "../components/AudienceMenu";
import AddQuestion from "../components/AddEditQuestion";
import ALQuestionCard from "../components/QuestionCard/ALQuestionCard";
import AlerQuestion from "../components/AlerQuestion";
import { IQuestion } from "../interface/IQuestion";
import PopupAlert from "../components/PopupAlert";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";

interface IData {
    refresh: number;
    questions: IQuestion[];
    myQuestions: IQuestion[];
    handleRefresh: () => void;
    handleLoading: () => void;
}

export default function EventDetails(props: IData) {
    const navigate = useNavigate();
    const userInfo = JSON.parse(localStorage.getItem("user") || "null");
    const [value, setValue] = useState(0);
    const [open, setOpen] = useState(false);
    const [openCard, setOpenCard] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [openQueCard, setOpenQueCard] = useState(false);
    const { eventId } = useParams();
    const [eventData, setEventData] = useState<Ievent>();
    // const [questions, setQuestions] = useState<IQuestion[]>([]);
    // const [myQuestions, setMyQuestions] = useState<IQuestion[]>([]);
    const [selectedQId, setSelectedQId] = useState("");

    useEffect(() => {
        const fetch = async () => {
            const data = await getEventById(eventId ?? "");
            if (data) {
                setEventData(data);
            } else {
                navigate("/");
            }
        };
        fetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleOpenCard = () => setOpenCard(true);
    const handleCloseCard = () => setOpenCard(false);
    const handleOpenAlert = () => setOpenAlert(true);
    const handleCloseAlert = () => setOpenAlert(false);
    const handleOpenQueCard = () => setOpenQueCard(true);
    const handleCloseQueCard = () => setOpenQueCard(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleChange = (newValue: number) => {
        setValue(newValue);
        props.handleRefresh();
    };
    const handleSelectQuestion = async (id: string) => {
        setSelectedQId(id);
        handleOpenCard();
    };
    const handleCopyText = (text: string) => {
        navigator.clipboard.writeText(text);
        PopupAlert("Copied", "success");
    };

    return (
        <>
            {eventData !== undefined && (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        width: "100%",
                    }}>
                    <Modal open={open}>
                        <Box sx={{ display: "flex", justifyContent: "center" }}>
                            <AudienceMenu
                                handleClose={handleClose}
                                eventId={eventId ?? ""}
                                title={eventData.title}
                                hostName={eventData.ownerName}
                                roomId={eventData.temRoomId}
                            />
                        </Box>
                    </Modal>

                    <PreviewQuestion
                        questionId={selectedQId}
                        handleCloseCard={handleCloseCard}
                        handleRefresh={props.handleRefresh}
                        isHost={false}
                        openPreviewCard={openCard}
                        ownerId={eventData.eventId}
                        ownerName={eventData.ownerName}
                        refresh={props.refresh}
                    />

                    <AddQuestion
                        handleClose={handleCloseQueCard}
                        handleRefresh={props.handleRefresh}
                        handleCloseAlert={handleCloseAlert}
                        handleOpenAlert={handleOpenAlert}
                        isEdit={false}
                        ownerName={userInfo.name}
                        openQueCard={openQueCard}
                        context=""
                    />
                    <AlerQuestion
                        open={openAlert}
                        context="Your question has been sent!"
                    />
                    <Box
                        sx={{
                            position: "relative",
                            display: "flex",
                            flexDirection: "column",
                            width: "100%",
                            height: "auto",
                            overflow: "auto",
                            [themeApp.breakpoints.up("md")]: {
                                width: "430px",
                            },
                        }}>
                        <Box
                            sx={{
                                background: "#2ECC71",
                                height: "112px",
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
                                    fontWeight={"bold"}
                                    color={"#000000"}
                                    fontSize={"32px"}
                                    sx={{
                                        paddingLeft: "16px",
                                        paddingTop: "10px",
                                    }}>
                                    {eventData.title}
                                </Typography>
                                <IconButton
                                    size="large"
                                    onClick={handleOpen}
                                    sx={{
                                        width: "32px",
                                        height: "32px",
                                        marginRight: "16px",
                                        color: "black",
                                    }}>
                                    <MenuIcon />
                                </IconButton>
                            </Box>
                            <Box
                                fontFamily={"Inter"}
                                textAlign={"left"}
                                color={"black"}
                                fontSize={"17px"}
                                sx={{ paddingLeft: "16px" }}>
                                {eventData.ownerName}
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                width: "100%",
                                [themeApp.breakpoints.up("lg")]: {
                                    width: "430px",
                                },
                            }}>
                            <Box
                                sx={{
                                    fontSize: "16px",
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignContent: "center",
                                        alignItems: "center",
                                        marginLeft: "16px",
                                        marginRight: "16px",
                                    }}>
                                    <Box
                                        onClick={() => handleChange(0)}
                                        sx={{
                                            borderBottom:
                                                value == 0
                                                    ? "2px solid #2ECC71"
                                                    : "",
                                            fontWeight:
                                                value == 0 ? "bold" : "",
                                            borderRadius: "0px",
                                            color:
                                                value == 0
                                                    ? "#2ECC71"
                                                    : "#1C1C1C",
                                            width: "87px",
                                            height: "47px",
                                            fontSize: "16px",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            cursor: "pointer",
                                        }}>
                                        Recent
                                        <Box
                                            sx={{
                                                display: "flex",
                                                fontSize: "14px",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                marginLeft: "10px",
                                                borderRadius: "4px",
                                                color:
                                                    value == 0
                                                        ? "#2ECC71"
                                                        : "#000000",
                                                background:
                                                    value != 0
                                                        ? "rgba(201, 204, 208, 0.2)"
                                                        : "rgba(46, 204, 113, 0.2)",
                                                width: "16px",
                                                height: "19px",
                                            }}>
                                            {props.questions.length}
                                        </Box>
                                    </Box>
                                    <Box
                                        onClick={() => handleChange(1)}
                                        sx={{
                                            borderBottom:
                                                value == 1
                                                    ? "2px solid #2ECC71"
                                                    : "",
                                            fontWeight:
                                                value == 1 ? "bold" : "",
                                            borderRadius: "0px",
                                            color:
                                                value == 1
                                                    ? "#2ECC71"
                                                    : "#1C1C1C",
                                            width: "87px",
                                            height: "47px",
                                            fontSize: "16px",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            cursor: "pointer",
                                        }}>
                                        Popular
                                    </Box>
                                    <Box
                                        onClick={() => handleChange(2)}
                                        sx={{
                                            borderBottom:
                                                value == 2
                                                    ? "2px solid #2ECC71"
                                                    : "",
                                            fontWeight:
                                                value == 2 ? "bold" : "",
                                            borderRadius: "0px",
                                            color:
                                                value == 2
                                                    ? "#2ECC71"
                                                    : "#1C1C1C",
                                            width: "87px",
                                            height: "47px",
                                            fontSize: "16px",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            cursor: "pointer",
                                        }}>
                                        My
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                marginLeft: "10px",
                                                borderRadius: "4px",
                                                fontSize: "14px",
                                                color:
                                                    value == 2
                                                        ? "#2ECC71"
                                                        : "#000000",
                                                background:
                                                    value != 2
                                                        ? "rgba(201, 204, 208, 0.2)"
                                                        : "rgba(46, 204, 113, 0.2)",
                                                width: "19px",
                                                height: "21px",
                                            }}>
                                            {props.myQuestions.length}
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                            {value == 0 ? (
                                <>
                                    {props.questions.length !== 0 ? (
                                        props.questions
                                            .sort((a, b) => {
                                                const timestampA = new Date(
                                                    a.timestamp
                                                ).getTime();
                                                const timestampB = new Date(
                                                    b.timestamp
                                                ).getTime();
                                                return timestampB - timestampA;
                                            })
                                            .map((item, index) => (
                                                <Box key={index}>
                                                    <ALQuestionCard
                                                        questions={item}
                                                        handleRefresh={
                                                            props.handleRefresh
                                                        }
                                                        handleSelectQuestion={
                                                            handleSelectQuestion
                                                        }
                                                        handleLoading={
                                                            props.handleLoading
                                                        }
                                                    />
                                                    <Divider />
                                                </Box>
                                            ))
                                    ) : (
                                        <Box
                                            sx={{
                                                textAlign: "center",
                                            }}>
                                            <Box sx={{ marginBottom: "10px" }}>
                                                <Typography
                                                    sx={{
                                                        marginTop: "40%",
                                                        fontSize: "20px",
                                                        fontFamily: "Inter",
                                                        fontWeight: "bold",
                                                    }}>
                                                    Join the show!
                                                </Typography>
                                            </Box>
                                            <Box sx={{ marginBottom: "10px" }}>
                                                <Typography
                                                    fontFamily={"Inter"}
                                                    fontSize={17}>
                                                    Share this URL with your
                                                    friends <br /> so that they
                                                    can join immediately.
                                                </Typography>
                                            </Box>
                                            <Button
                                                onClick={() =>
                                                    handleCopyText(
                                                        import.meta.env
                                                            .VITE_CLIENT +
                                                            "/event/" +
                                                            eventData.temRoomId
                                                    )
                                                }
                                                sx={{
                                                    width: "90%",
                                                    height: "56px",
                                                    color: "#2ECC71",
                                                    borderRadius: "14px",
                                                    backgroundColor:
                                                        "rgba(46, 204, 113, 0.2)",
                                                    "&:hover": {
                                                        backgroundColor:
                                                            "rgba(46, 204, 113, 0.2)",
                                                        color: "#2ECC71",
                                                    },
                                                }}
                                                endIcon={<LinkOutlinedIcon />}>
                                                Copy Invite URL
                                            </Button>
                                            {/* <Box
                                                sx={{
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignContent: "center",
                                                    alignItems: "center",
                                                }}>
                                                Code: {eventData.temRoomId}
                                                <IconButton
                                                    onClick={() =>
                                                        handleCopyText(
                                                            eventData.temRoomId ??
                                                                ""
                                                        )
                                                    }>
                                                    <ContentCopyOutlinedIcon />
                                                </IconButton>
                                            </Box> */}
                                        </Box>
                                    )}
                                </>
                            ) : value == 1 ? (
                                <>
                                    {props.questions.length !== 0 ? (
                                        props.questions
                                            .sort((a, b) => {
                                                const timestampA = new Date(
                                                    a.timestamp
                                                ).getTime();
                                                const timestampB = new Date(
                                                    b.timestamp
                                                ).getTime();
                                                return timestampB - timestampA;
                                            })
                                            .sort(
                                                (a, b) =>
                                                    b.likeNumber.length -
                                                    a.likeNumber.length
                                            )
                                            .map((item, index) => (
                                                <Box
                                                    key={index}
                                                    sx={{ cursor: "pointer" }}>
                                                    <ALQuestionCard
                                                        questions={item}
                                                        handleRefresh={
                                                            props.handleRefresh
                                                        }
                                                        handleSelectQuestion={
                                                            handleSelectQuestion
                                                        }
                                                        handleLoading={
                                                            props.handleLoading
                                                        }
                                                    />
                                                    <Divider />
                                                </Box>
                                            ))
                                    ) : (
                                        <Box sx={{ textAlign: "center" }}>
                                            <Typography
                                                fontWeight={"bold"}
                                                fontSize={20}
                                                sx={{
                                                    marginTop: "50%",
                                                    marginBottom: "10px",
                                                }}>
                                                No question yet
                                            </Typography>
                                            <Typography>
                                                Start making question and all{" "}
                                                <br />
                                                will be display here
                                            </Typography>
                                        </Box>
                                    )}
                                </>
                            ) : (
                                <>
                                    {props.myQuestions !== undefined &&
                                        (props.myQuestions.length !== 0 ? (
                                            props.myQuestions
                                                .sort((a, b) => {
                                                    const timestampA = new Date(
                                                        a.timestamp
                                                    ).getTime();
                                                    const timestampB = new Date(
                                                        b.timestamp
                                                    ).getTime();
                                                    return (
                                                        timestampB - timestampA
                                                    );
                                                })
                                                .map((item, index) => (
                                                    <Box
                                                        key={index}
                                                        sx={{
                                                            cursor: "pointer",
                                                        }}>
                                                        <ALQuestionCard
                                                            questions={item}
                                                            handleRefresh={
                                                                props.handleRefresh
                                                            }
                                                            handleSelectQuestion={
                                                                handleSelectQuestion
                                                            }
                                                            handleLoading={
                                                                props.handleLoading
                                                            }
                                                        />
                                                        <Divider />
                                                    </Box>
                                                ))
                                        ) : (
                                            <Box sx={{ textAlign: "center" }}>
                                                <Typography
                                                    sx={{
                                                        fontFamily: "Inter",
                                                        fontSize: "20px",
                                                        marginTop: "50%",
                                                        fontWeight: "bold",
                                                        marginBottom: "10px",
                                                    }}>
                                                    You have no question yet
                                                </Typography>
                                                <Box
                                                    sx={{
                                                        fontFamily: "Inter",
                                                        color: "#1C1C1C",
                                                        margintTop: "14px",
                                                    }}>
                                                    Start making question and{" "}
                                                    <br />
                                                    all will be display here
                                                </Box>
                                            </Box>
                                        ))}
                                </>
                            )}
                        </Box>
                        <Box
                            sx={{
                                position: "fixed",
                                bottom: 10,
                                right: "0px",
                                [themeApp.breakpoints.up("md")]: {
                                    position: "relative",
                                    width: "430px",
                                    bottom: 0,
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    marginTop: "10px",
                                },
                            }}>
                            <Box
                                sx={{
                                    cursor: "pointer",
                                    width: "172px",
                                    height: "56px",
                                    color: "white",
                                    borderRadius: "14px",
                                    background: "#2AC75F",
                                    marginRight: "10px",
                                    fontSize: "17px",
                                    fontWeight: "medium",
                                    display: "flex",
                                    [themeApp.breakpoints.up("md")]: {
                                        marginRight: "0px",
                                    },
                                    "&:hover": {
                                        background: "#2AC75F",
                                        color: "white",
                                    },
                                }}>
                                <Box
                                    onClick={handleOpenQueCard}
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        width: "100%",
                                        gap: "8px",
                                        alignContent: "center",
                                        alignItems: "center",
                                    }}>
                                    <ChatBubbleOutlineOutlinedIcon
                                        sx={{
                                            color: "white",
                                            width: "24px",
                                            height: "24px",
                                        }}
                                    />
                                    Ask question
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            )}
        </>
    );
}
