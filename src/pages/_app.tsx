import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../styles/theme";
import { AuthContextProvider } from "../hooks/contextHooks/useAuthContext";
import { QueryClient, QueryClientProvider, useQueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { createApiServer } from "../services/mirage";
import { Server } from "miragejs";
import { queryClient } from "../services/queryClient";

const isDevelopment = process.env.NODE_ENV === 'development'

let apiServer: Server
//if (isDevelopment) apiServer = createApiServer()



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