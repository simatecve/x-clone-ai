import React, { useEffect } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '../integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate('/');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-black border border-x-border p-8 rounded-2xl shadow-xl">
        <div className="flex justify-center mb-6">
          <svg viewBox="0 0 24 24" aria-hidden="true" className="h-12 w-12 text-white fill-current">
            <g>
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
            </g>
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-white text-center mb-8">Inicia sesión en X-Clone</h2>
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#1d9bf0',
                  brandAccent: '#1a8cd8',
                  brandButtonText: 'white',
                  defaultButtonBackground: 'black',
                  defaultButtonBackgroundHover: '#16181c',
                  inputBackground: 'black',
                  inputText: 'white',
                  inputBorder: '#2f3336',
                  inputLabelText: '#71767b',
                },
              },
            },
            className: {
              container: 'w-full',
              button: 'rounded-full font-bold',
              input: 'rounded-md',
              label: 'text-sm',
            }
          }}
          theme="dark"
          providers={[]}
        />
      </div>
    </div>
  );
};

export default Login;