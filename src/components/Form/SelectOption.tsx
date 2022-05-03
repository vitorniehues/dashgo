import { useTheme } from "@chakra-ui/react";

interface SelectOptionProps {
    value: string;
    children: string;
}

export function SelectOption({ value, children }: SelectOptionProps) {
    const theme = useTheme()

    const style = {
        color: "white",
        backgroundColor: theme.colors.gray[600],
        borderRadius: "5px"
    }

    return (
        <option style={style} value={value}>
            {children}
        </option>
    )
}