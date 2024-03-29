import {
    Box,
    Button,
    Divider,
    IconButton,
    Modal,
    Typography,
} from "@mui/material";
import { themeApp } from "../utils/Theme";
import { useParams } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";
import { createQuestion, updateQuestion } from "../api/question";
import CloseIcon from "@mui/icons-material/Close";
import ConfirmModalCard from "./ConfirmModalCard";

interface IData {
    handleClose: () => void;
    handleRefresh: () => void;
    handleCloseAlert: () => void;
    handleOpenAlert: () => void;
    isEdit: boolean;
    questionId?: string;
    context: string;
    ownerName: string;
    openQueCard: boolean;
}

export default function AddQuestion(props: IData) {
    const now = new Date();
    const userInfo = JSON.parse(localStorage.getItem("user") || "null");
    const { eventId } = useParams();
    const [text, setText] = useState("");
    const [openConfirm, setOpenConfirm] = useState(false);
    const [isClick, setIsClick] = useState(false);

    useEffect(() => {
        setText(props.context);
    }, [props.context]);

    const handleClick = () => {
        setIsClick(true);
    };

    const handleAddQuestion = async () => {
        try {
            const addData = {
                questionText: text,
                ownerId: userInfo.userId,
                name: userInfo.name,
                eventId: eventId || "",
                timestamp: now,
            };
            const editData = {
                questionText: text,
                timestamp: now,
            };
            if (props.isEdit) {
                await updateQuestion(props.questionId ?? "", editData);
            } else {
                await createQuestion(addData);
                props.handleOpenAlert();
                setTimeout(() => {
                    props.handleCloseAlert();
                }, 2000);
            }

            props.handleRefresh();
            props.handleClose();
            setText("");
        } catch (error) {
            console.error(error);
        }
    };

    const handleOpenConfirm = () => {
        setText(props.context);
        setOpenConfirm(!openConfirm);
        props.handleClose();
        props.handleRefresh;
    };

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
    };

    const handleCloseConfirm = () => {
        setOpenConfirm(!openConfirm);
        setIsClick(!isClick);
    };

    return (
        <>
            <ConfirmModalCard
                handleClose={() => setOpenConfirm(!openConfirm)}
                handleDeleteDiscard={handleOpenConfirm}
                open={openConfirm}
                discard={true}
                context="Changes you made will not be saved"
                buttonWord={"Discard"}
                title={"Unsaved Change"}
            />
            <Modal open={props.openQueCard}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "40%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        bgcolor: "background.paper",
                        borderRadius: "20px",
                        border: "0px",
                        width: "90%",
                        [themeApp.breakpoints.up("md")]: {
                            width: "398px",
                        },
                    }}>
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
                                textAlign: "center",
                                width: "100%",
                            }}>
                            <Box
                                sx={{
                                    display: "flex",
                                    paddingLeft: "14px",
                                    paddingRight: "14px",
                                    paddingTop: "10px",
                                    marginBottom: "5px",
                                    fontSize: "13px",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    alignContent: "center",
                                }}>
                                <Box
                                    sx={{
                                        width: "100%",
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignContent: "center",
                                        alignItems: "center",
                                    }}>
                                    {props.isEdit ? (
                                        <Box
                                            sx={{
                                                fontSize: "17px",
                                                color: "black",
                                                marginRight: "5px",
                                                fontFamily: "Inter",
                                                fontWeight: "medium",
                                            }}>
                                            Edit question
                                        </Box>
                                    ) : (
                                        <Box
                                            sx={{
                                                fontSize: "17px",
                                                color: "black",
                                                marginRight: "5px",
                                                fontFamily: "Inter",
                                                fontWeight: "medium",
                                            }}>
                                            New question
                                        </Box>
                                    )}
                                    <IconButton
                                        onClick={
                                            text != "" && isClick
                                                ? handleCloseConfirm
                                                : props.handleClose
                                        }
                                        size="small">
                                        <CloseIcon />
                                    </IconButton>
                                </Box>
                            </Box>
                            <Divider sx={{ marginBottom: "16px" }} />
                            <Box
                                sx={{
                                    marginBottom: "14px",
                                    marginLeft: "14px",
                                    textAlign: "left",
                                }}>
                                <Typography>{props.ownerName}</Typography>
                            </Box>
                            <Box
                                sx={{
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}>
                                <Box
                                    onClick={handleClick}
                                    sx={{
                                        display: "flex",
                                        background: "white",
                                        borderRadius: "8px",
                                        width: "90%",
                                        marginRight: "14px",
                                        marginLeft: "14px",
                                        border: "1px solid #2ECC71",
                                    }}>
                                    <Box
                                        sx={{
                                            width: "100%",
                                            borderRadius: "14px",
                                            marginTop: "10px",
                                        }}>
                                        <textarea
                                            value={text}
                                            onChange={handleChange}
                                            style={{
                                                borderRadius: "14px",
                                                fontSize: "17px",
                                                width: "95%",
                                                border: "none",
                                                outline: "none",
                                                color: "black",
                                                resize: "none",
                                                fontFamily: "Inter",
                                                height: "250px",
                                            }}
                                            maxLength={800}
                                            placeholder="What is in your mind?"
                                        />
                                    </Box>
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "center",
                                }}>
                                <Button
                                    disabled={text == ""}
                                    sx={{
                                        height: "49px",
                                        color: "black",
                                        borderRadius: "14px",
                                        marginTop: "25px",
                                        border: "1px solid #2ECC71",
                                        marginLeft: "10px",
                                        marginRight: "10px",
                                        background: "#2ECC71",
                                        marginBottom: "13px",
                                        width: "100%",
                                        "&:hover": {
                                            background: "#2ECC71",
                                            color: "black",
                                        },
                                        [themeApp.breakpoints.up("lg")]: {
                                            width: "370px",
                                        },
                                        fontFamily: "Inter",
                                        textTransform: "none",
                                    }}
                                    onClick={handleAddQuestion}>
                                    {props.isEdit ? "Save" : "Send question"}
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </>
    );
}
