import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";
import { 
  Box,
  Grid,
  Image,
  Heading
} from "@chakra-ui/react"

import Link from "next/link";

const Index = ({ data }) => (
  <div>
    <ul>
      {data.allRecipe.map((recipe) => 
      (
        <Grid key={recipe.id}>
          <Box bg="red" w="100%" h="550" p={0} mb={5} color="white">
            <Heading position="relative" mb={4}>{recipe.title}</Heading>
            <Image position="absolute" boxSize="10%" objectFit="cover" src={recipe?.mainImage?.asset.url} alt={recipe?.title} />
          </Box>
        </Grid>
        //  <li key={recipe._id}>
        //    <Box bg="tomato" w="100%" p={4} pb={10} color="white">
        //    {recipe.title}
        //   </Box>

        //   {/* <Link href={`/recipe/${recipe._id}`}>{recipe.title}</Link> */}
        // </li>
      )
      )}
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
