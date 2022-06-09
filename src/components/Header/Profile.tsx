import { Flex, Box, Avatar, Text, Icon } from "@chakra-ui/react";
import { RiUser3Fill } from "react-icons/ri";
import { useAuthContext } from "../../hooks/contextHooks/useAuthContext";

export function Profile() {
  const { isAuthenticated, user } = useAuthContext()

  return (
    <Flex align="center">
      <Box mr="4" textAlign="right">
        <Text>
          {
            isAuthenticated ? user.nome : 'Carregando...'
          }
        </Text>
        <Text color="gray.300" fontSize="small">
          {user?.email}
        </Text>
      </Box>
      <Icon boxSize="30" as={RiUser3Fill} />
    </Flex>
  )
}