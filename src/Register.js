import React, { useState,useEffect } from "react";
import "./App.css";

import {
    Input,
    Radio,
    Checkbox,
    User,
    Textarea,
    Button,
    Spacer,
    Text,
    Card
  } from "@nextui-org/react";

  // Material Ui

import MuiAlert from "@mui/material/Alert";
import Snackbar from '@mui/material/Snackbar';

// Firebase
import { db, storage } from "./firbase";
import { addDoc, collection,getDoc,getDocs } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



function Register() {
 // Use State for text Filds
 const [user, setUser] = useState({fname:"",lname:""});

 const [open, setOpen] = React.useState(false);

 //Use State for file Upload
 const [file, setFile] = useState(null);
 const [url, setUrl] = useState("");


 //useState for View User
 const [view,setView]=useState([])

 //Function for Upload Image
 const handleFileChange = (e) => {
   if (e.target.files[0]) {
     setFile(e.target.files[0]);

     const storageRef = ref(storage, user.fname + " " + "" + user.lname);
     uploadBytes(storageRef, file)
       .then(() => {
         getDownloadURL(storageRef)
           .then((url) => setUrl(url))
           .catch((err) => console.log(err.message));
         console.log(url);
       })
       .catch((err) => console.log(err.message));
   }
 };


 useEffect(() => {
   
   const getUser= async()=>{
     const data=await(getDocs(collection(db,"users")))
     setView(data)
     }
     getUser()
 
 }, [])
 







 const handelSave = async (e) => {
   e.preventDefault();
   await addDoc(collection(db, "users"), user).then(setOpen(true) );
 };

 console.log(user);



  return (
    <div>Register</div>
  )
}

export default Register