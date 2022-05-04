import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, Stack } from "@chakra-ui/react";
import { Input } from "../../components/Form/Input";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/SideBar";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

type CreateUserFormData = {
    name: string,
    email: string,
    password: string
    password_confirmation: string,
}

const createUserFormSchema = yup.object().shape({
    name: yup.string().required('Nome obrigatório'),
    email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
    password: yup.string().required('Senha obrigatória').min(6, "Mínimo 6 caracteres"),
    password_confirmation: yup.string().oneOf([null, yup.ref('password')], 'As senha precisam ser iguais.')
})

export default function CreateUser() {
    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(createUserFormSchema)
    })

    const { errors, isSubmitting } = formState

    const handleCreateUser: SubmitHandler<CreateUserFormData> = async (values) => {
        await new Promise((resolve) => setTimeout(resolve, 2000))

        console.log(values)
    }

    return (
        <Box>
            <Header />
            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
                <Sidebar />

                <Box
                    as="form"
                    flex="1"
                    borderRadius={0}
                    bg="gray.800"
                    p="8"
                    onSubmit={handleSubmit(handleCreateUser)}
                >
                    <Heading size="lg" fontWeight="normal"> Criar usuário</Heading>
                    <Divider my="6" borderColor="gray.700" />

                    <Stack spacing="8">
                        <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
                            <Input name="name" label="Nome Completo" {...register("name")} error={errors.name} />
                            <Input name="email" type="email" label="E-mail" {...register("email")} error={errors.email} />
                        </SimpleGrid>
                        <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
                            <Input name="password" type="password" label="Senha" {...register("password")} error={errors.password} />
                            <Input name="password_confirmation" type="password" label="Confirmação de senha" {...register("password_confirmation")} error={errors.password_confirmation} />
                        </SimpleGrid>
                    </Stack>

                    <Flex mt="8" justify="flex-end">
                        <HStack spacing="4">
                            <Button colorScheme="whiteAlpha">Cancelar</Button>
                            <Button type="submit" isLoading={isSubmitting} colorScheme="blue">Salvar</Button>
                        </HStack>
                    </Flex>
                </Box>
            </Flex>
        </Box>
    )
}