import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const authLink = setContext((_, { headers }) => {
  const accessToken = localStorage.getItem("access_token");
  return {
    headers: {
      ...headers,
      "x-access-token": accessToken ? `Bearer ${accessToken}` : "",
    },
  };
});

const result = "https://backend.smallworldventure.com/graphql?";
// const result = "http://localhost:5000/graphql?";

const httpLink = createHttpLink({
  uri: result,
  credentials: "include",
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
