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
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full max-h-[300px]">
      <ResponsiveContainer width="100%" height="330px" aspect={2}>
        <BarChart accessibilityLayer data={data}>
          <CartesianGrid vertical={false} />
          <ChartTooltip content={<ChartTooltipContent />} />

          <XAxis dataKey="x" tickLine={false} tickMargin={10} className="text-lg" axisLine={false} tickFormatter={(value) => value.slice(0, 3)} />
          <Bar dataKey="y" fill="#60a5fa" radius={4} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

const MemoizedComponent = React.memo(Chart);
export { MemoizedComponent as BarChart };
