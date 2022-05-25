import { Alert, AlertDescription, AlertIcon, AlertProps, AlertTitle, useDisclosure } from "@chakra-ui/react";

interface ErrorAlertProps extends AlertProps {
  status: "info" | "warning" | "success" | "error"
  title: string,
  description?: string
  isVisible?: boolean
}

export function ErrorAlert({ status, title, isVisible = false, ...props }: ErrorAlertProps) {

  return isVisible ? (
    <Alert status={status} bg="rgba(254, 178, 178, 0.16)" {...props}>
      <AlertIcon />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{props.description}</AlertDescription>
    </Alert>
  ) : (<></>)
}