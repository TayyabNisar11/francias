import { ThemeProvider } from 'styled-components';
import '@styles/styles.scss';
import theme from '@theme';
import { Provider, useSelector, useDispatch } from 'react-redux';
import store, { AppState } from '@store';
import { ToastContainer, toast } from 'react-toastify';
import { useEffect } from 'react';
import { commonActions } from '@store/slices/common';
import { handleGetSocialsMenu, handleGetMainMenu } from "@store/thunk/layout";
import Layout from '@components/layout';
import moment from 'moment';
import 'moment/locale/fr'
import { handleGetBannerSlugs } from '@store/thunk/add-banner';
import Head from "next/head";


function MyApp({ Component, pageProps }: { Component: any; pageProps: any }) {
  const WrappedComponent = () => {
    const dispatch = useDispatch();
    const { visible, message, type } = useSelector((state: AppState) => state.common.toast);

    useEffect(() => {
      moment.locale("fr")
      dispatch(handleGetSocialsMenu());
      dispatch(handleGetMainMenu())
      dispatch(handleGetBannerSlugs())
    }, []);

    useEffect(() => {
      if (visible) {
        toast[type || 'info'](message, {
          position: toast.POSITION.BOTTOM_LEFT,
          onClose: () => dispatch(commonActions.hideToast()),
        });
      }
    }, [visible]);

    return (
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
        <ToastContainer autoClose={1500} style={{ minHeight: 50 }} />
      </ThemeProvider>
    );
  };

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Provider store={store}>
        <Layout>
          <WrappedComponent />
        </Layout>
      </Provider>
    </>
  );
}

export default MyApp;
