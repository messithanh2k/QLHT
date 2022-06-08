import * as React from 'react';
import { Box } from '@mui/system';
import { DialogTitle,DialogContent,DialogActions,Dialog,TextField,Button } from '@mui/material';



export default function DetailSubjectDialog(props) {
  const [open, setOpen] = React.useState(true);
      
  const [SubID, setSubID] = React.useState(props.subject.SubID);
  const [SubName, setSubName] = React.useState(props.subject.SubName);
  const [Day, setDay] = React.useState(props.subject.Day);
  const [StartTime, setStartTime] = React.useState(props.subject.StartTime);
  const [EndTime, setEndTime] = React.useState(props.subject.EndTime);
  const [Class, setClass] = React.useState(props.subject.Class);
  const [MaxSV, setMaxSV] = React.useState(props.subject.MaxSV);

  
  const handleClose = () => {
    setOpen(false);
  };

  const handleModify = async () => {
    const response = await fetch('http://localhost:3001/subject/update', {
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
      props.Modify(props.id,{id: props.id, SubID: SubID, SubName: SubName, Day: Day, Class: Class, StartTime: StartTime, EndTime: EndTime, MaxSV: MaxSV }
        ,{
        "SubID": SubID,
        "SubName": SubName,
        "Day": Day,
        "Class": Class,
        "StartTime": StartTime,
        "EndTime": EndTime,
        "MaxSV": MaxSV,
      });
      props.notify("success","Modify successfully!");
    }
    else {
      props.notify("error"," error!!!");
    }
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle style={{textAlign: "center"}} sx={{margin: 2, fontSize: 30}}>Subject Details</DialogTitle>
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
                label="SubID"
                defaultValue={SubID}
                onChange={(event)=>{
                  setSubID(event.target.value)
                }}
              />
              <TextField
                id="SubName"
                label="SubName"
                defaultValue={SubName}
                onChange={(event)=>{
                    setSubName(event.target.value)
                  }}
              />
              <TextField 
              required 
              id="Class" 
              label="Class"
              defaultValue={Class}
              onChange={(event)=>{
                setClass(event.target.value)
              }}
              />
              <TextField 
              required 
              id="Day" 
              label="Day"
              defaultValue={Day}
              onChange={(event)=>{
                setDay(event.target.value)
              }}
              />
              <TextField 
              required 
              id="StartTime" 
              label="StartTime"
              defaultValue={StartTime}
              onChange={(event)=>{
                setStartTime(event.target.value)
              }}
              />
              <TextField 
              required 
              id="EndTime" 
              label="EndTime"
              defaultValue={EndTime}
              onChange={(event)=>{
                setEndTime(event.target.value)
              }}
              />
              <TextField 
              required 
              id="MaxSV" 
              label="MaxSV"
              defaultValue={MaxSV}
              onChange={(event)=>{
                setMaxSV(event.target.value)
              }}
              />
              
            </div>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleModify}>Modify</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
