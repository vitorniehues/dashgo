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
if (isDevelopment) apiServer = createApiServer()

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient()
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <Component {...pageProps} />
          {isDevelopment && <ReactQueryDevtools />}
        </AuthContextProvider>
      </QueryClientProvider>
    </ChakraProvider>
  )
}

export default MyApp