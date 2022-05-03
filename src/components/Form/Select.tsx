import { Select as ChakraSelect } from "@chakra-ui/react";
import { ReactNode } from "react";

interface SelectProps {
    placeholder: string;
    children: ReactNode
}

export function Select({ placeholder, children }: SelectProps) {
    return (
        <ChakraSelect
            mb="6"
            placeholder={placeholder}
            bg="gray.900"

        >
            {children}
        </ChakraSelect>
    )
}