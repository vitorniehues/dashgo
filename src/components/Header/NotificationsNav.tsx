import { HStack, Icon } from "@chakra-ui/react";
import { RiNotificationLine, RiLogoutCircleRLine } from "react-icons/ri";
import { singOut } from "../../hooks/contextHooks/useAuthContext";

export function NotificationsNav() {
  return (
    <HStack
      spacing="4"
      mx="8"
      pr="8"
      py="1"
      color="gray.300"
      borderRightWidth={1}
      borderColor="gray.700"
    >

      <Icon as={RiNotificationLine} fontSize="20" />
      <Icon
        as={RiLogoutCircleRLine}
        onClick={singOut}
        cursor="pointer"
        fontSize="20"
      />

    </HStack>
  )
}