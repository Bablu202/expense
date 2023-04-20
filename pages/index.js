import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  EmailAuthProvider,
  GoogleAuthProvider,
  getRedirectResult,
} from "firebase/auth";
import {
  Button,
  CircularProgress,
  Container,
  Dialog,
  Typography,
} from "@mui/material";
import { auth } from "../firebase/firebase";
import styles from "../styles/landing.module.scss";
import { Google } from "@mui/icons-material";
const REDIRECT_PAGE = "/dashboard";
const uiConfig = {
  signInFlow: "popup",
  signInSuccessUrl: REDIRECT_PAGE,
  signInOptions: [
    EmailAuthProvider.PROVIDER_ID,
    GoogleAuthProvider.PROVIDER_ID,
  ],
};
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { useAuth } from "../firebase/auth";

export default function Home() {
  const { authUser, isLoading } = useAuth();
  const [login, setLogin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && authUser) {
      router.push("/dashboard");
    }
  });
  return isLoading || (!isLoading && !!authUser) ? (
    <CircularProgress
      color="inherit"
      sx={{ marginLeft: "50%", marginTop: "25%" }}
    />
  ) : (
    <div>
      <Head>
        <title>Expense Tracker</title>
      </Head>

      <main>
        <Container className={styles.container}>
          <Typography variant="h1">Welcome to Expense Tracker!</Typography>
          <Typography variant="h2">
            Add, view, edit, and delete expenses
          </Typography>
          <div className={styles.buttons}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setLogin(true)}
            >
              Login / Register
            </Button>
            <Dialog open={login} onClose={() => setLogin(false)}>
              <StyledFirebaseAuth
                uiConfig={uiConfig}
                firebaseAuth={auth}
              ></StyledFirebaseAuth>
            </Dialog>
          </div>
        </Container>
      </main>
    </div>
  );
}
