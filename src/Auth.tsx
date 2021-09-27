import * as React from "react";
import { supabase } from "./supabaseClient";

const getValFromElId = (id: string) => {
  const input = document.getElementById(id) as HTMLInputElement | undefined;
  return input?.value || "";
};

type compStatus = "initial" | "error" | "loading" | "loaded";
export function Auth() {
  const [status, setStatus] = React.useState<compStatus>("initial");

  const handleLogin = async (email: string) => {
    setStatus("loading");
    try {
      const { error } = await supabase.auth.signIn({ email });
      if (error) {
        throw error;
      }
      setStatus("loaded");
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <div>
      {status === 'initial' && <Form handleLogin={handleLogin}/>}
      {status === 'error' && <div>an error accrue</div>}
      {status === 'loading' && <div>...loading</div>}
      {status === 'loaded' && <div> check your email</div>}
    </div>
  );
}

const Form = ({handleLogin}: {handleLogin: (value: string) => void}) => {
  return <form
    onSubmit={(e) => {
      e.preventDefault();
      const emailValue = getValFromElId("email");
      handleLogin(emailValue);
    }}
  >
    <label htmlFor="email">Sign in with your email</label>
    <input type="email" id="email" required />
    <button type="submit">sind magic link</button>
  </form>;
};
