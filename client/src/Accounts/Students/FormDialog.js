import * as React from 'react';
import { Box } from '@mui/system';
import {LocalizationProvider, DatePicker} from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { MenuItem,DialogTitle,DialogContent,DialogActions,Dialog,TextField,Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [FullName, setFullName] = React.useState('');
  const [DateOfBirth, setDateOfBirth] = React.useState(new Date());
  const [SchoolYear, setSchoolYear] = React.useState(63);
  const [Class, setClass] = React.useState('');
  const [Sex, setSex] = React.useState('');
  const [Major, setMajor] = React.useState('');
  const [Born, setBorn] = React.useState('');
  const [IdentityNumber, setIdentityNumber] = React.useState('');
  const [PhoneNumber, setPhoneNumber] = React.useState('');

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

  const handleClickOpen = () => {
    setFullName('');
    setDateOfBirth(new Date());
    setSchoolYear(63);
    setClass('');
    setSex('');
    setMajor('');
    setBorn('');
    setIdentityNumber('');
    setPhoneNumber('');
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    const response = await fetch('http://localhost:3001/student/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "FullName": FullName,
        "DateOfBirth": DateOfBirth,
        "SchoolYear": SchoolYear,
        "Class": Class,
        "Sex": Sex,
        "Major": Major,
        "Born": Born,
        "IdentityNumber": IdentityNumber,
        "PhoneNumber": PhoneNumber,
      })
    })

    const data = await response.json()
    if (data['success']===true) {
      props.savechange({id: props.count + 1,SID: data.SID, FullName: data.FullName, Email: data.Email, IdentityNumber: data.IdentityNumber},{
        "FullName": FullName,
        "DateOfBirth": DateOfBirth,
        "SchoolYear": SchoolYear,
        "Class": Class,
        "Sex": Sex,
        "Major": Major,
        "Born": Born,
        "IdentityNumber": IdentityNumber,
        "PhoneNumber": PhoneNumber,
      })
      props.Notify("success","Create Student Sucessfully!");
    }
    else {
      props.Notify("error", "Create Student Error!!!");
    }
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        style={{ float: "right" }}
        sx={{mt: 1}}
      >
        Add <AddIcon fontSize="small"/>
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle style={{textAlign: "center"}} sx={{margin: 2, fontSize: 30}}>New Student Account</DialogTitle>
        <DialogContent>
          <Box 
            component="form"
            sx={{ "& .MuiTextField-root": { m: 1, width: "37ch" }, display: 'flex', flexWrap: 'wrap'}}
            noValidate
            autoComplete="off">
            <div>
              <TextField
                required
                id="FullName"
                label="Full Name"
                onChange={(event)=>{
                  setFullName(event.target.value)
                }}
              />
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Date of Birth"
                  defaultValue = {new Date().toDateString()}
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
                defaultValue={63}
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
              onChange={(event)=>{
                setClass(event.target.value)
              }}
              />
              <TextField
                id="Sex"
                select
                label="Gender"
                value={Sex}
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
                onChange={(event)=>{
                  setMajor(event.target.value)
                }}
              />
              <TextField
                required
                id="Born"
                label="Home town"
                onChange={(event)=>{
                  setBorn(event.target.value)
                }}
              />
              <TextField
                required
                id="IdentityNumber"
                label="Identity Number"
                onChange={(event)=>{
                  setIdentityNumber(event.target.value)
                }}
              />
              <TextField
                required
                id="PhoneNumber"
                label="Phone Number"
                onChange={(event)=>{
                  setPhoneNumber(event.target.value)
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
