import {Container, AppBar, Toolbar, IconButton, Typography, Button, Snackbar,Alert} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import { DataGrid, GridApi, GridCellValue } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FormDialog from './FormDialog';
import React from 'react';


class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { field: 'id', headerName: 'Index', width: 70 },
        { field: 'SID', headerName: 'SID', width: 110 },
        { field: 'FullName', headerName: 'Full Name', width: 250 },
        { field: 'Email', headerName: 'Email', width: 270 },
        {
          field: 'Password',
          headerName: 'Password',
          sortable: false,
          width: 200,
        },
        {
          field: 'detail',
          headerName: 'Detail',
          sortable: false,
          renderCell: (params) => {
            const onClick = () => {
              // e.stopPropagation(); // don't select this row after clicking
      
              const api: GridApi = params.api;
              const thisRow: Record<string, GridCellValue> = {};
      
              api
                .getAllColumns()
                .filter((c) => c.field !== '__check__' && !!c)
                .forEach(
                  (c) => (thisRow[c.field] = params.getValue(params.id, c.field)),
                );
      
              return alert(JSON.stringify(thisRow, null, 4));
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
              const Email = api.getCellValue(params.id,'Email');
              const response = await fetch(
                `http://localhost:3001/student/${Email}`,
                {
                  method: "DELETE",
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );
              if (response["status"] === 200) {
                this.setState((state)=>({
                  rows: [...state.rows.slice(0,id-1),...state.rows.slice(id)].map((e,i)=> ({id: i+1,SID: e.SID, FullName: e.FullName, Email: e.Email, Password: e.Password}))
                }));
                const user = await fetch(
                  `http://localhost:3001/auth/delete/${Email}`,
                  {
                    method: "DELETE",
                    headers: {
                      "Content-Type": "application/json",
                    },
                  }
                );
                if (user) this.Notify("success","Delete Success");
                else {
                  this.Notify("error","Delete Error");
                }
              } else {
                this.Notify("error","Delete Error");
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
  }

  componentDidMount() {
    fetch("http://localhost:3001/student")
      .then((res) => res.json())
      .then((data) =>
        this.setState(() => ({
          dataAPI: data.map((obj) => obj["_doc"]),
          rows: data.map((obj, index) => ({
            id: index + 1,
            SID: obj["_doc"].SID,
            FullName: obj["_doc"].FullName,
            Email: obj["_doc"].Email,
            Password: obj.Password,
          })),
        }))
      );
  }
  saveChange(row) {
    this.setState((state) => ({
      rows: [...state.rows, row],
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
        <Container maxWidth="lg" sx={{ mt: 5 }}>
          <div style={{ height: 630, width: "100%" }}>
            <DataGrid
              disableSelectionOnClick
              rows={this.state.rows}
              columns={this.state.columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
            />
            <FormDialog
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

export default Account;