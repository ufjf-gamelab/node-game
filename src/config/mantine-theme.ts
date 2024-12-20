import { Button, createTheme, rem } from "@mantine/core";

export const mantineTheme = createTheme({
  components: {
    Button: Button.extend({
      defaultProps: {
        radius: "sm",
      },
    }),
  },
});
