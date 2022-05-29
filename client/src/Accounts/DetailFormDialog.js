import * as React from 'react';
import { Box } from '@mui/system';
import {LocalizationProvider, DatePicker} from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { MenuItem,DialogTitle,DialogContent,DialogActions,Dialog,TextField,Button } from '@mui/material';



export default function DetailFormDialog(props) {
  const [open, setOpen] = React.useState(true);
      
  const [FullName, setFullName] = React.useState(props.student.FullName);
  const [DateOfBirth, setDateOfBirth] = React.useState(new Date(props.student.DateOfBirth));
  const [SchoolYear, setSchoolYear] = React.useState(props.student.SchoolYear);
  const [Class, setClass] = React.useState(props.student.Class);
  const [Sex, setSex] = React.useState(props.student.Sex);
  const [Major, setMajor] = React.useState(props.student.Major);
  const [Born, setBorn] = React.useState(props.student.Born);
  const [IdentityNumber, setIdentityNumber] = React.useState(props.student.IdentityNumber);
  const [PhoneNumber, setPhoneNumber] = React.useState(props.student.PhoneNumber);
  const options = [
    {
      value: 'Male',
      label: 'Male',
    },
    {
      value: 'Female',
      label: 'Female',
    },
  ];

 
  const handleClose = () => {
    setOpen(false);
  };

//   const handleSave = async () => {
//     const response = await fetch('http://localhost:3001/student/create', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         "FullName": FullName,
//         "DateOfBirth": DateOfBirth,
//         "SchoolYear": SchoolYear,
//         "Class": Class,
//         "Sex": Sex,
//         "Major": Major,
//         "Born": Born,DetailFormDialog
//         "IdentityNumber": IdentityNumber,
//         "PhoneNumber": PhoneNumber,
//       })
//     })

//     const data = await response.json()
//     if (data['success']===true) {
//       props.savechange({id: props.count + 1,SID: data.SID, FullName: data.FullName, Email: data.Email, Password: data.SID})
//       const resgister = await fetch('http://localhost:3001/auth/register', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 email: data.Email,
//                 password: data.SID
//             })
//         });

//       if (resgister) props.Notify("success","Create Student Sucessfully!");
//       else {
//         props.Notify("error", "Register Account Error!!!");
//       }
//     }
//     else {
//       props.Notify("error", "Create Student Error!!!");
//     }
//     setOpen(false);
//   };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle style={{textAlign: "center"}} sx={{margin: 2, fontSize: 30}}>Student Details</DialogTitle>
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
                id="FullName"
                label="Full Name"
                defaultValue={FullName}
                onChange={(event)=>{
                  setFullName(event.target.value)
                }}
              />
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Date of Birth"
                  defaultValue = {DateOfBirth}
                  value={DateOfBirth.toDateString()}
                  onChange={(date) => {
                    setDateOfBirth(date);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
              <TextField
                required
                id="SchoolYear"
                label="School Year  "
                type="number"
                defaultValue={SchoolYear}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(event)=>{
                  setSchoolYear(event.target.value)
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
                id="Gender"
                select
                label="Gender"
                defaultValue={Sex}
                onChange={(event)=> {
                  setSex(event.target.value);
                }}
              >
                {options.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                required
                id="Major"
                label="Major"
                defaultValue={Major}
                onChange={(event)=>{
                  setMajor(event.target.value)
                }}
              />
              <TextField
                required
                id="Born"
                label="Home town"
                defaultValue={Born}
                onChange={(event)=>{
                  setBorn(event.target.value)
                }}
              />
              <TextField
                required
                id="IdentityNumber"
                label="Identity Number"
                defaultValue={IdentityNumber}
                onChange={(event)=>{
                  setIdentityNumber(event.target.value)
                }}
              />
              <TextField
                required
                id="PhoneNumber"
                label="Phone Number"
                defaultValue={PhoneNumber}
                onChange={(event)=>{
                  setPhoneNumber(event.target.value)
                }}
              />
            </div>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
