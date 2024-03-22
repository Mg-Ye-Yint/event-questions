import {
    Box,
    Button,
    Divider,
    IconButton,
    Modal,
    Typography,
} from "@mui/material";
import { IQuestion } from "../../interface/Ievent";
import { useEffect, useState } from "react";
import {
    addComment,
    deleteQuestionById,
    getQuesById,
    likeQuestion,
    saveQuestion,
    unlikeQuestion,
    unSaveQuestion,
} from "../../api/question";
import DeleteCard from "../DeleteCard";
import Comment from "../QuestionCard/Comment";
import AddQuestion from "../AddQuestion";
import AlerQuestion from "../AlerQuestion";
import CloseIcon from "@mui/icons-material/Close";
import { themeApp } from "../../utils/Theme";
import AudienceButton from "./AudienceButton";
import HostButton from "./HostButton";

interface IData {
    questionId: string;
    isHost: boolean;
    ownerId: string;
    ownerName: string;
    openPreviewCard: boolean;
    refresh: number;
    handleCloseCard: () => void;
    handleRefresh: () => void;
}

export default function PreviewQuestion(props: IData) {
    const [questions, setQuestions] = useState<IQuestion>();
    const [comment, setComment] = useState("");
    const [open, setOpen] = useState(false);
    const [refresh, setRefresh] = useState(0);
    const [openQueCard, setOpenQueCard] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const userInfo = JSON.parse(localStorage.getItem("user") || "null");
    const [isUserLiked, SetIsUserLiked] = useState(false);
    const [oldContext, setOldContext] = useState("");
    const now = new Date();

    useEffect(() => {
        const fetch = async () => {
            const data = await getQuesById(props.questionId ?? "");
            if (data) {
                setQuestions(data);
                const isUserLiked = data.likeNumber.some(
                    (item: { userLikeId: string }) =>
                        item.userLikeId === userInfo.userId
                );
                SetIsUserLiked(isUserLiked);
            }
        };
        if (props.openPreviewCard) {
            fetch();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refresh, props.refresh]);

    // const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    //     setAnchorEl(event.currentTarget);
    // };
    // const handleClose = () => {
    //     setAnchorEl(null);
    // };

    const handleSaveQuestion = async () => {
        await saveQuestion(props.questionId);
        handleRefresh();
        props.handleRefresh();
    };
    const handleUnSaveQuestion = async () => {
        await unSaveQuestion(props.questionId);
        handleRefresh();
        props.handleRefresh();
    };
    const handleDeleteQuestion = async (id: string) => {
        await deleteQuestionById(id);
        props.handleRefresh();
        props.handleCloseCard();
    };
    const handleCloseCard = () => {
        setOpen(!open);
    };

    const handleSetComment = (event: React.ChangeEvent<HTMLInputElement>) => {
        setComment(event.target.value);
    };

    const handleRefresh = () => {
        setRefresh((pre) => pre + 1);
        props.handleRefresh();
    };

    const handleAddComment = async () => {
        const data = {
            ownerId: props.ownerId,
            name: props.ownerName,
            context: comment,
            timestamp: now,
        };
        try {
            await addComment(data, props.questionId);
            setComment("");
            handleRefresh();
        } catch (error) {
            console.error(error);
        }
    };
    const handleOpenQueCard = (context: string) => {
        setOldContext(context);
        setOpenQueCard(true);
    };
    const handleCloseQueCard = () => setOpenQueCard(false);

    const handleOpenAlert = () => setOpenAlert(true);
    const handleCloseAlert = () => setOpenAlert(false);

    const handleLike = async () => {
        await likeQuestion(props.questionId, userInfo.userId);
        handleRefresh();
    };
    const handleUnLike = async () => {
        await unlikeQuestion(props.questionId, userInfo.userId);
        handleRefresh();
    };

    return (
        <Modal open={props.openPreviewCard}>
            <Box
                sx={{
                    position: "absolute",
                    top: "40%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    bgcolor: "background.paper",
                    borderRadius: "20px",
                    width: "90%",
                    height: "auto",
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
                    <AddQuestion
                        handleClose={handleCloseQueCard}
                        handleRefresh={handleRefresh}
                        handleCloseAlert={handleCloseAlert}
                        handleOpenAlert={handleOpenAlert}
                        isEdit={true}
                        ownerName={props.ownerName}
                        questionId={props.questionId}
                        openQueCard={openQueCard}
                        context={oldContext}
                    />
                    <AlerQuestion
                        open={openAlert}
                        context={"Your question has been edited!"}
                    />
                    <DeleteCard
                        handleClose={handleCloseCard}
                        id={props.questionId}
                        handleDeleteQuestion={handleDeleteQuestion}
                        open={open}
                    />
                    {questions !== undefined && (
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
                                    padding: "14px",
                                    fontSize: "13px",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    alignContent: "center",
                                }}>
                                <Box sx={{ width: "50%", display: "flex" }}>
                                    <Box
                                        sx={{
                                            color: "black",
                                            marginRight: "5px",
                                            fontFamily: "Inter",
                                            fontSize: "17px",
                                        }}>
                                        {questions.name}'s question
                                    </Box>
                                </Box>

                                <Box
                                    sx={{
                                        display: "flex",
                                        alignContent: "center",
                                        alignItems: "center",
                                    }}>
                                    <IconButton
                                        sx={{
                                            fontSize: "13px",
                                            background: "#F7F7F7",
                                            width: "32px",
                                            height: "32px",
                                        }}
                                        onClick={props.handleCloseCard}>
                                        <CloseIcon
                                            sx={{
                                                width: "20px",
                                                height: "20px",
                                                color: "black",
                                            }}
                                        />
                                    </IconButton>
                                </Box>
                            </Box>
                            <Divider sx={{ marginBottom: "10px" }} />
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    marginBottom: "14px",
                                }}>
                                <Box
                                    sx={{
                                        width: "90%",
                                        display: "flex",
                                        alignContent: "center",
                                        alignItems: "center",
                                        fontSize: "15px",
                                    }}>
                                    <Typography
                                        color={"#1C1C1C"}
                                        fontSize={"15px"}
                                        textAlign={"left"}
                                        fontWeight={"mediums"}
                                        sx={{
                                            marginLeft: "16px",
                                            marginRight: "3px",
                                        }}
                                        fontFamily={"Inter"}>
                                        {questions.name}
                                    </Typography>
                                    {questions.isEdit && (
                                        <>
                                            <Box sx={{ marginTop: "-5px" }}>
                                                .
                                            </Box>
                                            <Box
                                                sx={{
                                                    color: "#2ECC71",
                                                    marginLeft: "5px",
                                                    marginRight: "5px",
                                                }}>
                                                Edited
                                            </Box>
                                        </>
                                    )}
                                    {questions.comment.length > 0 && (
                                        <>
                                            <Box
                                                sx={{
                                                    marginTop: "-5px",
                                                }}>
                                                .
                                            </Box>
                                            <Button
                                                sx={{
                                                    color: "white",
                                                    marginLeft: "5px",
                                                    background: "#2ECC71",
                                                    height: "22px",
                                                    width: "86px",
                                                    textTransform: "none",
                                                    borderRadius: "4px",
                                                }}>
                                                Answered
                                            </Button>
                                        </>
                                    )}
                                </Box>
                            </Box>
                            <Typography
                                color={"#1C1C1C"}
                                fontSize={"17px"}
                                textAlign={"left"}
                                fontWeight={"mediums"}
                                sx={{
                                    marginLeft: "16px",
                                    marginBottom: "10px",
                                }}
                                fontFamily={"Inter"}>
                                {questions.questionText}
                            </Typography>
                            <Typography
                                textAlign={"left"}
                                sx={{
                                    color: "#6C6C6C",
                                    marginLeft: "16px",
                                    marginBottom: "16px",
                                }}>
                                {questions.timestamp.toLocaleString()}
                            </Typography>
                            <Box
                                sx={{
                                    padding: "0px 14px 14px 14px",
                                }}>
                                {questions.comment.length != 0 &&
                                    questions.comment
                                        .sort((a, b) => {
                                            const timestampA =
                                                a.timestamp instanceof Date
                                                    ? a.timestamp.getTime()
                                                    : 0;
                                            const timestampB =
                                                b.timestamp instanceof Date
                                                    ? b.timestamp.getTime()
                                                    : 0;
                                            return timestampB - timestampA;
                                        })
                                        .map((item, index) => (
                                            <Box
                                                key={index}
                                                sx={{ marginBottom: "16px" }}>
                                                <Comment
                                                    isHost={props.isHost}
                                                    ownerName={item.name}
                                                    date={item.timestamp.toLocaleString()}
                                                    context={item.context}
                                                    commentId={item.commentId}
                                                    questionId={
                                                        questions.questionId
                                                    }
                                                    handleRefresh={
                                                        props.handleRefresh
                                                    }
                                                />
                                            </Box>
                                        ))}
                            </Box>
                            {props.isHost ? (
                                <HostButton
                                    isUserLiked={isUserLiked}
                                    openQueCard={openQueCard}
                                    likeNumber={questions.likeNumber.length}
                                    context={questions.questionText}
                                    comment={comment}
                                    isSave={questions.isSave}
                                    handleUnLike={handleUnLike}
                                    handleLike={handleLike}
                                    handleCloseCard={handleCloseCard}
                                    handleOpenQueCard={handleOpenQueCard}
                                    handleAddComment={handleAddComment}
                                    handleSetComment={handleSetComment}
                                    handleSaveQuestion={handleSaveQuestion}
                                    handleUnSaveQuestion={handleUnSaveQuestion}
                                />
                            ) : (
                                <AudienceButton
                                    isUserLiked={isUserLiked}
                                    openQueCard={openQueCard}
                                    likeNumber={questions.likeNumber.length}
                                    context={questions.questionText}
                                    handleUnLike={handleUnLike}
                                    handleLike={handleLike}
                                    handleCloseCard={handleCloseCard}
                                    handleOpenQueCard={handleOpenQueCard}
                                />
                            )}
                        </Box>
                    )}
                </Box>
            </Box>
        </Modal>
    );
}
