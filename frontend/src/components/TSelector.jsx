import React, { useEffect, useState } from "react";
import TButton from "./TButton";

const TSelector = ({
  collection = [],
  title = "Selector",
  clickAction = () => {},
  keyField = "id",
  valueField = "value",
  color = "primary",
}) => {
  const [selectedElement, setSelElement] = useState(null);

  useEffect(() => {
    if (collection?.length === 1) {
      const element = collection[0];
      setSelElement(element[keyField]);
      clickAction(collection[0]);
    } else {
      setSelElement(null);
      clickAction(null);
    }
  }, [collection]);

  return (
    <div>
      <h4 className="mt-4 mx-3 text-md font-semibold "> {title} </h4>
      <div className="mb-6">
        {collection?.map((e, idx) => {
          return (
            <TButton
              key={e[keyField]}
              color={color}
              label={e[valueField]}
              isSelected={e[keyField] === selectedElement}
              clickAction={() => {
                setSelElement(e[keyField]);
                const obj = collection.find((x) => x[keyField] === e[keyField]);
                clickAction && clickAction(obj);
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TSelector;
