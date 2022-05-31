import { useRadio, Box, useRadioGroup, HStack, UseRadioProps } from "@chakra-ui/react"

function RadioCard(props) {
  const { getInputProps, getCheckboxProps } = useRadio(props)

  const input = getInputProps()
  const checkbox = getCheckboxProps()

  return (
    <Box as='label'>
      <input {...input} />
      <Box
        {...checkbox}
        cursor='pointer'
        borderRadius="lg"
        borderColor="blue.600"
        borderWidth="thin"
        boxShadow='md'
        color="gray.600"
        _checked={{
          bg: 'blue.600',
          color: 'white',
          borderColor: 'blue.600',
        }}
        _focus={{
          boxShadow: 'outline',
        }}
        px={5}
        py={3}
        m="0.5"
        fontWeight="semibold"
      >
        {props.children}
      </Box>
    </Box>
  )
}


interface ProductRadioProps {
  idProduto: number,
  nome: string,
}
// Step 2: Use the `useRadioGroup` hook to control a group of custom radios.
export function ProductRadioCardGroup({ produtos, onChange }: { produtos: ProductRadioProps[], onChange: ((nextValue: string) => void) }) {

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'produtos',
    defaultValue: String(produtos[0].idProduto),
    onChange
  })

  const group = getRootProps()

  return (
    <HStack {...group}>
      {produtos.map(({ idProduto, nome }) => {
        const radio = getRadioProps({ value: String(idProduto) })
        return (
          <RadioCard key={idProduto} value={idProduto} {...radio}>
            {nome}
          </RadioCard>
        )
      })}
    </HStack>
  )
}
