import { Box, Button, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import Router, { useRouter } from "next/router";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup"
import { Input } from "../../components/Form/Input";
import { authService } from "../../services/authService";

type ForgotPasswordFormData = {
  email: string
}


const fotgotPasswordFormSchema = yup.object().shape({
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
})

export default function CreatePasswordForm() {
  const { query } = useRouter()
  const [forgotPasswordError, setForgotPasswordError] = useState('')



  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ForgotPasswordFormData>({
    resolver: yupResolver(fotgotPasswordFormSchema)
  })

  const handleCreatePassword: SubmitHandler<ForgotPasswordFormData> = ({ email }) => {
    console.log(query)
    authService.post('password/forgot', {
      email
    })
      .then(() => Router.push('/'))
      .catch(() => setForgotPasswordError('Não foi possível redefinir a senha.'))
  }

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
        onSubmit={handleSubmit(handleCreatePassword)}
      >
        <Stack spacing="4">
          <Box>
            <Heading textAlign="center">Posto Presidente</Heading>
            <Text fontSize="xl" align="center">Recuperação de senha</Text>
          </Box>
          <Input
            name="email"
            type="email"
            label="Email"
            error={errors.email}
            {...register("email")}
          />
        </Stack>

        <Button
          type="submit"
          mt="6"
          colorScheme="blue"
          size="lg"
          isLoading={isSubmitting}
          name="submitButton"
        >
          Enviar
        </Button>
        <Text color="red.500" mt="2" alignSelf="center">{forgotPasswordError}</Text>

      </Flex>
    </Flex>
  )
}