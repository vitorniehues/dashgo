import { Box, Button, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import Router, { useRouter } from "next/router";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup"
import { Input } from "../../components/Form/Input";
import { authService } from "../../services/authService";

type CreatePasswordFormData = {
  password: string,
  passwordConfirmation: string
}


const createPasswordFormSchema = yup.object().shape({
  password: yup.string().required('Senha obrigatória').min(6, "Mínimo 6 caracteres"),
  passwordConfirmation: yup.string().oneOf([null, yup.ref('password')], 'As senha precisam ser iguais.'),
})

export default function CreatePasswordForm() {
  const { query } = useRouter()
  const [createPasswordError, setCreatePasswordError] = useState('')



  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<CreatePasswordFormData>({
    resolver: yupResolver(createPasswordFormSchema)
  })

  const handleCreatePassword: SubmitHandler<CreatePasswordFormData> = ({ password }) => {
    authService.post('password/create', {
      senha: password
    },
      { params: query }
    )
      .then(() => Router.push('/'))
      .catch(() => setCreatePasswordError('Não foi possível atualizar a senha.'))
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
        maxW={480}
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit(handleCreatePassword)}
      >
        <Stack spacing="4">
          <Box>
            <Heading textAlign="center">Posto Presidente</Heading>
            <Text fontSize="xl" align="center">Cadastro de senha</Text>
          </Box>
          <Input
            name="password"
            type="password"
            label="Senha"
            error={errors.password}
            {...register("password")}
          />
          <Input
            name="passwordConfirmation"
            type="password"
            label="Confirmação de senha"
            error={errors.passwordConfirmation}
            {...register("passwordConfirmation")} />

        </Stack>

        <Button
          type="submit"
          mt="6"
          colorScheme="blue"
          size="lg"
          isLoading={isSubmitting}
          name="submitButton"
        >
          Salvar
        </Button>
        <Text color="red.500" mt="2" alignSelf="center">{createPasswordError}</Text>

      </Flex>
    </Flex>
  )
}