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
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { api } from "../config";
import { useNavigate } from "react-router-dom";
import Loading from "../Components/Loading";

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

const register_validation_schema = yup.object().shape({
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
  password: yup
    .string()
    .required("Password is Required")
    .min(8, "Password must have minimunm 8 Characters"),
});

function Register() {
  const [show, setshow] = useState(true);
  const navigate = useNavigate();
  const { values, handleChange, handleSubmit, handleBlur, errors, touched } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: register_validation_schema,
      onSubmit: (user_data) => {
        register_submit(user_data);
      },
    });

  async function register_submit(user_data) {
    setshow(false);
    try {
      const register = await axios.post(`${api}/user/register`, user_data);
      alert(register.data.message);
      setshow(true);
      navigate("/");
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
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
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
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
              </Grid>
              <Grid item xs={12}>
                {touched.password && errors.password ? (
                  <TextField
                    error
                    margin="normal"
                    id="outlined-error"
                    fullWidth
                    label="Password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    helperText={errors.password}
                  />
                ) : (
                  <TextField
                    margin="normal"
                    fullWidth
                    label="Password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                )}
              </Grid>
            </Grid>
            {show ? (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
            ) : (
              <Loading />
            )}
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/">Already have an account? Sign in</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Register;
