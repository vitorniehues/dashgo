import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../styles/theme";
import { AuthContextProvider } from "../hooks/contextHooks/useAuthContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { createApiServer } from "../services/mirage";
import { Server } from "miragejs";

const isDevelopment = process.env.NODE_ENV === 'development'

let apiServer: Server
//if (isDevelopment) apiServer = createApiServer()
const queryClient = new QueryClient()


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
          {isDevelopment && <ReactQueryDevtools />}
        </ChakraProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  )
}

export default MyApp