import { Box, Button, Flex, Heading, Link as ChakraLink, Stack, Text } from "@chakra-ui/react";
import { Input } from "../components/Form/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useState } from "react";
import { useAuthContext } from "../hooks/contextHooks/useAuthContext";
import { parseCookies } from "nookies";
import Router from "next/router";
import NextLink from "next/link";

type SingInFormData = {
  email: string,
  password: string
}

const singInFormSchema = yup.object().shape({
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha obrigatória')
})

export default function SingIn() {
  const { 'app.presidente.token': token } = parseCookies()
  const [loginError, setLoginError] = useState('')
  if (token) {
    Router.push('/dashboard')
  }

  const { register, handleSubmit, formState: { errors, isSubmitting }, watch } = useForm<SingInFormData>({
    resolver: yupResolver(singInFormSchema)
  })

  const { singIn } = useAuthContext()


  const handleSingIn: SubmitHandler<SingInFormData> = (values) => {
    singIn(values)
      .catch(() => setLoginError('Usuário ou senha inválidos'))
  }

  watch(() => setLoginError(''))

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
            label="Senha"
            error={errors.password}
            {...register("password")} />

        </Stack>


        <NextLink href='/password/forgot' passHref>
          <ChakraLink size="md" mt="2" alignSelf="end" >
            <Text fontSize="14">Esqueceu a senha?</Text>
          </ChakraLink>
        </NextLink>


        <Button
          type="submit"
          mt="6"
          colorScheme="blue"
          size="lg"
          isLoading={isSubmitting}
          name="submitButton"
        >
          Entrar
        </Button>
        <Text color="red.500" mt="2" alignSelf="center">{loginError}</Text>

      </Flex>
    </Flex>
  )
}
