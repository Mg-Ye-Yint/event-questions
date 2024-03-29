import {
    Box,
    Button,
    FormControl,
    IconButton,
    InputAdornment,
    OutlinedInput,
    Typography,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import { ChangeEvent, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import BookmarkAddedOutlinedIcon from "@mui/icons-material/BookmarkAddedOutlined";

interface IData {
    isUserLiked: boolean;
    likeNumber: number;
    context: string;
    openQueCard: boolean;
    comment: string;
    isSave: boolean;
    handleUnLike: () => void;
    handleLike: () => void;
    handleCloseCard: () => void;
    handleOpenQueCard: (context: string) => void;
    handleSetComment: (event: ChangeEvent<HTMLInputElement>) => void;
    handleAddComment: () => void;
    handleSaveQuestion: () => void;
    handleUnSaveQuestion: () => void;
}

export default function HostButton(props: IData) {
    // const [hovered, setHovered] = useState(false);
    // const [hoveredDelete, setHoveredDelete] = useState(false);
    // const [hoveredSave, setHoveredSave] = useState(false);
    const [openComment, setOpenComment] = useState(false);

    const handleOpenComment = () => {
        setOpenComment(!openComment);
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box
                sx={{
                    display: "flex",
                    gap: "8px",
                    marginLeft: "16px",
                    marginBottom: "14px",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                }}>
                <Box sx={{ display: "flex", gap: "8px" }}>
                    <Button
                        sx={{
                            width: "75px",
                            height: "38px",
                            borderRadius: "50px",
                            background: "#FFFFFF",
                            border: "1px solid #C9CCD0",
                            color: "black",
                            textTransform: "none",
                            gap: "3px",
                            "&:hover": {
                                background: "#FFFFFF",
                            },
                        }}>
                        <ThumbUpIcon
                            sx={{
                                width: "20px",
                                height: "20px",
                            }}
                        />
                        <Typography fontSize={15}>
                            {props.likeNumber == 0 ? "" : props.likeNumber}
                        </Typography>
                    </Button>
                    <Button
                        onClick={handleOpenComment}
                        sx={{
                            width: "127px",
                            height: "36px",
                            borderRadius: "50px",
                            background: "#FFFFFF",
                            border: "1px solid #C9CCD0",
                            color: "black",
                            textTransform: "none",
                            "&:hover": {
                                background: "#FFFFFF",
                                color: "#2ECC71",
                            },
                        }}>
                        {openComment ? (
                            <>
                                <ChatBubbleOutlineOutlinedIcon
                                    sx={{ color: "#2ECC71" }}
                                />
                                <Typography color={"#2ECC71"} fontSize={15}>
                                    Comment
                                </Typography>
                            </>
                        ) : (
                            <>
                                <ChatBubbleOutlineOutlinedIcon />
                                <Typography fontSize={15}>Comment</Typography>
                            </>
                        )}
                    </Button>
                    <Button
                        onClick={
                            props.isSave
                                ? props.handleUnSaveQuestion
                                : props.handleSaveQuestion
                        }
                        sx={{
                            width: "101px",
                            height: "36px",
                            borderRadius: "50px",
                            background: "#FFFFFF",
                            border: "1px solid #C9CCD0",
                            color: "black",
                            textTransform: "none",
                            "&:hover": {
                                background: "#FFFFFF",
                                color: "#2ECC71",
                            },
                        }}>
                        {props.isSave ? (
                            <>
                                <BookmarkAddedOutlinedIcon
                                    sx={{ color: "#2ECC71" }}
                                />
                                <Typography color={"#2ECC71"} fontSize={15}>
                                    Saved
                                </Typography>
                            </>
                        ) : (
                            <>
                                <BookmarkAddOutlinedIcon />
                                <Typography fontSize={15}>Saved</Typography>
                            </>
                        )}
                    </Button>
                </Box>
                {/* <Button
                    onClick={props.handleCloseCard}
                    sx={{
                        width: "114px",
                        height: "36px",
                        borderRadius: "50px",
                        background: "#FFFFFF",
                        border: "1px solid #C9CCD0",
                        color: "black",
                        textTransform: "none",
                        marginRight: "14px",
                        "&:hover": {
                            background: "#FFFFFF",
                            color: "#FA6056",
                        },
                    }}>
                    <DeleteOutlineOutlinedIcon />
                    <Typography fontSize={15}>Delete</Typography>
                </Button> */}
            </Box>
            {openComment && (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                    }}>
                    <FormControl
                        sx={{
                            width: "95%",
                            padding: 1,
                        }}
                        variant="outlined">
                        <OutlinedInput
                            placeholder="Add your comment..."
                            multiline
                            sx={{
                                background: "white",
                                borderRadius: "14px",
                                border: "1px solid #C9CCD0",
                                "&:hover": {
                                    border: "1px solid #2ECC71",
                                },
                                "&:action": {
                                    border: "1px solid #2ECC71",
                                },
                            }}
                            id="Event name"
                            value={props.comment}
                            onChange={props.handleSetComment}
                            endAdornment={
                                <InputAdornment position="end">
                                    {props.comment ? (
                                        <IconButton
                                            edge="end"
                                            sx={{
                                                border: "0px",
                                            }}
                                            onClick={props.handleAddComment}>
                                            <SendIcon />
                                        </IconButton>
                                    ) : (
                                        <></>
                                    )}
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </Box>
            )}
        </Box>
    );
}
