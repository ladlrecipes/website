import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";

import Link from "next/link";

const Index = ({ data }) => (
  <div>
    <ul>
      {data.allRecipe.map((recipe) => (
        <li>
          <Link href={`/recipe/${recipe._id}`}>{recipe.title}</Link>
        </li>
      ))}
    </ul>
  </div>
);

export default Index;

export const getStaticProps = async () => {
  const client = new ApolloClient({
    ssrMode: true,
    link: createHttpLink({
      uri: "https://rnbzz1qb.api.sanity.io/v1/graphql/production/default",
    }),
    cache: new InMemoryCache(),
  });

  const data = await client
    .query({
      query: gql`
        query getallrecipe {
          allRecipe {
            _id
            title
          }
        }
      `,
    })
    .then((result) => result);

  return {
    props: { data: data.data },
  };
};
