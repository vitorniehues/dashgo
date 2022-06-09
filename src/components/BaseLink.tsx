import { RiArrowLeftSLine } from "react-icons/ri";
import { Icon, Link as ChakraLink, LinkProps as ChakraLinkProps, Text } from "@chakra-ui/react"
import { default as NextLink, } from "next/link";
import { ElementType } from "react";

interface BaseLinkProps extends ChakraLinkProps {
  children: string,
  href: string,
  fontSize: string,
  icon?: ElementType,
}

export function BaseLink({ href, icon, children, ...rest }: BaseLinkProps) {
  return (
    <NextLink href={href} passHref>
      <ChakraLink display="flex" alignItems="center" py="1" {...rest}>
        {!!icon && <Icon as={icon} fontSize="20" />}
        <Text>
          {children}
        </Text>
      </ChakraLink>
    </NextLink>
  )
}