import { Box, Button, HStack, RadioProps, useRadio, useRadioGroup, UseRadioProps } from "@chakra-ui/react";

interface ProductButtonProps {
    children: string;
}

export function ProductButton({ children }: ProductButtonProps) {
    return (
        <Button
            as="a"
            size="sm"
            fontSize="sm"
            colorScheme="blue"
        >
            {children}
        </Button>
    )
}

export function ProductRadioButton(props: RadioProps) {
    const { getInputProps, getCheckboxProps } = useRadio(props)

    const input = getInputProps()
    const checkbox = getCheckboxProps()

    return (
        <Box as='label'>
            <input {...input} />
            <Box
                {...checkbox}
                fontSize="sm"
                cursor='pointer'
                borderRadius='md'
                _checked={{
                    bg: 'teal.600',
                    color: 'white',
                    borderColor: 'teal.600',
                }}
                _focus={{
                    boxShadow: 'outline',
                }}
                px={1}
                py={1.5}
            >
                {props.children}
            </Box>
        </Box>
    )
}