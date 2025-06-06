import React from "react";
import { BaseNodeProperties } from "@/components/ui/base-node-properties";
import { ISymbolicGeneratorNode } from "@/config/types";
import { useReactFlow } from "@xyflow/react";
import { useDebounce } from "react-use";
import { BiPlus, BiTrash } from "react-icons/bi";
import { ActionIcon, Button, TextInput, Tooltip } from "@mantine/core";
import { useTranslation } from "react-i18next";

type IProps = {
  node: ISymbolicGeneratorNode;
};

export const SymbolicGeneratorProperties: React.FunctionComponent<IProps> = ({ node }) => {
  const { t } = useTranslation();
  const flow = useReactFlow();
  const [faces, setFaces] = React.useState(node.data.faces);

  function handleChangeFace(e: React.ChangeEvent<HTMLInputElement>, index: number) {
    const newValue = e.target.value || "";
    const newFaces = [...faces];
    newFaces[index] = newValue;

    setFaces(newFaces);
    node.data.faces = newFaces;
  }

  function addNewFace() {
    const newFaces = [...faces, ""];
    setFaces(newFaces);
    node.data.faces = newFaces;
  }

  function removeFace(index: number) {
    const newFaces = faces.filter((_item, sourceIndex) => sourceIndex !== index);
    setFaces(newFaces);
    node.data.faces = newFaces;
  }

  useDebounce(() => flow.updateNodeData(node.id, { ...node.data, faces }), 500, [faces]);

  return (
    <BaseNodeProperties
      node={node}
      children={
        <>
          {faces.map((_item, index) => (
            <div className="border-b py-2 w-full flex flex-col gap-2" key={"ball" + index}>
              <div className="w-full flex items-center justify-between gap-2">
                <label className="w-32 font-medium flex items-center gap-2" htmlFor={"face_" + index}>
                  <Tooltip variant="" label={t("nodeProperties.removeFace")}>
                    <ActionIcon variant="light" color="red" onClick={() => removeFace(index)} disabled={index === 0 && faces.length === 1}>
                      <BiTrash />
                    </ActionIcon>
                  </Tooltip>
                  <span>Face {index + 1}</span>
                </label>

                <TextInput
                  type="text"
                  id={"face_" + index}
                  value={faces[index]}
                  placeholder={t("nodeProperties.facePlaceholder")}
                  onChange={(e) => handleChangeFace(e, index)}
                />
              </div>
            </div>
          ))}

          <Button color="blue" variant="light" leftSection={<BiPlus className="text-lg " />} size="sm" onClick={addNewFace}>
            {t("nodeProperties.addNewFace")}
          </Button>
        </>
      }
    />
  );
};
