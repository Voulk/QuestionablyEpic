const candidate1 = ["#1f78b4", "#33a02c", "#cd99ff", "#e31a1c", "#ffe375"];
const candidate2 = ["#1f78b4", "#33a02c", "#ffe375", "#e31a1c", "#cd99ff"];
const candidate3 = ["#E1BE6A", "#40B0A6", "#EBF2BB", "#000000", "#FFD5BD", "#E7A9C1", "#D3F27A"];
const candidate4 = ["#ffff99", "#b15928", "#cab2d6", "#6a3d9a", "#b2df8a", "#33a02c", "#fdbf6f", "#ff7f00", "#fb9a99", "#e31a1c", "#a6cee3", "#1f78b4", "#666666"];
const candidate5 = ["#8e0152", "#ae206e", "#c74389", "#d967a3", "#e48bbb", "#eeafd1", "#f4d3e5", "#f7f7f7", "#d7edb8", "#b8e187", "#a1d26c", "#8bc255", "#76b241", "#61a22f", "#4d9221"];
const candidate6 = ["#00429d", "#204fa3", "#325da9", "#406aaf", "#4e78b5", "#5a86bb", "#6694c1", "#73a2c6", "#80b1cc", "#8ebfd1", "#9dced6", "#addcda", "#c0eade", "#d8f6e1", "#ffffe0"];
const candidate7 = ["#7291c4", "#9fb8d7", "#BBCDEA", "#72C47F", "#97d79f", "#bbeabf", "#D8BE7B", "#e0d06b", "#e0d09b", "#eae2bb", "#d87b7b", "#e29b9b", "#eabbbb"];
// const candidate8 = [
//   "#004d84",
//   "#1f78b4",
//   "#95d8ff",
//   "#c9ffff",
//   "#007000",
//   "#33a02c",
//   "#9fff8b",
//   "#d3ffbc",
//   "#6a3d9a",
//   "#cd99ff",
//   "#ffcaff",
//   "#fffdff",
//   "#a80000",
//   "#e31a1c",
//   "#c55000",
//   "#ff9174",
//   "#c9b145 ",
//   "#ffe375",
//   "#ffffa6",
//   "#ffffd9",
// ];

// const candidate9 = [
//   "#004d84",
//   "#1f78b4",
//   "#95d8ff",
//   "#c9ffff",
//   "#007000",
//   "#33a02c",
//   "#9fff8b",
//   "#d3ffbc",
//   "#c9b145 ",
//   "#ffe375",
//   "#ffffa6",
//   "#ffffd9",
//   "#a80000",
//   "#e31a1c",
//   "#c55000",
//   "#ff9174",
// ];
const IBM = ["#648FFF", "#785EF0", "#DC267F", "#FE6100", "#FFB000"];
const wong = ["#E69F00", "#56B4E9", "#009E73", "#F0E442", "#0072B2", "#D55E00", "#CC79A7"];

export const themeSelection = (profile) => {
  switch (profile) {
    case "candidate1":
      return candidate1;
    case "candidate2":
      return candidate2;
    case "candidate3":
      return candidate3;
    case "candidate4":
      return candidate4;
    case "candidate5":
      return candidate5;
    case "candidate6":
      return candidate6;
    case "candidate7":
      return candidate7;
    case "IBM":
      return IBM;
    case "wong":
      return wong;
    default:
      return candidate2;
  }
};
