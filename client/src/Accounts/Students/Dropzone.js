import { Input, Button, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import UploadFileIcon from '@mui/icons-material/UploadFile';

function Dropzone({ open , setFile }) {
    const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({});

    const files = acceptedFiles.map((file) => (
        <Typography key={file.path} textAlign="left">
            {file.path} - {file.size} bytes
        </Typography>
    ));
    
    useEffect(()=> {
        setFile(acceptedFiles);
    });
    
    return (
        <div
            {...getRootProps({ className: 'dropzone' })}
            style={{
                textAlign: 'center',
                padding: '20px',
                border: '3px #00ffff dashed',
                width: '100%',
                margin: '16px auto',
            }}
        >
            <Input className="input-zone" {...getInputProps()}/>
            <div className="text-center">
                {isDragActive ? (
                    <Typography className="dropzone-content" variant='h5'>Release to drop the files here</Typography>
                ) : (
                    <Typography className="dropzone-content" variant='h5'>
                        Drag ’n’ drop some files here, or click to select files
                    </Typography>
                )}
                <Button type="button" onClick={open} className="btn" variant="text" sx={{m: 3}}>
                <UploadFileIcon fontSize="large"/>
                </Button>
            </div>
            <aside>
                {files}
            </aside>
        </div>
    );
}

export default Dropzone;
