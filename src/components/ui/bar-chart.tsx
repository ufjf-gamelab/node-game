import React from "react";
import { ResponsiveContainer } from "recharts";
import { BarChart } from "@mantine/charts";

export type IChartData = { x: string | number; y: number }[];

type IProps = {
  data: IChartData;
};

const Chart: React.ComponentType<IProps> = ({ data }) => {
  return (
    <div className="w-full min-h-[200px] h-max max-h-[300px]">
      <ResponsiveContainer width="100%" height="100%" maxHeight={300} aspect={2}>
        <BarChart
          h="300"
          data={data}
          dataKey="x"
          tickLine="y"
          classNames={{
            tooltipBody: "p-1",
            tooltipLabel: "text-sm py-1",
            tooltipItemName: "text-sm pl-1",
            tooltipItemColor: "pl-3",
          }}
          series={[{ name: "y", color: "blue.6", label: "Results" }]}
        />
      </ResponsiveContainer>
    </div>
  );
};

export { Chart as BarChart };
