import { Button, Flex, Stack } from "@chakra-ui/react";
import { Input } from "../components/Form/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
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

  const handleSingIn: SubmitHandler<SingInFormData> = async (values) => {
    await singIn(values)
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
        onSubmit={handleSubmit(handleSingIn)}
      >
        <Stack spacing="4">
          <Input
            name="email"
            type="email"
            label="Email"
            error={errors.email}
            {...register("email")}
          />
          <Input name="password" type="password" label="Password" error={errors.password} {...register("password")} />
        </Stack>

        <Button
          type="submit"
          mt={6}
          colorScheme="pink"
          size="lg"
          isLoading={formState.isSubmitting}
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  )
}
