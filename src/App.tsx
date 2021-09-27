import { Session } from '@supabase/gotrue-js';
import * as React from 'react';
import { Auth } from './Auth';
import { GreetContracts } from './GreetContracts';
import { supabase } from './supabaseClient';
function App() {
  const [session, setSession] = React.useState<Session|null>(null);

  React.useEffect(() => {
    setSession(supabase.auth.session());
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    })
  }, []);

  return (
    <div className="">
     { session ?  <GreetContracts/> : <Auth/>}
    </div>
  );
}

export default App;
