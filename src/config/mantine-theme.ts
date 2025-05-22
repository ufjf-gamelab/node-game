import { Button, createTheme, Tooltip, Input } from "@mantine/core";

export const mantineTheme = createTheme({
  components: {
    Input: Input.extend({
      defaultProps: {
        variant: "filled",
      },
    }),
    Button: Button.extend({
      defaultProps: {
        radius: "sm",
      },
    }),
    Tooltip: Tooltip.extend({
      styles: {
        tooltip: { fontSize: "12px" },
      },
    }),
  },
});
