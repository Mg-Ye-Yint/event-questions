import {
    Box,
    Button,
    IconButton,
    ListItemIcon,
    Menu,
    MenuItem,
    Typography,
} from "@mui/material";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import { useState } from "react";
import {
    deleteQuestionById,
    saveQuestion,
    unSaveQuestion,
} from "../../api/question";
import BookmarkRemoveOutlinedIcon from "@mui/icons-material/BookmarkRemoveOutlined";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Comment from "./Comment";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { getTimeDifferenceInMinutes } from "../../helper/getTime";
import ConfirmModalCard from "../ConfirmModalCard";
import { IQuestion } from "../../interface/IQuestion";

interface IData {
    questions: IQuestion;
    handleRefresh: () => void;
    handleSelectQuestion: (id: string) => void;
    handleLoading: () => void;
    handleChange: (newValue: number) => void;
}

export default function QuestionCard(props: IData) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const [openDeleteCard, setOpenDeleteCard] = useState(false);
    const [commentNumber, setCommentNumber] = useState(1);
    const [isExpandComment, setIsExpandComment] = useState(false);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSaveQuestion = async (id: string) => {
        props.handleLoading();
        await saveQuestion(id);
        props.handleRefresh();
        handleClose();
        props.handleChange(2);
    };
    const handleUnSaveQuestion = async (id: string) => {
        props.handleLoading();
        await unSaveQuestion(id);
        props.handleRefresh();
        handleClose();
    };
    const handleCloseDeleteCard = () => setOpenDeleteCard(false);
    const handleOpenDeleteCard = () => setOpenDeleteCard(true);

    const handleDeleteQuestion = async (id: string) => {
        props.handleLoading();
        await deleteQuestionById(id);
        props.handleRefresh();
        handleClose();
        handleCloseDeleteCard();
    };

    const handleExpandComment = () => {
        setIsExpandComment(true);
        setCommentNumber(props.questions.comment.length);
    };

    const handleOpenConfirm = () => {
        handleDeleteQuestion(props.questions.questionId);
        setOpenDeleteCard(!openDeleteCard);
    };

    return (
        <>
            <Box
                sx={{
                    background: "white",
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    height: "auto",
                }}>
                <Box
                    sx={{
                        display: "flex",
                        marginLeft: "16px",
                        paddingTop: "15px",
                        marginBottom: "5px",
                        fontSize: "13px",
                        justifyContent: "space-between",
                        alignItems: "center",
                        alignContent: "center",
                    }}>
                    <Box
                        sx={{
                            width: "90%",
                            display: "flex",
                            alignItems: "center",
                            alignContent: "center",
                        }}>
                        <Box sx={{ color: "black", marginRight: "5px" }}>
                            {props.questions.name}
                        </Box>
                        <Box sx={{ marginTop: "-3px" }}>.</Box>
                        <Box
                            sx={{
                                color: "#6C6C6C",
                                marginLeft: "5px",
                                marginRight: "5px",
                            }}>
                            {(() => {
                                const timeDifferenceInMinutes =
                                    getTimeDifferenceInMinutes(
                                        new Date(props.questions.timestamp)
                                    );
                                if (Number(timeDifferenceInMinutes) > 60) {
                                    return (
                                        <>
                                            {Math.floor(
                                                Number(
                                                    timeDifferenceInMinutes
                                                ) / 60
                                            )}{" "}
                                            hr
                                        </>
                                    );
                                } else {
                                    return <>{timeDifferenceInMinutes} m</>;
                                }
                            })()}{" "}
                        </Box>
                        {props.questions.comment.length > 0 && (
                            <>
                                <Box sx={{ marginTop: "-3px" }}>.</Box>
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
                        {props.questions.isEdit && (
                            <>
                                <Box sx={{ marginTop: "-3px" }}>.</Box>
                                <Box
                                    sx={{
                                        color: "#2ECC71",
                                        marginLeft: "5px",
                                    }}>
                                    Edited
                                </Box>
                            </>
                        )}
                    </Box>
                    {/* <DeleteCard
                    handleClose={handleCloseDeleteCard}
                    id={props.questions.questionId}
                    handleDeleteQuestion={handleDeleteQuestion}
                    open={openDeleteCard}
                /> */}
                    <ConfirmModalCard
                        open={openDeleteCard}
                        discard={false}
                        handleClose={() => setOpenDeleteCard(!openDeleteCard)}
                        handleDeleteDiscard={handleOpenConfirm}
                        context="Deleting question is permanent and cannot be undone."
                        buttonWord={"Delete"}
                        title={"Delete question?"}
                    />
                    <IconButton
                        aria-controls={open ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        onClick={handleClick}
                        sx={{ marginRight: "16px" }}>
                        <MoreHorizOutlinedIcon />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        PaperProps={{
                            sx: {
                                borderRadius: "10px",
                            },
                        }}>
                        {props.questions.isSave ? (
                            <MenuItem
                                sx={{
                                    fontSize: "14px",
                                    display: "flex",
                                    alignContent: "center",
                                    alignItems: "center",
                                }}
                                onClick={() =>
                                    handleUnSaveQuestion(
                                        props.questions.questionId
                                    )
                                }>
                                <ListItemIcon>
                                    <BookmarkRemoveOutlinedIcon />
                                </ListItemIcon>
                                Discard
                            </MenuItem>
                        ) : (
                            <MenuItem
                                sx={{
                                    fontSize: "14px",
                                    display: "flex",
                                    alignContent: "center",
                                    alignItems: "center",
                                }}
                                onClick={() =>
                                    handleSaveQuestion(
                                        props.questions.questionId
                                    )
                                }>
                                <ListItemIcon>
                                    <BookmarkAddOutlinedIcon />
                                </ListItemIcon>
                                <Box>Save</Box>
                            </MenuItem>
                        )}
                        <MenuItem
                            sx={{
                                fontSize: "14px",
                                alignContent: "center",
                                alignItems: "center",
                            }}
                            onClick={handleOpenDeleteCard}>
                            <ListItemIcon>
                                <DeleteOutlineOutlinedIcon />
                            </ListItemIcon>
                            Remove
                        </MenuItem>
                    </Menu>
                </Box>
                <Box sx={{ width: "95%", marginLeft: "16px" }}>
                    <Typography
                        onClick={() =>
                            props.handleSelectQuestion(
                                props.questions.questionId
                            )
                        }
                        sx={{
                            cursor: "pointer",
                            textAlign: "justify",
                            fontSize: "17px",
                        }}
                        fontWeight={"mediums"}>
                        {props.questions.questionText}
                    </Typography>
                </Box>
                <Box
                    sx={{
                        marginLeft: "16px",
                        display: "flex",
                        alignContent: "center",
                        alignItems: "center",
                        marginTop: "10px",
                        gap: "14px",
                    }}>
                    {props.questions.likeNumber.length == 0 ? (
                        <>
                            <Box
                                sx={{
                                    color: "#1C1C1C",
                                    display: "flex",
                                    alignContent: "center",
                                    alignItems: "center",
                                    borderRadius: "8px",
                                }}>
                                <ThumbUpIcon
                                    sx={{ width: "20px", height: "20px" }}
                                />
                            </Box>
                        </>
                    ) : (
                        <Box
                            sx={{
                                color: "#1C1C1C",
                                borderRadius: "8px",
                                display: "flex",
                                fontSize: "15px",
                                alignContent: "center",
                                alignItems: "center",
                                gap: "4px",
                            }}>
                            <ThumbUpIcon
                                sx={{
                                    width: "20px",
                                    height: "20px",
                                }}
                            />
                            {props.questions.likeNumber.length}
                        </Box>
                    )}
                    {props.questions.isSave && (
                        <Box
                            sx={{
                                display: "flex",
                                gap: "4px",
                                color: "#1C1C1C",
                                fontWeight: "regular",
                                fontFamily: "Inter",
                                fontSize: "15px",
                            }}>
                            <BookmarkAddedIcon
                                sx={{
                                    width: "20px",
                                    height: "20px",
                                    color: "#1C1C1C",
                                }}
                            />
                            Saved
                        </Box>
                    )}
                    {props.questions.isRead && (
                        <Box
                            sx={{
                                display: "flex",
                                alignContent: "center",
                                alignItems: "center",
                                color: "#1C1C1C",
                                fontSize: "15px",
                                gap: "4px",
                            }}>
                            <CheckOutlinedIcon
                                sx={{
                                    color: "#1C1C1C",
                                    width: "20px",
                                    height: "20px",
                                }}
                            />
                            Read
                        </Box>
                    )}
                </Box>
                <Box
                    sx={{
                        padding: "10px 14px 0px 14px",
                    }}>
                    {props.questions.comment.length != 0 &&
                        props.questions.comment
                            .slice(0, commentNumber)
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
                                <Box key={index} sx={{ marginBottom: "16px" }}>
                                    <Comment
                                        isHost={true}
                                        ownerName={item.name}
                                        date={item.timestamp.toLocaleString()}
                                        context={item.context}
                                        commentId={item.commentId}
                                        questionId={props.questions.questionId}
                                        handleRefresh={props.handleRefresh}
                                    />
                                </Box>
                            ))}
                </Box>
                {props.questions.comment.length > 1 && !isExpandComment && (
                    <Box
                        onClick={handleExpandComment}
                        sx={{
                            padding: "0px 14px 10px 14px",
                            display: "flex",
                            alignContent: "center",
                            alignItems: "center",
                            gap: "5px",
                            cursor: "pointer",
                        }}>
                        <AddCircleOutlineIcon sx={{ color: "#2ECC71" }} />
                        <Box
                            sx={{
                                color: "#6C6C6C",
                                fontSize: "15px",
                                fontFamily: "Inter",
                            }}>
                            {props.questions.comment.length - 1} more comment
                        </Box>
                    </Box>
                )}
            </Box>
        </>
    );
}
