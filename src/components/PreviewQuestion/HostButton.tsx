import {
    Box,
    Button,
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
    handleSetComment: (event: ChangeEvent<HTMLTextAreaElement>) => void;
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
                        border: "0px"
                    }}>
                    {/* <FormControl
                        sx={{
                            width: "95%",
                            padding: 1,
                            border: "0px",
                        }}
                        variant="outlined"
                    >
                        <OutlinedInput
                            maxRows={3}
                            placeholder="Add your comment..."
                            multiline
                            sx={{
                                background: "white",
                                borderRadius: "14px",
                                border: "1px solid #2ECC71",
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
                                <InputAdornment sx={{ border: "0px" }} position="end">
                                    {props.comment ? (
                                        <IconButton
                                            edge="end"
                                            sx={{
                                                border: "0px",
                                            }}
                                            onClick={props.handleAddComment}>
                                            <SendIcon sx={{ color: "#2ECC71" }} />
                                        </IconButton>
                                    ) : (
                                        <></>
                                    )}
                                </InputAdornment>
                            }
                        />
                    </FormControl> */}
                    <Box
                        sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                        <Box
                            sx={{
                                display: "flex",
                                background: "white",
                                borderRadius: "8px",
                                width: "90%",
                                marginRight: "14px",
                                marginLeft: "14px",
                                border: "2px solid #2ECC71",
                                alignContent: "center",
                                alignItems: "center",
                                marginBottom: "16px"
                            }}>
                            <Box
                                sx={{
                                    width: "100%",
                                    borderRadius: "14px",
                                    marginTop: "10px",
                                }}>
                                <textarea
                                    value={props.comment}
                                    onChange={props.handleSetComment}
                                    style={{
                                        borderRadius: "14px",
                                        fontSize: "17px",
                                        width: "95%",
                                        border: "none",
                                        outline: "none",
                                        color: "black",
                                        resize: "none",
                                        fontFamily: "Inter",
                                        height: "30px",
                                        maxHeight: "100px"
                                    }}
                                    maxLength={200}
                                    placeholder="What is in your mind?"
                                />
                            </Box>
                            {props.comment ? (
                                <Box
                                    sx={{
                                        cursor: "pointer",
                                        border: "0px",
                                        marginRight: "5px"
                                    }}
                                    onClick={props.handleAddComment}>
                                    <SendIcon sx={{ color: "#2ECC71" }} />
                                </Box>
                            ) : (
                                <></>
                            )}
                        </Box>
                    </Box>
                    {/* <textarea
                        placeholder="Add your comment..."
                        maxLength={100} style={{
                            resize: 'none', width: "95%",
                            padding: 1, fontFamily: "Inter"
                        }} /> */}
                </Box>
            )}
        </Box>
    );
}
