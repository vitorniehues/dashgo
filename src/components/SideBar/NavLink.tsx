import { Icon, Link, Text, LinkProps as ChakraLinkProps } from "@chakra-ui/react";
import { ElementType } from "react";
import { ActiveLink } from "../ActiveLink";

interface NavLinkProps extends ChakraLinkProps {
    href: string
    children: string,
    icon: ElementType
}

export function NavLink({ children, icon, href, ...rest }: NavLinkProps) {
    return (
        <ActiveLink href={href} passHref>
            <Link display="flex" alignItems="center" py="1" {...rest}>
                <Icon as={icon} fontSize="20" />
                <Text ml="4" fontWeight="medium">
                    {children}
                </Text>
            </Link>
        </ActiveLink>
    )
}