import { Box, Icon, Link, Stack, Text } from "@chakra-ui/react";
import { RiDashboardLine, RiMoneyDollarCircleFill } from "react-icons/ri";

export function Sidebar() {
    return (
        <Box as="aside" w="64" mr="8">
            <Stack spacing="12" align="flex-start">
                <Box>
                    <Text fontWeight="bold" color="gray.400" fontSize="small">GERAL</Text>
                    <Stack spacing="4" mt="8" align="stretch" >
                        <Link display="flex" alignItems="center" py="1">
                            <Icon as={RiDashboardLine} fontSize="20" />
                            <Text ml="4" fontWeight="medium">
                                DashBoard
                            </Text>
                        </Link>
                    </Stack>
                </Box>
                <Box>
                    <Text fontWeight="bold" color="gray.400" fontSize="small">CONSULTAS</Text>
                    <Stack spacing="4" mt="8" align="stretch" >
                        <Link display="flex" alignItems="center" py="1">
                            <Icon as={RiMoneyDollarCircleFill} fontSize="20" />
                            <Text ml="4" fontWeight="medium">
                                Preços
                            </Text>
                        </Link>
                    </Stack>
                </Box>
            </Stack>
        </Box>
    )
}