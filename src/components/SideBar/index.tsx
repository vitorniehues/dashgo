import { Box, Stack } from "@chakra-ui/react";
import { RiContactsLine, RiDashboardLine, RiInputMethodLine, RiMoneyDollarCircleFill } from "react-icons/ri";
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

export function Sidebar() {
    return (
        <Box as="aside" w="auto" mr="8">
            <Stack spacing="12" align="flex-start">
                <NavSection title="GERAL">
                    <NavLink icon={RiDashboardLine} href="/dashboard">Dashboard</NavLink>
                    <NavLink icon={RiContactsLine} href="/users">Usuários</NavLink>
                </NavSection>
                <NavSection title="AUTOMAÇÃO">
                    <NavLink icon={RiInputMethodLine} href="/forms">Formulário</NavLink>
                    <NavLink icon={RiMoneyDollarCircleFill} href="/precos">Preços</NavLink>
                </NavSection>
            </Stack>
        </Box>
    )
}