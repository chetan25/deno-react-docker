import React from "react";

const DraggableSection = ({
  id,
  children,
  "data-id": dataId,
}: {
  id: string;
  "data-id": string;
  children: React.ReactNode | React.ReactNode[];
}) => {
  return (
    <div id={id} data-uk-sortable="group: sortable-group" data-id={dataId}>
      {children}
    </div>
  );
};

export default DraggableSection;
