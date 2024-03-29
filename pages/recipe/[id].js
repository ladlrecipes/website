import {
  Link as ChakraLink,
  Heading,
  Box,
  Image,
  Text,
  Code,
  List,
  ListIcon,
  ListItem,
  Textarea,
} from "@chakra-ui/react";
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { CheckCircleIcon, LinkIcon } from "@chakra-ui/icons";
import { Hero } from "../../components/Hero";
import { Container } from "../../components/Container";
import { Main } from "../../components/Main";
import { DarkModeSwitch } from "../../components/DarkModeSwitch";
import { CTA } from "../../components/CTA";
import { Footer } from "../../components/Footer";
import BlockContent from "@sanity/block-content-to-react";
import { usePreviewSubscription, urlFor, PortableText } from "../../lib/sanity";
// import Header from '../components/Header'

import { NextSeo } from "next-seo";

const Index = ({ data }) => (
  <Container height="100vh">
    <NextSeo
      title={data?.Recipe?.title}
      description="This will be the page meta description"
      canonical="https://www.canonicalurl.ie/"
      openGraph={{
        url: "https://www.canonicalurl.ie/",
        title: "Open Graph Title",
        description: "Open Graph Description",
        images: [
          {
            url: "https://www.example.ie/og-image-01.jpg",
            width: 800,
            height: 600,
            alt: "Og Image Alt",
          },
          {
            url: "https://www.example.ie/og-image-02.jpg",
            width: 900,
            height: 800,
            alt: "Og Image Alt Second",
          },
          { url: "https://www.example.ie/og-image-03.jpg" },
          { url: "https://www.example.ie/og-image-04.jpg" },
        ],
      }}
    />
    <Heading>{data?.Recipe?.title}</Heading>
    <Box boxSize="sm">
      <Image src={data?.Recipe?.mainImage?.asset?.url} alt="Segun Adebayo" />
    </Box>
    <Text fontSize="lg">{data?.Recipe?.author?.name}</Text>
    {/* <Text fontSize="lg">Mealtype: {data?.Recipe?.mealtype[0]?.title}</Text> */}
    {/* <BlockContent blocks={data.Recipe.bodyRaw} /> */}
    {/* <Text fontSize="lg">{data.Recipe.bodyRaw}</Text> */}
    <BlockContent blocks={data?.Recipe?.bodyRaw} />,
    {/* <Main>

      <Textarea
        placeholder="Here is a sample placeholder"
        value={data.Recipe.title}
      /> */}
    {/* <Text>
          Example repository of <Code>Next.js</Code> + <Code>chakra-ui</Code>.
        </Text>

        <List spacing={3} my={0}>
          <ListItem>
            <ListIcon as={CheckCircleIcon} color="green.500" />
            <ChakraLink
              isExternal
              href="https://chakra-ui.com"
              flexGrow={1}
              mr={2}
            >
              Chakra UI <LinkIcon />
            </ChakraLink>
          </ListItem>
          <ListItem>
            <ListIcon as={CheckCircleIcon} color="green.500" />
            <ChakraLink isExternal href="https://nextjs.org" flexGrow={1} mr={2}>
              Next.js <LinkIcon />
            </ChakraLink>
          </ListItem>
        </List> */}
    {/* </Main> */}
    {/* <DarkModeSwitch /> */}
    {/* <Footer>
      <Text>Next ❤️ Chakra</Text>
    </Footer> */}
    {/* <CTA /> */}
  </Container>
);

export default Index;

export const getStaticPaths = async () => {
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
          }
        }
      `,
    })
    .then((result) => result);
  console.log(data.data.allRecipe[0]);

  return {
    paths: data.data.allRecipe.map(({ _id }) => ({
      params: {
        id: _id,
      },
    })),
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const client = new ApolloClient({
    ssrMode: true,
    link: createHttpLink({
      uri: "https://rnbzz1qb.api.sanity.io/v1/graphql/production/default",
    }),
    cache: new InMemoryCache(),
  });

  console.log(`params`, params);
  const data = await client
    .query({
      query: gql`
        query recipeDetails {
          Recipe(id: "${params.id}") {
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
            ingredients {
              name
              amount
            }
            bodyRaw
          }
        }
      `,
    })
    .then((result) => result);

  console.log(`data`, data.data.Recipe);
  return {
    props: { data: data.data },
  };
};
