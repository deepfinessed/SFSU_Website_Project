import React, {useEffect} from 'react';
import { Moon, Sun, ArrowLeftCircle } from 'react-feather';
import { AppProps } from 'next/app';
import Router, {useRouter} from 'next/router';
import { ThemeProvider } from 'styled-components';

import { useMounted } from '@hooks';
import { theme, gtag} from '@utils';

import ThemeContext, { useTheme } from '@contexts/ThemeContext';
import AuthContext from '@contexts/AuthContext';
import { Toggle } from '@components/Inputs';
import { Container } from '@components/Layouts';

// import 'styles/fonts.css';
import 'styles/main.css';
import 'node_modules/leaflet/dist/leaflet.css';

const AppContent = ({ Component, pageProps }: AppProps): JSX.Element => {
  const mounted = useMounted();
  const [scheme, toggle] = useTheme();
  const router = useRouter();

  useEffect(() => {
    if(process.env.NODE_ENV !== 'production') {
      return;
    }
    const handleRouteChange = (url: URL) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    }
  }, [router.events]);

  if (!mounted) {
    return <></>;
  }

  return (
    <ThemeProvider theme={{ mode: scheme }}>
      <Container row justify="space-between">
        {Router.route !== '/' && (
          <Container>
            <ArrowLeftCircle
              style={{ cursor: 'pointer' }}
              onClick={(): void => Router.back()}
              color={theme.cvar('colorForeground')}
            />
          </Container>
        )}
        <Container row justify="flex-end">
          <Sun size={16} color={theme.cvar('colorForeground')} />
          <Toggle toggled={scheme === 'dark'} onChange={(): void => toggle()} />
          <Moon size={16} color={theme.cvar('colorForeground')} />
        </Container>
      </Container>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

const App = (props: AppProps): JSX.Element => {
  return (
    <ThemeContext>
      <AuthContext>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <AppContent {...props} />
      </AuthContext>
    </ThemeContext>
  );
};

export default App;
