import { FormControl, FormErrorMessage, FormLabel, forwardRef, Input as ChakraInput, InputProps as ChakraInputProps } from "@chakra-ui/react"
import { FieldError } from "react-hook-form";

interface InputProps extends ChakraInputProps {
    name: string;
    label?: string;
    error?: FieldError
}

export const Input = forwardRef<InputProps, 'input'>(({ name, label, error = null, ...rest }, ref) => {
    return (
        <FormControl isInvalid={!!error}>
            {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
            <ChakraInput
                name={name}
                id={name}
                focusBorderColor="blue.500"
                bgColor="gray.900"
                variant="filled"
                _hover={{
                    bgColor: "gray.900"
                }}
                size="lg"
                ref={ref}
                {...rest}
            />
            {
                !!error && (
                    <FormErrorMessage>
                        {error.message}
                    </FormErrorMessage>
                )
            }
        </FormControl>
    )
})