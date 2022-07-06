import {Container, AppBar, Toolbar, IconButton, Typography, Button, Snackbar,Alert} from '@mui/material'
import { DataGrid, GridApi } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import SubDetail from './SubDetail'
import React from 'react';
import * as ReactDOM from 'react-dom/client';

class SubList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { field: 'id', headerName: 'Index', width: 90 },
        { field: 'ClassID', headerName: 'ClassID', width: 200 },
        { field: 'SubID', headerName: 'SubID', width: 200 },
        { field: 'name', headerName: 'Subject Name', width: 330 },
        { field: 'numSV', headerName: 'numSV', width: 130 },
        {
          field: 'detail',
          headerName: 'Details',
          width: 80,
          sortable: false,
          renderCell: (params) => {
            const onClick = (e) => {
              e.stopPropagation();
      
              const id = params.id;
              const api: GridApi = params.api;
              const ClassID = api.getCellValue(params.id,'ClassID');
              ReactDOM.createRoot(
                document.getElementById('details-form')
              ).render(<SubDetail 
                          classs={this.state.dataAPI[id-1]}
                          Modify={this.Modify}
                          ClassID = {ClassID}
                          id = {id}
                          notify = {this.Notify}
                        />);

            };
      
            return <Button onClick={onClick}><EditIcon /></Button>;
          },
        },
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
    fetch('http://localhost:3001/lecturer/sub', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "LecID": "Đỗ Bá Lâm"
       
      })
    })
    .then((res) => res.json())
    .then((data) =>
        this.setState(() => ({
          dataAPI: data.map((obj) => obj),
          rows: data.map((obj, index) => ({
            id: index + 1,
            ClassID: obj.ClassID,
            SubID: obj.SubID,
            name: obj.name,
            Day: obj.Day,
            StartTime: obj.StartTime,
            EndTime: obj.EndTime,
            Room: obj.Room,
            numSV: obj.numSV,
            Student: obj.Students,
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
        <Container
          maxWidth="lg" sx={{ mt: 5, mb: 10 }}>
          <div style={{ height: 600, width: "94%" }}>
            <DataGrid
              disableSelectionOnClick
              rows={this.state.rows}
              columns={this.state.columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
            />
            <div id='details-form'/>
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

export default SubList;