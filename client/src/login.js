import React, { useState } from "react";
import { Button, TextField } from '@mui/material'
import axios from 'axios'
import { toast ,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// toast.configure();

function Login() {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [accessCode, setAccessCode] = useState("");
    const [isSent, setIsSend] = useState(false);
 
    const handleSendCode = (e) => {
        e.preventDefault();
        
        const body = JSON.stringify({ phoneNumber });
        if(phoneNumber !== ""){
            axios.post(
              'http://localhost:9000/api/send-code',
              body,
              {
                  headers: {
                    "Content-Type": "application/json",
                  },
              }
            ).then((res) => {
                toast.success('Access code sent successfully', {autoClose:3000});
                setIsSend(true);
            })
            .catch((err) => {
                console.log('err', err)
                toast.error('Error!', {
                  autoClose: 3000,
              });
          });
        } else {
            toast.error('Please enter your phone number!', {autoClose:3000})
        }
    };
    
      const handleVerify = (e) => {
        e.preventDefault();
      
        const body = JSON.stringify({ phoneNumber, accessCode});
        if(accessCode !== ""){
        axios.post(
            'http://localhost:9000/api/validate',
            body,
            {
                headers: {
                  "Content-Type": "application/json",
                },
            }
          )
          .then((res) => {
            toast.success('Verified!', {autoClose:3000});           
          }).catch((err) => {
              console.log('err', err);
              toast.error('Wrong code!', {autoClose:3000})

        });
      } else {
        toast.error('Please enter access code', {autoClose:3000})
    }
}
 
    return (
        <section className="login-container">
            <div className="login">
                <h1 className="header">
                    SKIPLI CODING CHALLENGE
                </h1>
   
                <div style={{display:'flex',justifyContent:'center'}}>
                    <TextField
                    type="text"
                    size="small"
                    placeholder="Phone number"
                    onChange={(e)=>{
                        setPhoneNumber(e.target.value);
                    }
                }
                />
                <Button
                    onClick={handleSendCode}
                    sx={{
                        color:'white', 
                        background:'green', 
                        textTransform:'none',
                        marginLeft:'8px',
                        '&:hover': {
                        background: 'green',
                    },
                }}
                >
                    Send code
                </Button>

                </div>
                {isSent && <div style={{display:'flex',justifyContent:'center', marginTop:'12px'}}>
                <TextField
                    type="text"
                    size="small"
                    placeholder="Access code"
                    onChange={(e)=>setAccessCode(e.target.value)}
                />
                <Button
                    onClick={handleVerify}
                    sx={{
                        color:'white', 
                        background:'green', 
                        textTransform:'none',
                        marginLeft:'8px',
                        '&:hover': {
                        background: 'green',
                      },
                  }}
                >
                    Submit
                </Button>
                </div>
            }

            </div>
            <ToastContainer />

        </section>
    )
}


export default Login;