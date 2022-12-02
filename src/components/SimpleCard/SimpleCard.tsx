import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Link,
  LinkBox,
  Text,
} from '@chakra-ui/react';

export type SimpleCardProps = {
  header: string;
  body: string;
  footer: string;
};

export const SimpleCard = ({ header, body, footer }: SimpleCardProps) => {
  return (
    <Card shadow="none" border="1px solid" borderColor="gray.600" maxW={260} height="full">
      <CardHeader>
        <Heading fontWeight="medium" fontSize="xl">
          {header}
        </Heading>
      </CardHeader>
      <CardBody py={0}>
        <Text fontSize={15}>{body}</Text>
      </CardBody>
      <CardFooter>
        <LinkBox ml="auto">
          <Link
            href={footer}
            color="whiteAlpha.900"
            borderRadius={5}
            backgroundColor="gray.800"
            px={4}
            py={2}
            mb={-1}
            mr={-1}
            sx={{ textDecoration: 'none !important' }}
          >
            Learn more
          </Link>
        </LinkBox>
      </CardFooter>
    </Card>
  );
};
