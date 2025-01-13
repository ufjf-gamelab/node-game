import React from "react";
import { BiImport, BiNoSignal, BiPlay, BiReset, BiSolidChevronUp } from "react-icons/bi";
import { cls } from "@/utils/cls";
import { useLayoutContext } from "@/contexts/layout-context";
import { Button } from "@mantine/core";
import { useSimulationContext } from "@/contexts/simulation-context";
import { BarChart } from "@/components/ui/bar-chart";
import { ImportExportModal } from "@/features/import-export-modal";

export const TaskBar: React.ComponentType = () => {
  const { loading, runSimulation, clearSimulation, simulationCharts } = useSimulationContext();
  const { simulationOpen, setSimulationOpen, asideDetailsOpen, sidebarWidth, asideDetailsWidth } = useLayoutContext();

  async function startSimulation() {
    await runSimulation();
    setSimulationOpen(true);
  }

  const [openedImportModal, setOpenedImportModal] = React.useState(false);

  return (
    <>
      <ImportExportModal opened={openedImportModal} close={() => setOpenedImportModal(false)} />

      <div
        className="absolute z-[15] flex gap-4 h-16 justify-center transform -translate-x-1/2 transition-all duration-300 p-2 pb-8 rounded-md bg-white border border-gray-300"
        style={{
          left: `calc(${sidebarWidth}px + (100vw - ${sidebarWidth}px - ${asideDetailsOpen ? asideDetailsWidth : 0}px) / 2)`,
          top: "calc(100vh - 52px)",
        }}>
        <Button color="green" title="Start simulation" loading={loading} leftSection={<BiPlay className="text-xl" />} onClick={startSimulation}>
          Start
        </Button>
        <Button title="Clear simulation" color="red" leftSection={<BiReset className="text-xl" />} onClick={clearSimulation}>
          Clear
        </Button>
        <Button leftSection={<BiImport className="text-xl" />} onClick={() => setOpenedImportModal(!openedImportModal)}>
          Import & Export
        </Button>

        <Button title={simulationOpen ? "Close section" : "Open section"} color="gray" onClick={() => setSimulationOpen(!simulationOpen)}>
          <BiSolidChevronUp className={cls("text-xl", { "transform rotate-180": simulationOpen, "transition-transform duration-700": true })} />
        </Button>
      </div>

      <div
        className="absolute overflow-y-auto z-[10] transform -translate-x-1/2  h-[430px] max-w-[900px] bg-white border-t-4 border-blue-600 border-x border-x-gray-300 flex flex-col transition-all duration-200"
        style={{
          left: `calc(${sidebarWidth}px + (100vw - ${sidebarWidth}px - ${asideDetailsOpen ? asideDetailsWidth : 0}px) / 2)`,
          width: `calc(100vw - ${(asideDetailsOpen ? asideDetailsWidth : 0) + sidebarWidth + 64}px)`,
          top: simulationOpen ? "calc(100vh - 430px)" : "calc(100vh - 23px)",
        }}>
        {!simulationCharts.length && (
          <div className="flex flex-col h-full items-center justify-center text-gray-400">
            <BiNoSignal className="text-7xl" />

            <h2 className="text-center">No histograms found to display, try to run another connection</h2>
          </div>
        )}

        {simulationOpen &&
          simulationCharts.map((chart, index) => (
            <React.Fragment key={chart.id}>
              <div className="w-full flex flex-col items-center last-of-type:mb-16">
                <h3 className="text-xl font-medium py-3">{chart.name}</h3>

                <div className="sm:px-4 lg:px-12 w-full">
                  <BarChart data={chart.data} key={"chart_" + chart.id} />
                </div>
              </div>

              {index !== simulationCharts.length - 1 && <hr className="w-full border-2 border-gray-300 my-4" />}
            </React.Fragment>
          ))}
      </div>
    </>
  );
};
