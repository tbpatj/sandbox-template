import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../Context/GlobalContext";
import { useContext, useState } from "react";
import { CircularProgress } from "@mui/material";
import PasswordVisibility from "../../Components/PasswordVisibility";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {/* {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."} */}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const SignUpPage = () => {
  const [processingRequest, setProcessingRequest] = useState(false);
  const { signup } = useContext(GlobalContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm();

  const onSubmit = async (data: any) => {
    //set to true so the user knows that we are processing the login in case it takes a while
    setProcessingRequest(true);
    const response = await signup(data.username, data.email, data.password);
    //if there is an error then set the error message for the submit button
    if (response?.error) {
      setError("submit", { type: "custom", message: response.error.message });
    }
    setProcessingRequest(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: "40%",
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
          onSubmit={handleSubmit((data) => onSubmit(data))}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                error={errors?.firstName ? true : false}
                {...register("firstName", {
                  required: true,
                })}
                helperText={(errors?.firstName?.message ?? "") + ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                autoComplete="family-name"
                error={errors?.lastName ? true : false}
                {...register("lastName", {
                  required: true,
                })}
                helperText={(errors?.lastName?.message ?? "") + ""}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="username"
                label="User Name"
                autoComplete="username"
                error={errors?.username ? true : false}
                {...register("username", {
                  required: true,
                })}
                helperText={(errors?.username?.message ?? "") + ""}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                autoComplete="email"
                error={errors?.email ? true : false}
                {...register("email", {
                  required: true,
                  pattern: {
                    message: "Invalid email address",
                    value:
                      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
                  },
                })}
                helperText={(errors?.email?.message ?? "") + ""}
              />
            </Grid>
            <Grid item xs={12}>
              <PasswordVisibility
                fullWidth
                id="password"
                required
                error={errors?.password ? true : false}
                register={register}
                helperText={(errors?.password?.message ?? "") + ""}
              />
            </Grid>
            {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid> */}
          </Grid>
          <Box sx={{ m: 1, position: "relative" }}>
            <Button
              type="submit"
              fullWidth
              onClick={() => clearErrors("submit")}
              disabled={processingRequest}
              variant="contained"
              color={errors?.submit ? "error" : "primary"}
              sx={{ mt: 1, mb: 4 }}
            >
              Sign Up
            </Button>
            {processingRequest && (
              <CircularProgress
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  marginTop: "-12px",
                  marginLeft: "-12px",
                }}
                size={24}
              ></CircularProgress>
            )}
            {errors?.submit && (
              <Typography sx={{ mt: -3 }} color="error" variant="body2">
                {errors?.submit?.message + ""}
              </Typography>
            )}
          </Box>
          <Grid container justifyContent="flex-end">
            <Grid item xs={12}>
              <Link to="/login">Already have an account? Sign in</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
};

export default SignUpPage;
