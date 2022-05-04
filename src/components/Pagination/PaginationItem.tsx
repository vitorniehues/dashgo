import { Button } from "@chakra-ui/react";

interface PaginationItemProps {
    number: number;
    isCurrent?: boolean;
}

export function PaginationItem({ number, isCurrent = false }: PaginationItemProps) {
    if (isCurrent) {
        return (
            <Button
                size="sm"
                fontSize="xs"
                width="4"
                colorScheme="blue"
                disabled
                _disabled={{
                    bgColor: 'blue.500',
                    cursor: 'default',
                }}
            >
                {number}
            </Button>
        )
    }
    else return (
        <Button
            size="sm"
            fontSize="xs"
            width="4"
            bg="gray.700"
            _hover={{
                gb: 'gray.500'
            }}
        >
            {number}
        </Button>
    )
}