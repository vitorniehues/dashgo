import { Flex, Box, Avatar, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export function Profile() {
    const { user } = useContext(AuthContext)

    return (
        <Flex align="center">
            <Box mr="4" textAlign="right">
                <Text>Vitor Niehues</Text>
                <Text color="gray.300" fontSize="small">
                    {user?.email}
                </Text>
            </Box>

            <Avatar size="md" name="Vitor Niehues" src="https://github.com/vitorniehues.png" />
        </Flex>
    )
}