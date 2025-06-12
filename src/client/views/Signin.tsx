import { styles } from "@/styles/styles";
import { Footer } from "@/components/layout/Footer";
import { handleSignIn } from "@/services/handle-signin";
import { MainHeader } from "@/components/common/MainHeader";
import { SignInForm } from "@/components/auth/SignInForm";
import {
  handleGoogleSignin,
  handle42Signin,
} from "@/services/handle-remote-signin";

export function Signin() {
  setTimeout(() => {
    handleGoogleSignin();
    handle42Signin();
    handleSignIn();
  }, 0);

  return (
    <section className={styles.pageLayoutLight}>
      <div className="absolute inset-0 bg-gradient-to-tr from-pong-secondary/10 to-pong-accent/10 blur-2xl z-[-1]" />
      <MainHeader
        isDark={true}
        title={"welcome back,"}
        titleSpan={"champion"}
        subtitle={"step into the club"}
        subtitleParagraph={"enter your credentials to continue your legacy."}
      />
      <SignInForm />
      <Footer />
    </section>
  );
}
