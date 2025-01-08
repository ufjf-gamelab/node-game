import React from "react";
import { Bar, BarChart, CartesianGrid, XAxis, ResponsiveContainer } from "recharts";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const chartConfig = { y: { label: " " } } satisfies ChartConfig;

export type IChartData = { x: string; y: number }[];

type IProps = {
  data: IChartData;
};

const Chart: React.ComponentType<IProps> = ({ data }) => {
  return (
    <ChartContainer config={chartConfig} className="w-full min-h-[200px] h-max max-h-[300px]">
      <ResponsiveContainer width="100%" height="100%" maxHeight={300} aspect={2}>
        <BarChart accessibilityLayer data={data}>
          <CartesianGrid vertical={false} />
          <ChartTooltip content={<ChartTooltipContent />} />

          <XAxis dataKey="x" tickLine={false} tickMargin={10} className="text-sm" axisLine={false} />
          <Bar dataKey="y" fill="#60a5fa" radius={4} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

const MemoizedComponent = React.memo(Chart);
export { MemoizedComponent as BarChart };
