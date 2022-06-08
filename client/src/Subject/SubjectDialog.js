import * as React from 'react';
import { Box } from '@mui/system';
import { DialogTitle,DialogContent,DialogActions,Dialog,TextField,Button } from '@mui/material';


export default function SubjectDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [SubID, setSubID] = React.useState('');
  const [SubName, setSubName] = React.useState('');
  const [Day, setDay] = React.useState('');
  const [Class, setClass] = React.useState('');
  const [StartTime, setStartTime] = React.useState('');
  const [EndTime, setEndTime] = React.useState('');
  const [MaxSV, setMaxSV] = React.useState('');


  const handleClickOpen = () => {
    setSubID('');
    setSubName('');
    setDay(63);
    setClass('');
    setStartTime('');
    setEndTime('');
    setMaxSV('');
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    const response = await fetch('http://localhost:3001/subject/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "SubID": SubID,
        "SubName": SubName,
        "Day": Day,
        "Class": Class,
        "StartTime": StartTime,
        "EndTime": EndTime,
        "MaxSV": MaxSV,
      })
    })

    const data = await response.json()
    if (data['success']===true) {
      props.savechange({id: props.count + 1,SubID: data.SubID, SubName: data.SubName, Day: data.Day, StartTime: data.StartTime,EndTime: data.EndTime, Class: data.Class, MaxSV: data.MaxSV},{
        "SubID": SubID,
        "SubName": SubName,
        "Day": Day,
        "Class": Class,
        "StartTime": StartTime,
        "EndTime": EndTime,
        "MaxSV": MaxSV,
      })
     

    
    }
    else {
      props.Notify("error", "Create Student Error!!!");
    }
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="text"
        onClick={handleClickOpen}
        style={{ float: "right" }}
      >
        Add Subject
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle style={{textAlign: "center"}} sx={{margin: 2, fontSize: 30}}>New Subject</DialogTitle>
        <DialogContent>
          <Box 
            component="form"
            sx={{ "& .MuiTextField-root": { m: 1, width: "60ch" }, display: 'flex', flexWrap: 'wrap'}}
            noValidate
            autoComplete="off"
          >
            <div>
            <TextField
                required
                id="SubID"
                label="Subject ID"
                onChange={(event)=>{
                  setSubID(event.target.value)
                }}
              />
              <TextField
                required
                id="SubName"
                label="Subject Name"
                onChange={(event)=>{
                  setSubName(event.target.value)
                }}
              />
              <TextField
                required
                id="Day"
                label="Day"
                onChange={(event)=>{
                  setDay(event.target.value)
                }}
              />
              <TextField 
              required 
              id="Class" 
              label="Class"
              onChange={(event)=>{
                setClass(event.target.value)
              }}
              />
              <TextField
                id="StartTime"
                label="StartTime"
                type="number"
                onChange={(event)=> {
                  setStartTime(event.target.value);
                }}
              >
            
              </TextField>
              <TextField
                required
                id="EndTime"
                label="EndTime"
                type="number"
                onChange={(event)=>{
                  setEndTime(event.target.value)
                }}
              />
              <TextField
                required
                id="MaxSV"
                label="MaxSV"
                type = "number"
                onChange={(event)=>{
                  setMaxSV(event.target.value)
                }}
              />
              
            
            </div>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
