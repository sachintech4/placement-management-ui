import {
  Flex,
  Form,
  TextField,
  Button,
  Grid,
  View,
  Image,
  Heading,
  Content,
  Dialog,
  Divider,
  DialogContainer,
} from "@adobe/react-spectrum";
import { ToastQueue } from "@react-spectrum/toast";
import { useState } from "react";
import { auth } from "../firebase-config.js";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import cons from "../cons.js";
import logo from "../assets/logo.png";

function LoginScreen() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [passwordResetForm, setPasswordResetForm] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !email.match(cons.REGEXS.VALID_EMAIL)) {
      ToastQueue.negative("Please provide a valid email address", {
        timeout: 1000,
      });
      return;
    }
    if (!password) {
      ToastQueue.negative("Please provide a password", { timeout: 1000 });
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("failed to sign in user");
      ToastQueue.negative("Enter proper credentials.", { timeout: 1000 });
      console.error(error.message);
    }
  };

  const handleForgotPassword = async (e) => {
    // e.preventDefault();
    if (!email || !email.match(cons.REGEXS.VALID_EMAIL)) {
      ToastQueue.negative("Please provide a valid email address", {
        timeout: 1000,
      });
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      ToastQueue.positive("Password reset email sent!", { timeout: 1000 });
    } catch (error) {
      console.error("failed to send password reset email");
      console.error(error.message);
      ToastQueue.negative("Failed to send password reset email", {
        timeout: 1000,
      });
    }
  };

  return (
    <Grid
      areas={{
        base: ["logo", "form"],
        S: ["logo", "form"],
        M: ["logo form"],
        L: ["logo form"],
      }}
      rows={{ M: ["100vh"] }}
      columns={{ L: ["1fr", "1fr"] }}
      gap={{ base: "size-400" }}
    >
      <Flex
        gridArea="logo"
        direction={{ M: "column" }}
        justifyContent="center"
        alignItems="center"
      >
        <View
          width={{ base: "size-900", S: "size-2000", M: "size-3400" }}
          height="auto"
        >
          <Image src={logo} alt="TIMSCDR Logo"></Image>
        </View>
        <Heading level={3}>Placement Management System</Heading>
      </Flex>
      <Flex gridArea="form" justifyContent="center" alignItems="center">
        <View
          maxWidth={{ base: "size-2500", L: "size:4600" }}
          borderWidth="thin"
          borderColor="dark"
          borderRadius="medium"
          padding="size-250"
        >
          <Form onSubmit={handleLogin}>
            <Flex direction={"column"} gap="size-200">
              <TextField
                label="Email"
                type="email"
                onChange={setEmail}
                isRequired
              />
              <TextField
                label="Password"
                type="password"
                onChange={setPassword}
                isRequired
              />
              <Button type="submit">Login</Button>
              <Button
                variant="secondary"
                onPress={() => setPasswordResetForm(true)}
              >
                Forgot Password
              </Button>
            </Flex>
          </Form>
        </View>
      </Flex>
      <DialogContainer onDismiss={() => setPasswordResetForm(null)}>
        {passwordResetForm && (
          <Dialog isDismissable>
            <Heading>Forgot Password?</Heading>
            <Divider />
            <Content>
              <Flex gap="size-400">
                <TextField
                  label="Enter Email"
                  type="email"
                  onChange={setEmail}
                  isRequired
                />
                <View alignSelf={"end"}>
                  <Button onPress={handleForgotPassword}>Reset</Button>
                </View>
              </Flex>
            </Content>
          </Dialog>
        )}
      </DialogContainer>
    </Grid>
  );
}

export default LoginScreen;
