import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
    },
  };
});

const result = " http://localhost:5000/graphql";

const httpLink = createHttpLink({
  uri: result,
  credentials: "include",
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  // uri: "http://localhost:3600/graphql",
  // uri: "http://localhost:3500/api",
  cache: new InMemoryCache(),
});

export default client;
