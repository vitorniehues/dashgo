import { Box, Button, Flex, Heading, Stack, Text, useDisclosure } from "@chakra-ui/react";
import { Input } from "../components/Form/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { ErrorAlert } from "../components/Alert/ErrorAlert";
import { AxiosError } from "axios";
import { parseCookies } from "nookies";
import Router from "next/router";
type SingInFormData = {
  email: string,
  password: string
}

const singInFormSchema = yup.object().shape({
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha obrigatória')
})

export default function SingIn() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(singInFormSchema)
  })
  const { errors } = formState

  const { singIn } = useContext(AuthContext)


  const { isOpen: isVisible, onClose, onOpen } = useDisclosure()
  let title = 'Erro'

  const handleSingIn: SubmitHandler<SingInFormData> = async (values) => {
    await singIn(values)
    //TODO Verificar erro retornado e chamar onOpen para abrir ErrorAlert
  }

  useEffect(() => {
    const { 'app.presidente.token': token } = parseCookies()
    if (token) Router.push('/dashboard')
  }, [])


  return (
    <Flex
      w="100vm"
      h="100vh"
      align="center"
      justify="center"
    >
      <Flex
        as="form"
        w="100%"
        maxW={360}
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit(handleSingIn)}
      >
        <Stack spacing="4">
          <Box>
            <Heading textAlign="center">Posto Presidente</Heading>
            <Text fontSize="xl" align="center">Controle de Frota</Text>
          </Box>
          <Input
            name="email"
            type="email"
            label="Email"
            error={errors.email}
            {...register("email")}
          />
          <Input
            name="password"
            type="password"
            label="Password"
            error={errors.password}
            {...register("password")} />
        </Stack>

        <Button
          type="submit"
          mt="6"
          colorScheme="blue"
          size="lg"
          isLoading={formState.isSubmitting}
        >
          Entrar
        </Button>

        <ErrorAlert my="6" status="error" title={title} isVisible={isVisible} />
      </Flex>
    </Flex>
  )
}
