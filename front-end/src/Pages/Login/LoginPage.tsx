import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { useContext, useState } from "react";
import { GlobalContext } from "../../Context/GlobalContext";
import { Link, useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

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

const LoginPage = () => {
  const [processingRequest, setProcessingRequest] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(GlobalContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm();

  const onSubmit = async (data: any) => {
    console.log("data", data);
    //set to true so the user knows that we are processing the login in case it takes a while
    setProcessingRequest(true);
    const response = await login(data.email, data.password, data.remember);
    //if there is an error then set the error message for the submit button
    if (response?.error) {
      setError("submit", { type: "custom", message: response.error.message });
    } else {
      navigate("/dashboard");
    }
    setProcessingRequest(false);
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(https://source.unsplash.com/random?wallpapers)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            marginTop: "min(30vh,300px)",
            mx: 4,
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
            noValidate
            onSubmit={handleSubmit((data) => onSubmit(data))}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              autoComplete="email"
              error={errors?.email ? true : false}
              autoFocus
              {...register("email", {
                required: "Email is required",
                pattern: {
                  message: "Invalid email address",
                  value:
                    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
                },
              })}
              helperText={(errors?.email?.message ?? "") + ""}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              {...register("password", {
                required: true,
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
              error={errors?.password ? true : false}
              helperText={(errors?.password?.message ?? "") + ""}
            />
            <Grid item xs={12}>
              <Checkbox
                {...register("remember")}
                id="remember-user"
                value="remember"
                color="primary"
              />
              <Typography component={"label"} htmlFor="remember-user">
                Remember me
              </Typography>
            </Grid>
            <Box sx={{ m: 1, position: "relative" }}>
              <Button
                type="submit"
                fullWidth
                onClick={() => clearErrors("submit")}
                disabled={processingRequest}
                variant="contained"
                color={errors?.submit ? "error" : "primary"}
                sx={{ mt: 3, mb: 4 }}
              >
                Sign In
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
            <Grid container>
              <Grid xs={12} item>
                <Link to="/forgot-password">Forgot password?</Link>
              </Grid>
              <Grid xs={12} item>
                <Link to="/signup">Don't have an account? Sign Up</Link>
              </Grid>
            </Grid>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};
export default LoginPage;
