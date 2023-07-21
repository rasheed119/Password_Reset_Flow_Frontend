import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { api } from "../config";
import Loading from "../Components/Loading";

const defaultTheme = createTheme();

function ResendMail() {
  const email = useParams();
  const [show, setshow] = useState(true);
  const handlesubmit = async (event) => {
    setshow(false);
    event.preventDefault();
    try {
        const response = await axios.put(`${api}/user/forgot-password`,
            email
        );
        console.log(response);
        alert(response.data.message);
        setshow(true)
    } catch (error) {
        console.log(error);
        if(error.message === "Network Error"){
            alert("An err has been occurred,Please try again")
        }
        setshow(true);
    }
  }
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Resend Mail
          </Typography>
          <Box component='form' noValidate onSubmit={handlesubmit} sx={{ mt: 1 }}>
            <Typography  paragraph >
                If you Not recivied the mail,Click the Resend mail to Continiue
            </Typography>
            {show ? (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                ReSend Mail
              </Button>
            ) : (
              <Loading />
            )}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default ResendMail;
