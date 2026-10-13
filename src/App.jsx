import * as React from 'react';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function App() {
  const [data, setData] = useState([
    {
      id: 1,
      name: "Vahobjon",
      desk: "About vahobjon@gmail.com 000088800",
      status: false,
    },
    {
      id: 2,
      name: "Firdavs",
      desk: "About Firdavs@gmail.com 000088800",
      status: true,
    },
    {
      id: 3,
      name: "Abubakr",
      desk: "About Abubakr@gmail.com 000088800",
      status: true,
    },
  ]);
  const deleteId = (id) => {
    setData((prev) => prev.filter((el) => el.id != id));
  };



 const [open, setOpen] = useState(false);
 const [openEdit, setOpenEdit] = useState(false);
const [editUser,setEditUser]=useState({})


  const handleClickOpenEdit = (el) => {
    setOpenEdit(true);
   setEditUser(el)
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
const newData={
  id:Date.now(),
  name:event.target.name.value,
  desk:event.target.desk.value
}
setData([...data,newData])
setOpen(false)
  };

  const handleSubmitEdit = (event) => {
    event.preventDefault();
    setData((prev)=> prev.map((el)=> el.id==editUser.id ? editUser : el));
    setOpenEdit(false)
  };
const [search,setSearch]=useState("")

  const [age, setAge] = useState('All');

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <>
    <div className='flex gap-5'>
         <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>
          <form onSubmit={handleSubmit} id="subscription-form">
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              label="FullName"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="desk"
              label="About You"
              fullWidth
              variant="standard"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" form="subscription-form">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    
     <TextField value={search} onChange={(e)=> setSearch(e.target.value)} id="outlined-basic" label="Search Users" variant="outlined" />
     
     <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small-label">All</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={age}
        label="All"
        onChange={handleChange}
      >
        <MenuItem value={"All"}>All</MenuItem>
        <MenuItem value={"true"}>Active</MenuItem>
        <MenuItem value={"false"}>inActive</MenuItem>
      </Select>
    </FormControl>
     </div>
         <div>
      <Dialog open={openEdit} onClose={handleCloseEdit}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>
          <form onSubmit={handleSubmitEdit} id="subscription-form">
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              label="FullName"
              fullWidth
              variant="standard"
              value={editUser.name}
              onChange={(e)=> setEditUser((prev)=> ({...prev,name:e.target.value}))}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="desk"
              label="About You"
              fullWidth
              variant="standard"
                            value={editUser.desk}
              onChange={(e)=> setEditUser((prev)=> ({...prev,desk:e.target.value}))}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit}>Cancel</Button>
          <Button type="submit" form="subscription-form">
            Edit
          </Button>
        </DialogActions>
      </Dialog>
    </div>


      <div className="flex  p-5 flex-wrap gap-20">
        {data.filter((el)=> {
          if (age=="All"){
            return el
          }
          else if (age=="true"){
            return el.status==true
          }
          else if (age=="false"){
            return el.status==false
          }
        }).filter((el)=> {
           return el.name.toLowerCase().includes(search.toLowerCase().trim())
        }).map((el) => {
          return (
            <div key={el.id}>
              <Card sx={{ minWidth: 340 }} className="p-5 ">
                <CardActionArea>
                  <CardContent className="">
                    <Typography gutterBottom variant="h5" component="div">
                      {el.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                      style={{marginBottom:20}}
                    >
                      {el.desk}
                    </Typography>
<div className='flex gap-4'>
                      <Button
                      onClick={() => deleteId(el.id)}
                      variant="contained"
                      color="error"
                    >
                      Delete
                    </Button>
                    <Button variant="contained" color="success" onClick={()=> handleClickOpenEdit(el)}>
                      Edit
                    </Button>
</div>
                  </CardContent>
                </CardActionArea>
              </Card>
            </div>
          );
        })}


        
      </div>

    </>
  );
}
export default App;
