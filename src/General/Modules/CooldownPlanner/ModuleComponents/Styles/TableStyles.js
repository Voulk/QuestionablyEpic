// Styles for the Table Cells and Headers
import { classColoursJS } from "../../Functions/ClassColourFunctions";

export const TableStyles = (className, rowData) => {
  let backgroundColor = "";
  if (className) {
    backgroundColor = rowData.tableData.editing === "update" ? "" : classColoursJS(className);
  } else {
    backgroundColor = "";
  }

  return {
    cellStyle: {
      thinRightBorder: {
        whiteSpace: "wrap",
        borderRight: "1px solid #6c6c6c",
        textAlign: "center",
        fontSize: 12,
        lineHeight: "normal",
        backgroundColor: backgroundColor,
      },
      thickRightBorder: {
        whiteSpace: "wrap",
        borderRight: "2px solid #6c6c6c",
        textAlign: "center",
        fontSize: 12,
        lineHeight: "normal",
        backgroundColor: backgroundColor,
      },
    },
    headerStyle: {
      borderRight: "1px solid #6c6c6c",
    },
  };
};
