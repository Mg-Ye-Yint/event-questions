import { Box, Button, Typography } from "@mui/material";
// import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";

interface IData {
    isUserLiked: boolean;
    isOwner: boolean;
    likeNumber: number;
    context: string;
    openQueCard: boolean;
    handleUnLike: () => void;
    handleLike: () => void;
    handleCloseCard: () => void;
    handleOpenQueCard: (context: string) => void;
}

export default function AudienceButton(props: IData) {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: "8px",
                marginLeft: "16px",
                marginBottom: "14px",
            }}>
            <Box>
                {props.isUserLiked ? (
                    <Button
                        startIcon={
                            <ThumbUpIcon
                                sx={{
                                    width: "20px",
                                    height: "20px",
                                }}
                            />
                        }
                        onClick={() => props.handleUnLike()}
                        sx={{
                            width: "75px",
                            height: "38px",
                            borderRadius: "50px",
                            background: "#FFFFFF",
                            color: "#2ECC71",
                            border: "1px solid #C9CCD0",
                            marginRight: "8px",
                            "&:hover": {
                                background: "#FFFFFF",
                                color: "#black",
                            },
                        }}>
                        <Typography fontSize={15} color={"#2ECC71"}>
                            {props.likeNumber}
                        </Typography>
                    </Button>
                ) : (
                    <Button
                        onClick={() => props.handleLike()}
                        sx={{
                            width: "75px",
                            height: "38px",
                            borderRadius: "50px",
                            background: "#FFFFFF",
                            border: "1px solid #C9CCD0",
                            color: "black",
                            textTransform: "none",
                            marginRight: "8px",
                            "&:hover": {
                                background: "#FFFFFF",
                                color: "#2ECC71",
                            },
                        }}
                        startIcon={
                            <ThumbUpOutlinedIcon
                                sx={{
                                    width: "20px",
                                    height: "20px",
                                }}
                            />
                        }>
                        <Typography fontSize={15}>
                            {props.likeNumber}
                        </Typography>
                    </Button>
                )}
                {props.isOwner && (
                    <>
                        <Button
                            onClick={() =>
                                props.handleOpenQueCard(props.context)
                            }
                            sx={{
                                width: "84px",
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
                            <ModeEditOutlinedIcon />
                            <Typography fontSize={15}>Edit</Typography>
                        </Button>
                    </>
                )}
            </Box>
            {/* {props.isOwner && (
                <Button
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
                </Button>
            )} */}
        </Box>
    );
}
