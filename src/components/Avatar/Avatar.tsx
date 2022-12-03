import { Circle, Text } from '@chakra-ui/react';

export const getStringForAvatar = (name: string, moreChars: boolean) => {
  const nameArray = name.split(' ');

  if (moreChars) {
    return (
      nameArray[0].charAt(0) +
      nameArray[0].charAt(1) +
      nameArray[0].charAt(2) +
      nameArray[0].charAt(3)
    );
  }

  if (nameArray.length === 1) {
    return nameArray[0].charAt(0) + nameArray[0].charAt(1);
  }
  return nameArray[0].charAt(0) + nameArray[1].charAt(0);
};

const getRandomColor200And300Pair = () => {
  const colors = ['red', 'orange', 'yellow', 'green', 'teal', 'blue', 'cyan', 'purple', 'pink'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  return [`${randomColor}.200`, `${randomColor}.300`];
};

export const Avatar = ({ name, moreChars = false }: { name: string; moreChars?: boolean }) => {
  const [bgColor200, bgColor300] = getRandomColor200And300Pair();
  return (
    <Circle
      backgroundColor={moreChars ? 'gray.200' : bgColor200}
      size={8}
      _hover={{ zIndex: 99999, backgroundColor: moreChars ? 'gray.300' : bgColor300 }}
    >
      <Text cursor="default">{getStringForAvatar(name, moreChars)}</Text>
    </Circle>
  );
};
