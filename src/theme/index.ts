import { baseOverrides } from './base';
import { componentOverrides } from './components';
import { extendTheme } from '@chakra-ui/react';

const themeOverrides = {
  ...baseOverrides,
  components: {
    ...componentOverrides,
  },
};

export default extendTheme(themeOverrides);
