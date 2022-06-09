import {Container, AppBar, Toolbar, IconButton, Typography, Button, Snackbar,Alert} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import { DataGrid, GridApi } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SubjectDialog from './SubjectDialog';
import DetailSubjectDialog from './DetailSubjectDialog'
import React from 'react';
import * as ReactDOM from 'react-dom/client';

class Subject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { field: 'id', headerName: 'Index', width: 70 },
        { field: 'SubID', headerName: 'SubID', width: 110 },
        { field: 'SubName', headerName: 'Sub Name', width: 250 },
        { field: 'Day', headerName: 'Day', width: 90 },
        { field: 'StartTime', headerName: 'Start', width: 90 },
        { field: 'EndTime', headerName: 'End', width: 90 },
        { field: 'Class', headerName: 'Classroom', width: 110 },
        { field: 'MaxSV', headerName: 'MaxSV', width: 80 },
        {
          field: 'detail',
          headerName: 'Details',
          sortable: false,
          renderCell: (params) => {
            const onClick = (e) => {
              e.stopPropagation();
      
              const id = params.id;
              const api: GridApi = params.api;
              const SubID = api.getCellValue(params.id,'SubID');
              const SubName = api.getCellValue(params.id,'SubName');
              ReactDOM.createRoot(
                document.getElementById('details-form')
              ).render(<DetailSubjectDialog 
                          subject={this.state.dataAPI[id-1]}
                          Modify={this.Modify}
                          SubID = {SubID}
                          id = {id}
                          SubName = {SubName}
                          notify = {this.Notify}
                        />);

            };
      
            return <Button onClick={onClick}><EditIcon /></Button>;
          },
        },
        {
          field: 'delete',
          headerName: 'Delete',
          sortable: false,
          renderCell: (params) => {
            const handleDelete = async (e) => {
              e.stopPropagation(); // don't select this row after clicking
              
              const api: GridApi = params.api;
              const id = params.id;
              const SubID = api.getCellValue(params.id,'SubID');
              const response = await fetch(
                `http://localhost:3001/subject/delete/${SubID}`,
                {
                  method: "DELETE",
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );
              if (response["status"] === 200) {
                this.setState((state)=>({
                  rows: [...state.rows.slice(0,id-1),...state.rows.slice(id)].map((e,i)=> ({id: i+1,SubID: e.SubID, SubName: e.SubName, Day: e.Day, StartTime: e.StartTime, EndTime: e.EndTime, MaxSV: e.MaxSV, Class: e.Class})),
                  dataAPI: [...state.dataAPI.slice(0,id-1),...state.dataAPI.slice(id)]
                }));
              }else {
                this.Notify("error","Delete Error");
                console.log("ko xoa dc");
              }
            };
            return <Button onClick={handleDelete}><DeleteIcon /></Button>;
          },
        }
      ],
      count: 0,
      rows: [],
      open: false,
      severity: "",
      dataAPI: [],
      message: ""
    };
    this.saveChange = this.saveChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.Notify = this.Notify.bind(this);
    this.Modify = this.Modify.bind(this);
  }

  componentDidMount() {
    fetch("http://localhost:3001/subject")
      .then((res) => res.json())
      .then((data) =>
        this.setState(() => ({
          dataAPI: data.map((obj) => obj["_doc"]),
          rows: data.map((obj, index) => ({
            id: index + 1,
            SubID: obj["_doc"].SubID,
            SubName: obj["_doc"].SubName,
            Day: obj["_doc"].Day,
            StartTime: obj["_doc"].StartTime,
            EndTime: obj["_doc"].EndTime,
            Class: obj["_doc"].Class,
            MaxSV: obj["_doc"].MaxSV,
            Student: obj["_doc"].Student,
          })),
        }))
      );
  }
  saveChange(row,data) {
    this.setState((state) => ({
      rows: [...state.rows, row],
      dataAPI: [...state.dataAPI,data]
    }));
  }

  Modify(id , row , data) {
    this.setState((state) => ({
      rows: [...state.rows.slice(0,id-1),row,...state.rows.slice(id)],
      dataAPI: [...state.dataAPI.slice(0,id-1),data,...state.dataAPI.slice(id)]
    }));
  }

  handleClose() {
    this.setState(() => ({
      open: false,
      severity: "",
      message: ""
    }));
  }
  Notify(severity,message) {
    this.setState(() => ({
      open: true,
      severity: severity,
      message: message
    }));
  }

  render() {
    return (
      <Container maxWidth="lg">
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>

            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Home
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
        <Container
          maxWidth="lg" sx={{ mt: 5 }}>
          <div style={{ height: 630, width: "100%" }}>
            <DataGrid
              disableSelectionOnClick
              rows={this.state.rows}
              columns={this.state.columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
            />
            <div id='details-form'/>
            <SubjectDialog
              savechange={this.saveChange}
              Notify={this.Notify}
              count = {this.state.rows.length}
            />
          </div>
        </Container>
        <Snackbar
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
        >
          <Alert
            onClose={this.handleClose}
            severity={this.state.severity}
            sx={{ width: "100%" }}
          >
            {this.state.message}
          </Alert>
        </Snackbar>
      </Container>
    );
  }
}

export default Subject;