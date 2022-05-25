import { Text } from "@chakra-ui/react";
import Router from "next/router";

export function Logo() {
  return (
    <Text
      as="button"
      fontSize="3xl"
      fontWeight="bold"
      letterSpacing="tight"
      w="32"
      onClick={() => Router.push('/dashboard')}
    >
      dashgo
      <Text as="span" ml="1" color="blue.500">.</Text>
    </Text>
  )
}