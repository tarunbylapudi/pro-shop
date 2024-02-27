import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Card, LinearProgress } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Alert from "../components/common/elements/Alert";
import Link from "../components/common/elements/Link";
import { useGenerateSecurityTokenMutation } from "../slices/authApiSlice";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isSecurityTokenGenerated, setIsSecurityTokenGenerated] =
    useState(false);
  const [showAlert, setShowAleret] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const [generateSecurityToken, { isLoading: generateTokenLoading }] =
    useGenerateSecurityTokenMutation();

  const generateSecurityTokenHandler = async () => {
    try {
      const res = await generateSecurityToken({ email }).unwrap();
      setIsSecurityTokenGenerated(true);
      setShowAleret(true);
      toast.success(`${res?.data}`);
      setTimeout(() => {
        navigate("/resetPassword");
      }, 2000);
    } catch (error) {
      setIsSecurityTokenGenerated(false);
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
          Forgot Password
        </Typography>
        <Box component="form" sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            helperText={email.length > 0 ? "Enter Registed Email Address" : ""}
            name="email"
            value={email}
            disabled={isSecurityTokenGenerated}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            autoComplete="email"
            autoFocus
          />
          {isSecurityTokenGenerated && (
            <Button
              color="primary"
              sx={{ marginLeft: "auto" }}
              onClick={generateSecurityTokenHandler}
            >
              Resend Security Token
            </Button>
          )}
          {generateTokenLoading && <LinearProgress />}

          {!isSecurityTokenGenerated && (
            <Button
              type="button"
              fullWidth
              variant="contained"
              onClick={generateSecurityTokenHandler}
              sx={{ mt: 3, mb: 2 }}
            >
              GET Security Token
            </Button>
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
          message="Security TOken sent. Check your email."
          severity="success"
          action="close"
          actionHandler={() => setShowAleret(false)}
        />
      )}
    </Container>
  );
}
