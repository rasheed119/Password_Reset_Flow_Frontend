import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { api } from "../config";
import Loading from "../Components/Loading";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

const defaultTheme = createTheme();

const account_activation_validation_schema = yup.object().shape({
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
});

function ForgotPassword() {
  const [show, setshow] = React.useState(true);

  const navigate = useNavigate();

  const { values, handleChange, handleSubmit, handleBlur, errors, touched } =
    useFormik({
      initialValues: {
        email: "",
      },
      validationSchema: account_activation_validation_schema,
      onSubmit: async (user_data) => {
        try {
          setshow(false);
          const data = await axios.put(
            `${api}/user/forgot-password`,
            user_data
          );
          alert(data.data.message);
          navigate("/")
          console.log(data)
        } catch (error) {
          setshow(true);
          console.log(error.response.data.message);
          alert(error.response.data.message);
        }
      },
    });
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
            Forgot Password
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
            {show ? (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Send Mail
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

export default ForgotPassword;