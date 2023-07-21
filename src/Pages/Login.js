import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Loading from "../Components/Loading.js";
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { api } from "../config";


const login_validation_schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email")
    .test("com", "Invalid email", (value) => {
      if (value && !value.endsWith(".com")) {
        return false;
      }
      return true;
    })
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

function Login() {
  const [show, setshow] = useState(true);
  const { values, handleChange, handleSubmit, handleBlur, errors, touched } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: login_validation_schema,
      onSubmit: (user_data) => {
        login_submit(user_data);
      },
    });

  async function login_submit(userdata) {
    setshow(false);
    try {
      const data = await axios.put(`${api}/user/login`, userdata);
      alert(data.data.message);
      console.log(data);
      setshow(true);
    } catch (error) {
      console.log(error.response.data.message);
      alert(error.response.data.message)
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
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            {touched.email && errors.email ? (
              <TextField
                error
                margin="normal"
                id="outlined-error"
                fullWidth
                label="Email Address"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                helperText={errors.email}
              />
            ) : (
              <TextField
                margin="normal"
                fullWidth
                label="Email Address"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
            )}
            {touched.password && errors.password ? (
              <TextField
                error
                margin="normal"
                fullWidth
                name="password"
                label="Password"
                onChange={handleChange}
                value={values.password}
                onBlur={handleBlur}
                type="password"
                id="outlined-error"
                helperText={errors.password}
              />
            ) : (
              <TextField
                margin="normal"
                fullWidth
                name="password"
                label="Password"
                onChange={handleChange}
                value={values.password}
                onBlur={handleBlur}
                type="password"
                id="password"
              />
            )}
            {show ? (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            ) : (
              <Loading />
            )}
            <Grid container>
              <Grid item xs>
                <Link to="/forgotpassword">Forgot password?</Link>
              </Grid>
              <Grid item>
                <Link to="/register">{"Don't have an account? Sign Up"}</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Login;