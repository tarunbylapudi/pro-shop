import {
  Avatar,
  Box,
  Grid,
  LinearProgress,
  TextField,
  Typography,
  Container,
  Card,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { Link, useNavigate } from "react-router-dom";
import { useResetPasswordMutation } from "../slices/authApiSlice";
import { toast } from "react-toastify";

const ResetPasswordPage = () => {
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const [resetPassword, { isLoading: resetPasswordLoading }] =
    useResetPasswordMutation();

  const passwordMatchStatus = () => {
    return password && confirmPassword && password === confirmPassword;
  };

  const resetPasswordHandler = async () => {
    try {
      console.log(token, "1");
      const res = await resetPassword({ password, token }).unwrap();
      console.log(res.message);
      toast.success(`${res?.message}`);
      setTimeout(() => {
        navigate("/login");  
      }, 2000);
    } catch (error) {
      toast.error(`${error?.data?.error}`);
    }
  };
  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card
        variant="outlined"
        elevation="6"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: "50px",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Reset Password
        </Typography>
        <Box component="form" sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="securityToken"
            label="Security Token"
            name="securityToken"
            value={token}
            onChange={(e) => {
              console.log(e.target.value);
              setToken(e.target.value);
            }}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            label="Password"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            autoComplete="password"
            autoFocus
          />
          <TextField
            type="password"
            margin="normal"
            required
            fullWidth
            id="confirmPassword"
            label="Comfirm Password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            autoComplete="confirmPassword"
            autoFocus
          />
          {confirmPassword && (
            <Typography
              sx={{ color: passwordMatchStatus() ? "green" : "red" }}
              component="p"
              variant="p"
            >
              {passwordMatchStatus() ? "password Match" : "password Mismatch"}
            </Typography>
          )}

          {/* {generateOtpLoading && <LinearProgress />} */}

          {
            <Button
              type="button"
              fullWidth
              variant="contained"
              disabled={!passwordMatchStatus()}
              onClick={resetPasswordHandler}
              sx={{ mt: 3, mb: 2 }}
            >
              RESET PASSWORD
            </Button>
          }

          {/* <Grid container>
            <Grid item xs>
              <Link to={"/login"}>Login with password</Link>
            </Grid>
            <Grid item>
              <Link to={"/register"}>Don't have an account? Sign Up</Link>
            </Grid>
          </Grid> */}
        </Box>
      </Card>

      {/* {showAlert && (
        <Alert
          message="OTP sent, Please Check your Email"
          severity="success"
          action="close"
          actionHandler={() => setShowAleret(false)}
        />
      )} */}
    </Container>
  );
};

export default ResetPasswordPage;
