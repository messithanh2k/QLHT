import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import Dropzone from './Dropzone';

export default function DropzoneDialog() {
    const [open, setOpen] = React.useState(false);
    const [file, setFile] = React.useState({});
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    
    const handleUpload = () => {
        console.log(file[0]);
        setOpen(false);
    }

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen} style={{ float: 'right' }} sx={{ m: 1 }}>
                Files <FileUploadIcon fontSize="small" />
            </Button>
            <Dialog open={open} onClose={handleClose} maxWidth='md' fullWidth>
                <DialogTitle>New Students From Files</DialogTitle>
                <DialogContent>
                    <DialogContentText>Please upload '.xlxs' file:</DialogContentText>
                    <Dropzone setFile={setFile}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleUpload}>Upload</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
