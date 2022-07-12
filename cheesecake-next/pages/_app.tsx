import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import { Provider } from "react-redux";
import { wrapper } from '../store';
import { Layout } from "../components";
import '../components/styling.css';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
};

export default wrapper.withRedux(App);
