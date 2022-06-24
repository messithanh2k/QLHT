import * as React from 'react';
import { Box } from '@mui/system';
import { DialogTitle,DialogContent,DialogActions,Dialog,TextField,Button } from '@mui/material';



export default function DetailSubjectDialog(props) {
  const [open, setOpen] = React.useState(true);
      
  const [ClassID, setClassID] = React.useState(props.classs.ClassID);
  const [SubID, setSubID] = React.useState(props.classs.SubID);
  const [LecID, setLecID] = React.useState(props.classs.LecID);
  const [Day, setDay] = React.useState(props.classs.Day);
  const [StartTime, setStartTime] = React.useState(props.classs.StartTime);
  const [EndTime, setEndTime] = React.useState(props.classs.EndTime);
  const [Room, setRoom] = React.useState(props.classs.Room);
  const [MaxSV, setMaxSV] = React.useState(props.classs.MaxSV);
  const [Student, setStudent] = React.useState(props.classs.Student);
  const StudentName = [];

  const getStudentName = async (e) => {// don't select this row after clicking
    
    const response = await fetch(
      `http://localhost:3001/subject/getStudent/${e}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response["status"] === 200) {
      const data = await response.json();

      StudentName.push(data[0]['FullName']);
    }else {
      this.Notify("error","Delete Error");
      console.log("ko xoa dc");
    }
  };

  const handleClose = () => {
    console.log(Student);
    console.log("Student");
    setOpen(false);
  };
  const getStuName = () => {
    Student.forEach(element => {
      console.log(getStudentName(element))
    });
    };
  

  const handleModify = async () => {
    const response = await fetch('http://localhost:3001/class/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "SubID": SubID,
        "ClassID": ClassID,
        "LecID": LecID,
        "Day": Day,
        "Room": Room,
        "StartTime": StartTime,
        "EndTime": EndTime,
        "MaxSV": MaxSV,
        "Student": Student,
      })
    })

    const data = await response.json()
    if (data['success']===true) {
      props.Modify(props.id,{id: props.id,ClassID: ClassID, SubID: SubID, LecID: LecID, Day: Day, Room: Room, StartTime: StartTime, EndTime: EndTime, MaxSV: MaxSV , Student: Student}
        ,{
        "ClassID": ClassID,
        "SubID": SubID,
        "LecID": LecID,
        "Day": Day,
        "Room": Room,
        "StartTime": StartTime,
        "EndTime": EndTime,
        "MaxSV": MaxSV,
        "Student": Student,
      });
      props.notify("success","Modify successfully!");
    }
    else {
      props.notify("error"," error!!!");
    }
    setOpen(false);
  };
  // getStudentName()
  return (
    <div>
      {/* {getStudentName()} */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle style={{textAlign: "center"}} sx={{margin: 2, fontSize: 30}}>Class Details</DialogTitle>
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
                id="ClassID"
                label="ClassID"
                defaultValue={ClassID}
                onChange={(event)=>{
                  setClassID(event.target.value)
                }}
              />
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
                required
                id="LecID"
                label="LecID"
                defaultValue={LecID}
                onChange={(event)=>{
                  setLecID(event.target.value)
                }}
              />
              <TextField 
              required 
              id="Room" 
              label="Room"
              defaultValue={Room}
              onChange={(event)=>{
                setRoom(event.target.value)
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
              <TextField 
              required 
              id="Student" 
              label="Student"
              defaultValue={Student}
              // onChange={(event)=>{
              //   setMaxSV(event.target.value)
              // }}
              >
                {/* {getStuName} */}
              </TextField>
              
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
