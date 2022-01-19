import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";
import { Box, Grid, Image, Heading } from "@chakra-ui/react";

// import styles from "../styles/Shared.module.css";

import Link from "next/link";

const Index = ({ data }) => (
  <div>
    <ul className="homeContainer">
      {data.allRecipe.map((recipe) => (
        <div key={recipe.id}>
          <div className="cardContainer" style={{backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.30), rgba(0, 0, 0, 0.40)), url('${recipe?.mainImage?.asset.url}')`}}>
            <p className="cardText">{recipe.title}</p>
          </div>
        </div>
        //  <li key={recipe._id}>
        //    <Box bg="tomato" w="100%" p={4} pb={10} color="white">
        //    {recipe.title}
        //   </Box>

        //   {/* <Link href={`/recipe/${recipe._id}`}>{recipe.title}</Link> */}
        // </li>
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
            author {
              name
            }
            mainImage {
              asset {
                url
              }
            }
            mealtype {
              title
            }
            categories {
              _key
            }
          }
        }
      `,
    })
    .then((result) => result);

  return {
    props: { data: data.data },
  };
};
