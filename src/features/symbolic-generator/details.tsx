import React from "react";
import { BaseNodeDetails } from "@/components/ui/base-node-details";
import { ISymbolicGeneratorNode } from "@/config/types";
import { useReactFlow } from "@xyflow/react";
import { useDebounce } from "react-use";
import { BiPlus, BiTrash } from "react-icons/bi";

type IProps = {
  node: ISymbolicGeneratorNode;
};

export const SymbolicGeneratorDetails: React.FunctionComponent<IProps> = ({ node }) => {
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
    <BaseNodeDetails
      node={node}
      children={
        <>
          {faces.map((_item, index) => (
            <div className="border-b py-2 w-full flex flex-col gap-2" key={"face_key" + index}>
              <div className="w-full flex items-center justify-between gap-2">
                <label className="w-full font-medium flex items-center gap-2" htmlFor={"face_id" + index}>
                  <button
                    title="Remove face"
                    className="disabled:text-gray-400 text-red-400 text-lg transition-colors"
                    disabled={index === 0 && faces.length === 1}
                    onClick={() => removeFace(index)}>
                    <BiTrash />
                  </button>
                  <span>Face {index + 1}</span>
                </label>
                <input
                  type="text"
                  id={"face_id" + index}
                  className="bg-gray-100 py-1 px-2 border shadow-none focus:ring-1 outline-none text-center w-28"
                  value={faces[index]}
                  placeholder="Face symbol"
                  onChange={(e) => handleChangeFace(e, index)}
                />
              </div>
            </div>
          ))}

          <button
            className="flex items-center justify-center gap-2 py-1 bg-blue-100 hover:bg-blue-200 transition-colors rounded-sm my-2 font-semibold"
            onClick={addNewFace}>
            <BiPlus className="text-lg text-blue-600" />
            Add New face
          </button>
        </>
      }
    />
  );
};
