import { Box, Button, Divider, Typography } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout';
import { deleteUserById } from '../api/audience';
import { useNavigate } from 'react-router-dom';

interface IData {
    handleCloseCard: () => void;
}

export default function LeaveCard(props: IData) {
	const navigate = useNavigate();
    const userInfo = JSON.parse(localStorage.getItem("user") || "null");
    const handleLeave = async () => {
        if(userInfo) {
			await deleteUserById(userInfo.userId);
			navigate('/');
		}
    }

  return (
    <Box sx={{padding:"10px", textAlign:"center", display:"flex", flexDirection:"column"}}>
        <Typography sx={{ marginBottom:"10px", fontWeight:"bold" }}>
            Are you sure to leave?
        </Typography>
          <Typography sx={{ marginBottom: "10px" }}>
              You can rejoin again by using the
              invitation code.
          </Typography>
          <Divider sx={{ marginBottom: "10px" }} />
          <Box sx={{display:"flex", gap:"10px", justifyContent:"center"}}>
              <Button 
                onClick={props.handleCloseCard}
                variant="outlined" 
                sx={{ 
                    borderRadius:"8px", color:"black", 
                    width: "181px", height: "49px",
                    border:"1px solid #9C9C9C",
                    "&:hover": {
                        border: "1px solid #9C9C9C",
                    }
                    }}>Cancel</Button>
              <Button 
                onClick={handleLeave}
                variant="outlined" endIcon={< LogoutIcon />} 
                sx={{ borderRadius: "8px", color:"#FA6056", 
                width: "181px", height: "49px", 
                border: "1px solid #FA6056",
                "&:hover": {
                    border: "1px solid #FA6056",
                }
                }}>Leave</Button>
          </Box>
    </Box>
  )
}
