import { Box, Typography } from "@mui/material";
import { deleteComment, likeComment, unLikeComment } from "../../api/question";
import ConfirmModalCard from "../ConfirmModalCard";
import { useState } from "react";
import { getTimeDifferenceInMinutes } from "../../helper/getTime";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import { IComment } from "../../interface/IQuestion";

interface IData {
    comment: IComment;
    ownerName: string;
    date: string;
    context: string;
    commentId: string;
    questionId: string;
    isHost: boolean;
    handleRefresh: () => void;
}

export default function Comment(props: IData) {
    const [openConfirm, setOpenConfirm] = useState(false);
    const userInfo = JSON.parse(localStorage.getItem("user") || "null");
    const isUserLiked = props.comment.likeNumber.some(
        (item) => item.userLikeId === userInfo.userId
    );

    const handleDeleteComment = async () => {
        await deleteComment(props.comment.commentId, props.questionId);
        props.handleRefresh();
    };
    const handleOpenConfirm = () => {
        handleDeleteComment();
        setOpenConfirm(!openConfirm);
        props.handleRefresh;
    };

    const handleLike = async () => {
        await likeComment(props.questionId, userInfo.userId, props.comment.commentId);
        props.handleRefresh();
    };
    const handleUnLike = async () => {
        await unLikeComment(props.questionId, userInfo.userId, props.comment.commentId);
        props.handleRefresh();
    };

    return (
        <>
            <ConfirmModalCard
                handleClose={() => setOpenConfirm(!openConfirm)}
                handleDeleteDiscard={handleOpenConfirm}
                open={openConfirm}
                discard={false}
                context="Deleting comment is permanent and cannot be undone."
                buttonWord={"Delete"}
                title={"Deleting comment?"}
            />
            <Box
                sx={{
                    display: "flex",
                    background: "rgba(46, 204, 113, 0.1)",
                    textAlign: "left",
                    flexDirection: "column",
                    fontSize: "15px",
                    borderRadius: "8px",
                }}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        margin: "16px 14px 16px 14px",
                        // marginBottom: "5px",
                    }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography
                            color={"#2ECC71"}
                            fontSize={"15px"}
                            textAlign={"left"}
                            fontWeight={"medium"}
                            sx={{ marginRight: "3px" }}
                            fontFamily={"Inter"}>
                            {props.ownerName}
                        </Typography>
                        <Box sx={{ marginBottom: "8px" }}>.</Box>
                        <Box
                            sx={{
                                color: "#6C6C6C",
                                marginLeft: "3px",
                                fontSize: "15px",
                            }}>
                            {(() => {
                                const timeDifferenceInMinutes =
                                    getTimeDifferenceInMinutes(
                                        new Date(props.comment.timestamp)
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
                    </Box>
                    {props.isHost && (
                        // <IconButton
                        //     onClick={() => setOpenConfirm(!openConfirm)}
                        //     size="small">
                        //     <DeleteOutlineIcon sx={{ fontSize: "18px" }} />
                        // </IconButton>
                        <Box
                            onClick={() => setOpenConfirm(!openConfirm)}
                            sx={{
                                color: "#1C1C1C",
                                fontSize: "13px",
                                cursor: "pointer",
                            }}>
                            Remove
                        </Box>
                    )}
                </Box>
                <Box
                    sx={{
                        margin: "0px 14px 16px 14px",
                        color: "#1C1C1C",
                        fontFamily: "Inter",
                        fontSize: "17px",
                    }}>
                    {props.context}
                </Box>
                <Box
                    sx={{
                        marginLeft: "16px",
                        display: "flex",
                        alignContent: "center",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}>
                    {props.isHost ? (
                        <Box
                            sx={{
                                display: "flex",
                                alignContent: "center",
                                alignItems: "center",
                                gap: "10px",
                                color: "#6C6C6C",
                                cursor: "pointer",
                            }}>
                            {props.comment.likeNumber.length == 0 ? (
                                <>
                                    <Box
                                        // onClick={() => handleLike()}
                                        sx={{
                                            width: "53px",
                                            height: "24px",
                                            color: "#1C1C1C",
                                            display: "flex",
                                            fontSize: "13px",
                                            alignContent: "center",
                                            alignItems: "center",
                                            borderRadius: "8px",
                                            marginBottom: "16px"
                                        }}>
                                        <ThumbUpIcon
                                            sx={{
                                                width: "16px",
                                                height: "16px",
                                            }}
                                        />
                                    </Box>
                                </>
                            ) : (
                                <>
                                    {isUserLiked ? (
                                        <Box
                                            sx={{
                                                width: "53px",
                                                height: "24px",
                                                color: "#1C1C1C",
                                                borderRadius: "8px",
                                                display: "flex",
                                                fontSize: "13px",
                                                alignContent: "center",
                                                alignItems: "center",
                                                gap: "3px",
                                                marginBottom: "16px"
                                            }}>
                                            <ThumbUpIcon
                                                sx={{
                                                    width: "16px",
                                                    height: "16px",
                                                }}
                                            />
                                            {props.comment.likeNumber.length}
                                        </Box>
                                    ) : (
                                        <Box
                                            sx={{
                                                width: "53px",
                                                height: "24px",
                                                color: "#1C1C1C",
                                                borderRadius: "8px",
                                                display: "flex",
                                                fontSize: "13px",
                                                alignContent: "center",
                                                alignItems: "center",
                                                gap: "3px",
                                                marginBottom: "16px"
                                            }}>
                                            <ThumbUpOutlinedIcon
                                                sx={{
                                                    width: "16px",
                                                    height: "16px",
                                                }}
                                            />
                                            {props.comment.likeNumber.length}
                                        </Box>
                                    )}
                                </>
                            )}
                        </Box>
                    ) : (
                        <Box
                            sx={{
                                display: "flex",
                                alignContent: "center",
                                alignItems: "center",
                                gap: "10px",
                                color: "#6C6C6C",
                                cursor: "pointer",
                            }}>
                            {props.comment.likeNumber.length == 0 ? (
                                <>
                                    <Box
                                        onClick={() => handleLike()}
                                        sx={{
                                            width: "53px",
                                            height: "24px",
                                            color: "#1C1C1C",
                                            display: "flex",
                                            fontSize: "13px",
                                            alignContent: "center",
                                            alignItems: "center",
                                            borderRadius: "8px",
                                            marginBottom: "16px"
                                        }}>
                                        <ThumbUpOutlinedIcon
                                            sx={{ fontSize: "16px" }}
                                        />
                                    </Box>
                                </>
                            ) : (
                                <>
                                    {isUserLiked ? (
                                        <Box
                                            onClick={() => handleUnLike()}
                                            sx={{
                                                width: "53px",
                                                height: "24px",
                                                color: "#1C1C1C",
                                                borderRadius: "8px",
                                                display: "flex",
                                                fontSize: "13px",
                                                alignContent: "center",
                                                alignItems: "center",
                                                gap: "3px",
                                                marginBottom: "16px"
                                            }}>
                                            <ThumbUpIcon
                                                sx={{
                                                    width: "16px",
                                                    height: "16px",
                                                }}
                                            />
                                            {props.comment.likeNumber.length}
                                        </Box>
                                    ) : (
                                        <Box
                                            onClick={() => handleLike()}
                                            sx={{
                                                width: "53px",
                                                height: "24px",
                                                color: "#1C1C1C",
                                                borderRadius: "8px",
                                                display: "flex",
                                                fontSize: "13px",
                                                alignContent: "center",
                                                alignItems: "center",
                                                gap: "3px",
                                                marginBottom: "16px"
                                            }}>
                                            <ThumbUpOutlinedIcon
                                                sx={{
                                                    width: "16px",
                                                    height: "16px",
                                                }}
                                            />
                                            {props.comment.likeNumber.length}
                                        </Box>
                                    )}
                                </>
                            )}
                        </Box>
                    )}

                </Box>
            </Box>
        </>
    );
}
