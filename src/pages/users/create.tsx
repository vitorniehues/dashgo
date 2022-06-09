import { Alert, AlertIcon, Box, Button, Divider, Flex, Heading, HStack, Icon, SimpleGrid, Stack, useToast } from "@chakra-ui/react";
import { Input } from "../../components/Form/Input";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/SideBar";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { isCPF } from "brazilian-values";
import { ControlledSelect } from "../../components/Form/ControlledSelect";
import { OptionBase } from "chakra-react-select";
import { useQueryPessoas } from "../../hooks/servicesHooks/useQueryPessoas";
import { useDebounce } from "../../hooks/useDebounce";
import ms from "ms";
import { useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import { useAuthContext } from "../../hooks/contextHooks/useAuthContext";
import Router from "next/router";
import { authService } from "../../services/authService";
import { RiArrowLeftSLine } from "react-icons/ri";
import { ControlledInputWithFormat } from "../../components/Form/ControlledInputWithFormat";
import { BaseLink } from "../../components/BaseLink";



type CreateUserFormData = {
  name: string,
  email: string,
  role: Role | null,
  cpf: string,
  pessoasAutorizadas: Pessoa[] | null
}

interface Role extends OptionBase {
  value: string,
  label: string
}

interface Pessoa extends OptionBase {
  value: string,
  label: string
}

const roles: Role[] = [
  { value: 'USUARIO', label: 'Cliente' },
  { value: 'COLABORADOR', label: 'Colaborador' },
  { value: 'ADMINISTRADOR', label: 'Administrador' }
]

const createUserFormSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  role: yup
    .object()
    .shape({
      label: yup.string().required(),
      value: yup.string().required(),
      variant: yup.string(),
      colorScheme: yup.string(),
      isFixed: yup.boolean(),
      isDisabled: yup.boolean(),
    })
    .nullable()
    .required('Grupo do usuário é obrigatório'),
  cpf: yup
    .string()
    .required('CPF obrigatório')
    .test('test-cpf', 'CPF inválido', (cpf) => isCPF(cpf)),
  pessoasAutorizadas: yup
    .array()
    .nullable()
    .when('role', {
      is: roles[0],
      then: yup
        .array()
        .of(
          yup.object()
            .shape({
              label: yup.string().required(),
              value: yup.string().required(),
              variant: yup.string(),
              colorScheme: yup.string(),
              isFixed: yup.boolean(),
              isDisabled: yup.boolean(),
            })
        )
        .min(1, 'Precisa ter ao menos uma pessoa autorizada')
        .required('Precisa ter ao menos uma pessoa autorizada')
        .nullable()
    })
})



export default function CreateUser() {
  const [filter, setFilter] = useState<string>(undefined)
  const { debouncedValue: debouncedFilter } = useDebounce(filter, ms('0.5s'))
  const { isFetching, data: pessoas } = useQueryPessoas(debouncedFilter)
  const { user } = useAuthContext()
  const toast = useToast()

  const isColaborador = user?.role === 'COLABORADOR'

  const defaultValues: CreateUserFormData = {
    name: "",
    cpf: "",
    email: "",
    pessoasAutorizadas: null,
    role: isColaborador ? roles[0] : null,
  }

  const { register, handleSubmit, control, reset, formState, watch, setValue } = useForm({
    resolver: yupResolver(createUserFormSchema),
    defaultValues
  })

  useEffect(() => {
    setValue('role', isColaborador && roles[0])
  }, [isColaborador, setValue])


  const { errors, isSubmitting } = formState
  const watchRole = watch('role')

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (values) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const { name, email, cpf, pessoasAutorizadas: pessoasAutorizadasSelecionadas, role } = values
    const pessoasAutorizadasArrayInt = pessoasAutorizadasSelecionadas?.map(e => parseInt(e.value))
    const roleValue = role.value

    try {
      await authService.post('/usuario', {
        nome: name,
        email,
        cpf,
        pessoasAutorizadas: pessoasAutorizadasArrayInt,
        role: roleValue,
      })
      reset(defaultValues)
    } catch (error) {
      toast({
        title: `Erro ao cadastrar usuário:`,
        status: "error",
        isClosable: true,
        description: error?.response?.data.message,
        position: "top"
      })
    }
  }

  const handleResetValues = () => {
    reset(defaultValues)
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

          <BaseLink href="/users" icon={RiArrowLeftSLine} fontSize="3xl" >
            Criar usuário
          </BaseLink>

          <Divider my="6" borderColor="gray.700" />

          <Stack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
              <Input name="name" label="Nome Completo" {...register("name")} error={errors.name} />
              <ControlledInputWithFormat
                name="cpf"
                label="CPF"
                control={control}
                error={errors.cpf}
                format="###.###.###-##"
              />
            </SimpleGrid>
            <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
              <Input name="email" type="email" label="E-mail" {...register("email")} error={errors.email} />
            </SimpleGrid>
            <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
              <ControlledSelect<CreateUserFormData, Role, false>
                name="role"
                control={control}
                label="Tipo do usuário"
                placeholder="Selecione um tipo"
                isDisabled={isColaborador ? true : false}
                options={isColaborador ? [roles[0]] : roles}
              />
            </SimpleGrid>
            <ControlledSelect<CreateUserFormData, Pessoa, true>
              isDisabled={!watchRole || watchRole.value !== roles[0].value}
              isMulti
              name="pessoasAutorizadas"
              control={control}
              onInputChange={setFilter}
              label="Pessoas Autorizadas"
              placeholder="Digite para procurar..."
              isLoading={isFetching}
              options={pessoas?.map(e => {
                return { value: String(e.id), label: e.nome }
              })}
            />
          </Stack>

          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Button colorScheme="whiteAlpha" onClick={handleResetValues}>Limpar</Button>
              <Button type="submit" isLoading={isSubmitting} colorScheme="blue">Salvar</Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  )
}