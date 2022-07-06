import * as React from 'react';
import { Box } from '@mui/system';
import { DialogTitle,DialogContent,DialogActions,Dialog,TextField,Button } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/Inbox';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ListItemAvatar from '@mui/material/ListItemAvatar';


export default function DetailSubjectDialog(props) {
  const [open, setOpen] = React.useState(true);
  const ClassID = props.classs.ClassID;
  const SubID = props.classs.SubID;
  const name = props.classs.name;
  const Day = props.classs.Day;
  const StartTime = props.classs.StartTime;
  const EndTime = props.classs.EndTime;
  const Room = props.classs.Room;
  const numSV = props.classs.numSV;
  const Student = props.classs.Students;

      


  const handleClose = () => {
    setOpen(false);
    console.log(Student);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle style={{textAlign: "center"}} sx={{margin: 2, fontSize: 30}}>Class Details</DialogTitle>
        <DialogContent>
          <Box 
            component="form"
            sx={{ "& .MuiTextField-root": { m: 1, width: "37ch" }, display: 'flex', flexWrap: 'wrap'}}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                required
                id="ClassID"
                label="ClassID"
                defaultValue={ClassID}
                InputProps={{
                    readOnly: true,
                  }}
              />
              <TextField
                required
                id="SubID"
                label="SubID"
                defaultValue={SubID}
                InputProps={{
                    readOnly: true,
                  }}
              />
              <TextField
                required
                id="LecID"
                label="LecID"
                defaultValue={name}
                InputProps={{
                    readOnly: true,
                  }}
              />
              <TextField 
              required 
              id="Room" 
              label="Room"
              defaultValue={Room}
              InputProps={{
                readOnly: true,
              }}
              />
              <TextField 
              required 
              id="Day" 
              label="Day"
              defaultValue={Day}
              InputProps={{
                readOnly: true,
              }}
              />
              <TextField 
              required 
              id="StartTime" 
              label="StartTime"
              defaultValue={StartTime}
              InputProps={{
                readOnly: true,
              }}
              />
              <TextField 
              required 
              id="EndTime" 
              label="EndTime"
              defaultValue={EndTime}
              InputProps={{
                readOnly: true,
              }}
              />
              
              <Divider sx={{ bgcolor: "secondary.black" }} />
              <ListItemText primary={`Student List (`+numSV+')'} sx={{paddingTop:1, color:"black", fontWeight:"bold" }} />
              <List sx={{ width: '100%', maxWidth: 400, bgcolor: 'background.paper' }}>
      {Student.map((sectionId) => (
        <ListItem>
        <ListItemAvatar>
          <Avatar>
            <AccountCircleIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={`${sectionId.name}`} secondary={`${sectionId.mssv}`} />
      </ListItem>
      ))}
    </List>
              
            </div>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
