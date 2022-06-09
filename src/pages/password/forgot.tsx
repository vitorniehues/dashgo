import { Alert, AlertIcon, Box, Button, Flex, Heading, Icon, Link, Stack, Text } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { RiArrowLeftSLine } from "react-icons/ri";
import * as yup from "yup"
import { BaseLink } from "../../components/BaseLink";
import { Input } from "../../components/Form/Input";
import { NavLink } from "../../components/SideBar/NavLink";
import { authService } from "../../services/authService";

type ForgotPasswordFormData = {
  email: string
}


const fotgotPasswordFormSchema = yup.object().shape({
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
})

export default function CreatePasswordForm() {
  const [forgotPasswordError, setForgotPasswordError] = useState('')
  const [isComplete, setIsComplete] = useState(false)



  const { register, handleSubmit, formState: { errors, isSubmitting }, watch } = useForm<ForgotPasswordFormData>({
    resolver: yupResolver(fotgotPasswordFormSchema)
  })

  const handleCreatePassword: SubmitHandler<ForgotPasswordFormData> = async ({ email }) => {
    try {
      await authService.post('password/forgot', {
        email
      })
      setIsComplete(true)
    } catch (error) {
      setForgotPasswordError('Não foi possível redefinir a senha.')
    }
  }

  const watchEmail = watch('email')

  useEffect(() => {
    setForgotPasswordError('')
  }, [watchEmail])

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
        <Stack spacing="6">
          <BaseLink href="/" icon={RiArrowLeftSLine} fontSize="15">
            Voltar
          </BaseLink>
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

        {
          isComplete &&
          <Alert status='success' variant='solid'>
            <AlertIcon />
            E-mail enviado com sucesso! Caso não tenha recebido, verifque o spam.
          </Alert>
        }
      </Flex>
    </Flex>
  )
}