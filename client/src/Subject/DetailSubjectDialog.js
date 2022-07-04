import * as React from 'react';
import { Box } from '@mui/system';
import { DialogTitle,DialogContent,DialogActions,Dialog,TextField,Button } from '@mui/material';



export default function DetailSubjectDialog(props) {
  const [open, setOpen] = React.useState(true);
      
  const [SubID, setSubID] = React.useState(props.subject.SubID);
  const [SubName, setSubName] = React.useState(props.subject.SubName);
  const [Department, setDepartment] = React.useState(props.subject.Department);
  const [Credit, setCredit] = React.useState(props.subject.Credit);

 
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
        "Department": Department,
        "Credit": Credit,
      })
    })

    const data = await response.json()
    if (data['success']===true) {
      props.Modify(props.id,{id: props.id, SubID: SubID, SubName: SubName, Department: Department, Credit: Credit}
        ,{
        "SubID": SubID,
        "SubName": SubName,
        "Credit": Credit,
        "Department": Department,
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
              id="Department" 
              label="Department"
              defaultValue={Department}
              onChange={(event)=>{
                setDepartment(event.target.value)
              }}
              />
              <TextField 
              required 
              id="Credit" 
              label="Credit"
              defaultValue={Credit}
              onChange={(event)=>{
                setCredit(event.target.value)
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
