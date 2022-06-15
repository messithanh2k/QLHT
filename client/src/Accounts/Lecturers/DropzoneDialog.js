import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import Dropzone from '../Students/Dropzone';
import axios from 'axios';

export default function DropzoneDialog(props) {
    const [open, setOpen] = React.useState(false);
    const [file, setFile] = React.useState({});
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleUpload = async () => {
        if (typeof file[0] !== 'undefined') {
            if (
                file[0].type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
                file[0].type === 'application/vnd.ms-excel'
            ) {
                const formData = new FormData();
                formData.append('upfile', file[0]);

                await axios({
                    method: 'POST',
                    url: 'http://localhost:3001/lecturer/upload',
                    data: formData,
                    headers: { 'Content-Type': 'multipart/form-data' },
                })
                    .then((data) => {
                        props.Notify('success', 'Upload successfully!');

                        }
                    )
                    .catch((err) => props.Notify('error', `Error while uploading file`));

            }
            else
            {
                props.Notify('error', `Please upload '.xls' or '.xlxs' file type`);
            }
        } 
        else 
        {
            props.Notify('error', 'Please upload file !!!');
        }

        setOpen(false);
        await fetch('http://localhost:3001/lecturer', {
            method: 'GET',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
                
            }
        })
        .then((res) => res.json())
        .then((data) => props.upload(data.map((obj) => obj['_doc']),data.map((obj, index) => ({
            id: index + 1,
            FullName: obj['_doc'].FullName,
            Email: obj['_doc'].Email,
            IdentityNumber: obj['_doc'].IdentityNumber,
          }))));
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen} style={{ float: 'right' }} sx={{ m: 1 }}>
                Files <FileUploadIcon fontSize="small" />
            </Button>
            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                <DialogTitle>New Lecturers From Files</DialogTitle>
                <DialogContent>
                    <DialogContentText>Please upload '.xlxs' , '.xls' file:</DialogContentText>
                    <Dropzone setFile={setFile} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleUpload}>Upload</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
