import { Box, Stack } from "@chakra-ui/react";
import { RiContactsLine, RiDashboardLine, RiInputMethodLine, RiMoneyDollarCircleFill } from "react-icons/ri";
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

export function Sidebar() {
    return (
        <Box as="aside" w="auto" minW="32" mr="8">
            <Stack spacing="12" align="flex-start">
                <NavSection title="CONSULTAS">
                    <NavLink icon={RiDashboardLine} href="/dashboard">Dashboard</NavLink>
                    <NavLink icon={RiMoneyDollarCircleFill} href="/precos">Preços</NavLink>
                </NavSection>
                <NavSection title="CADASTROS">
                    <NavLink icon={RiContactsLine} href="/users">Usuários</NavLink>
                </NavSection>
            </Stack>
        </Box>
    )
}