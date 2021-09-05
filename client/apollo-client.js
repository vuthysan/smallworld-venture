import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
    },
  };
});
// const authLink = setContext((_, { headers }) => {
// get the authentication token from local storage if it exists
//   const token = localStorage.getItem("token");
// return the headers to the context so httpLink can read them
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : "",
//     },
//   };
// });

const result = "https://backend.smallworldventure.com/graphql?";

const httpLink = createHttpLink({
  uri: result,
  credentials: "include",
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
