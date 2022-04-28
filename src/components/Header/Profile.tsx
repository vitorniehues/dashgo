import { Flex, Box, Avatar, Text } from "@chakra-ui/react";

export function Profile() {
    return (
        <Flex align="center">
            <Box mr="4" textAlign="right">
                <Text>Vitor Niehues</Text>
                <Text color="gray.300" fontSize="small">
                    niehues.vitor@gmail.com
                </Text>
            </Box>

            <Avatar size="md" name="Vitor Niehues" src="https://github.com/vitorniehues.png" />
        </Flex>
    )
}