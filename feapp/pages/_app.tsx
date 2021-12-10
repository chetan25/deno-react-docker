import "../styles/globals.css";
import type { AppProps } from "next/app";
import "uikit/dist/css/uikit.min.css";
import UIKit from "uikit";
import { SearchContextProvider } from "../components/SearchContext";
import { TodosContextProvider } from "../components/TodoContext";
// @ts-ignore
import Icons from "uikit/dist/js/uikit-icons";

// globally initialize icons
// @ts-ignore
UIKit.use(Icons);
import dynamic from "next/dynamic";

const Layout = dynamic(() => import("../components/Layout"), { ssr: false });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SearchContextProvider>
      <TodosContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </TodosContextProvider>
    </SearchContextProvider>
  );
}

export default MyApp;
