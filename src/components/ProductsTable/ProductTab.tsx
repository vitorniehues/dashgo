import { Tab } from "@chakra-ui/react";

interface ProductItemProps {
  children: string
}

export function ProductTab({ children }: ProductItemProps) {
  return (
    <Tab
      borderRadius="lg"
      borderColor="blue.600"
      borderWidth="thin"
      m="0.5"
    >
      {children}
    </Tab>
  )

}