import { Button, createTheme, Tooltip } from "@mantine/core";

export const mantineTheme = createTheme({
  components: {
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
