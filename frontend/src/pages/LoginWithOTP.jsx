import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { MuiOtpInput } from "mui-one-time-password-input";
import {
  useGenerateOTPMutation,
  useValidateOtpAndLoginMutation,
} from "../slices/authApiSlice";
import { toast } from "react-toastify";
import { Card, LinearProgress } from "@mui/material";
import { addUserToLocal } from "../slices/authSlice";
import { saveCart } from "../slices/cartSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useGetSavedCartMutation } from "../slices/cartApiSlice";
import Alert from "../components/common/UI/Alert";
import Link from "../components/common/UI/Link";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState();
  const [isOtpGenerated, setIsOtpGenerated] = useState(false);
  const [showAlert, setShowAleret] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const [generateOtp, { isLoading: generateOtpLoading }] =
    useGenerateOTPMutation();
  const [validateOtpAndLogin, { isLoading: validateOtpLoading }] =
    useValidateOtpAndLoginMutation();
  const [getCart, { isLoading: cartLoading }] = useGetSavedCartMutation();

  const generateOtpHandler = async () => {
    try {
      const res = await generateOtp({ email }).unwrap();
      setIsOtpGenerated(true);
      setShowAleret(true);
      toast.success(`${res?.message}`);
    } catch (error) {
      setIsOtpGenerated(false);
      toast.error(`${error?.data?.error}`);
    }
  };

  const validateOtpHandler = async () => {
    try {
      const enteredOtp = String(otp);
      const res = await validateOtpAndLogin({ otp: enteredOtp }).unwrap();
      dispatch(addUserToLocal(res));
      const savedCartItems = await getCart().unwrap();

      dispatch(saveCart(savedCartItems));
      navigate("/");
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
          Sign in with OTP
        </Typography>
        <Box component="form" sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            value={email}
            disabled={isOtpGenerated}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            autoComplete="email"
            autoFocus
          />
          {isOtpGenerated && (
            <Button
              color="primary"
              sx={{ marginLeft: "auto" }}
              onClick={generateOtpHandler}
            >
              Resend OTP
            </Button>
          )}
          {generateOtpLoading && <LinearProgress />}

          {!isOtpGenerated && (
            <Button
              type="button"
              fullWidth
              variant="contained"
              onClick={generateOtpHandler}
              sx={{ mt: 3, mb: 2 }}
            >
              GET OTP
            </Button>
          )}

          {isOtpGenerated && (
            <>
              <Typography sx={{ my: "5px" }}>Enter OTP</Typography>
              <MuiOtpInput
                length={5}
                TextFieldsProps={{ placeholder: "-" }}
                value={otp}
                onChange={(newOtp) => setOtp(newOtp)}
              />

              <Button
                type="button"
                fullWidth
                variant="contained"
                onClick={validateOtpHandler}
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              {(cartLoading || validateOtpLoading) && <LinearProgress />}
            </>
          )}
          <Grid container>
            <Grid item xs>
              <Link to={"/login"}>Login with password</Link>
            </Grid>
            <Grid item>
              <Link to={"/register"}>Don't have an account? Sign Up</Link>
            </Grid>
          </Grid>
        </Box>
      </Card>

      {showAlert && (
        <Alert
          message="OTP sent, Please Check your Email"
          severity="success"
          action="close"
          actionHandler={() => setShowAleret(false)}
        />
      )}
    </Container>
  );
}
