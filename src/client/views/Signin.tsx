import { styles } from "@/styles/styles";
import { Footer } from "@/components/layout/Footer";
import { MainHeader } from "@/components/common/MainHeader";
import { SignInForm } from "@/components/auth/SignInForm";
import { Overlay } from "@/components/layout/Overlay";
import { handleSignIn } from "@/handlers/handle-signin";
import {
  handleGoogleSignin,
  handle42Signin,
} from "@/handlers/handle-remote-signin";

export function Signin() {
  setTimeout(() => {
    handleSignIn();
    handleGoogleSignin();
    handle42Signin();
  }, 0);

  return (
    <section className={styles.pageLayoutLight}>
      <Overlay />
      <MainHeader
        title="welcome back,"
        titleSpan="champion"
        subtitle="step into the club"
        subtitleParagraph="enter your credentials to continue your legacy."
      />
      <SignInForm />
      <Footer />
    </section>
  );
}
