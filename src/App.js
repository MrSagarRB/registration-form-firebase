import React, { useState,useEffect } from "react";
import "./App.css";

// Next Ui
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

function App() {



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
    <div className="App">
      <Text
        h1
        size={40}
        css={{
          textGradient: "45deg, $blue500 -20%, $pink500 50%",
        }}
        weight="bold"
      >
        Register
      </Text>

      <div className="mobile_msg">
        <Text
          h1
          size={40}
          css={{
            textGradient: "45deg, $purple500 -20%, $pink500 100%",
          }}
          weight="bold"
        >
          This Page Is only Desing for Desktop. <br /> So Please turn on
          Descktop View in Your Mobile
        </Text>
      </div>
<div className="container"> 
      <form onSubmit={handelSave}>
        <Input
          underlined
          labelPlaceholder="First Name"
          color="primary"
          onChange={(e) => {
            setUser({ ...user, fname: e.target.value });
          }}
        />
        <Input
          underlined
          labelPlaceholder="Last Name"
          color="primary"
          onChange={(e) => {
            setUser({ ...user, lname: e.target.value });
          }}
        />

        <Radio.Group className="Radio" name="gender">
          <Radio
            value="male"
            size="sm"
            name="male"
            onClick={(e) => {
              setUser({ ...user, gender: "male" });
            }}
          >
            Male
          </Radio>

          <Radio
            value="female"
            color="secondary"
            size="sm"
            name="female"
            onClick={(e) => {
              setUser({ ...user, gender: "female" });
            }}
          >
            Female
          </Radio>
        </Radio.Group>
        <div className="check">
          <Checkbox color="success" labelColor="English" size="sm" onChange={(e) =>{setUser({...user,lan:[true]})}}>
            English
          </Checkbox>

          <Checkbox color="warning" labelColor="Marathi" size="sm" onChange={(e) =>{setUser({...user,lan:{marathi: e.target.checked}})}} >
            Marathi
          </Checkbox>

          <Checkbox color="error" labelColor="Hindi" size="sm" >
            Hindi
          </Checkbox>
        </div>
        <div className="photo">
          <User src={url} name={user.fname + " " + "" + user.lname} size="xl" />
          <input type="file" onChange={(e) => handleFileChange(e)} />
        </div>
        <Textarea
          placeholder="Enter Your Message"
          rows={4}
          onChange={(e) => {
            setUser({ ...user, msg: e.target.value});
          }}
        />

        <div>
        {/* <input type="date" /> */}
        </div>
        <div className="btn">
          <Button shadow color="success" onClick={handelSave}>
            Save
          </Button>
          <Button shadow color="warning">
            Reset
          </Button>
        </div>
        <Snackbar open={open} autoHideDuration={6000} >
        <Alert severity="warning" sx={{ width: '100%' }}>
          Data Saved Successfully
        </Alert>
      </Snackbar>
      </form>
      <div>

      {/* <Card hoverable clickable>
            <Card.Body css={{ p: 0 }}>
              <Card.Image
                objectFit="cover"
                src={}
                width="100%"
                height={140}
                alt={item.title}
              />
            </Card.Body>
            <Card.Footer justify="flex-start">
              <Row wrap="wrap" justify="space-between">
                <Text b>{item.title}</Text>
                <Text css={{ color: "$accents4", fontWeight: "$semibold" }}>
                  {item.price}
                </Text>
              </Row>
            </Card.Footer>
          </Card> */}
      </div>
      </div>


    </div>
  );
}

export default App;
