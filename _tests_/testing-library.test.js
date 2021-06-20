import React from 'react'
import { render } from "@testing-library/react";
import { ChakraProvider } from '@chakra-ui/react'
import theme from '../theme'

import Index from '../pages/index'

test('renders deploy link', () => {
  const { getByText } = render(
    <ChakraProvider resetCSS theme={theme}>
      <Index />
    </ChakraProvider>
  );
  const linkElement = getByText(
    /Example repository/
  )
  expect(linkElement).toBeInTheDocument()
})