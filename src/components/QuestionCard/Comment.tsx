import { Box, IconButton, Typography } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { deleteComment } from "../../api/question";
import ConfirmModalCard from "../ConfirmModalCard";
import { useState } from "react";

interface IData {
    ownerName: string;
    date: string;
    context: string;
    commentId: string;
    questionId: string;
    isHost: boolean;
    handleRefresh: () => void;
    handleLoading: () => void;
}

export default function Comment(props: IData) {
    const [openConfirm, setOpenConfirm] = useState(false);

    const handleDeleteComment = async () => {
        await deleteComment(props.commentId, props.questionId);
        props.handleRefresh();
    };
    const handleOpenConfirm = () => {
        props.handleLoading();
        handleDeleteComment();
        setOpenConfirm(!openConfirm);
        props.handleRefresh;
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
                            {props.date}
                        </Box>
                    </Box>
                    {props.isHost && (
                        <IconButton
                            onClick={() => setOpenConfirm(!openConfirm)}
                            size="small">
                            <DeleteOutlineIcon sx={{ fontSize: "18px" }} />
                        </IconButton>
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
            </Box>
        </>
    );
}
