import chroma from "chroma-js";

const candidate1 = ["#1f78b4", "#33a02c", "#cd99ff", "#e31a1c", "#ffe375"];
const candidate2 = ["#1f78b4", "#33a02c", "#ffe375", "#e31a1c", "#cd99ff", "#cd99ff", "#cd99ff", "#cd99fe", "#cd99fd", "#cd99fd", "#cd99fd", "#cd99fd", "#cd99fd"];
const candidate20 = [
  "#00876c",
  "#3d9c73",
  "#63b179",
  "#88c580",
  "#aed987",
  "#d6ec91",
  "#ffff9d",
  "#fee17e",
  "#fcc267",
  "#f7a258",
  "#ef8250",
  "#e4604e",
  "#d43d51",
  "#8f284c",
  "#a34865",
  "#b6657e",
  "#ff6969",
  ];
const candidate21 = [
  "#00876c",
  "#469b83",
  "#6eaf9a",
  "#93c3b3",
  "#b7d7cc",
  "#dbebe5",
  "#ffffff",
  "#fde0e0",
  "#f9c2c1",
  "#f3a3a4",
  "#eb8387",
  "#e0636b",
  "#d43d51",
]
const candidate3 = ["#E1BE6A", "#40B0A6", "#EBF2BB", "#000000", "#FFD5BD", "#E7A9C1", "#D3F27A"];
const candidate4 = ["#ffff99", "#b15928", "#cab2d6", "#6a3d9a", "#b2df8a", "#33a02c", "#fdbf6f", "#ff7f00", "#fb9a99", "#e31a1c", "#a6cee3", "#1f78b4", "#666666"];
const candidate5 = ["#8e0152", "#ae206e", "#c74389", "#d967a3", "#e48bbb", "#eeafd1", "#f4d3e5", "#f7f7f7", "#d7edb8", "#b8e187", "#a1d26c", "#8bc255", "#76b241", "#61a22f", "#4d9221"];
const candidate6 = ["#00429d", "#204fa3", "#325da9", "#406aaf", "#4e78b5", "#5a86bb", "#6694c1", "#73a2c6", "#80b1cc", "#8ebfd1", "#9dced6", "#addcda", "#c0eade", "#d8f6e1", "#ffffe0"];
const candidate7 = ["#7291c4", "#9fb8d7", "#BBCDEA", "#72C47F", "#97d79f", "#bbeabf", "#D8BE7B", "#e0d06b", "#b0d09b", "#eae2bb", "#d87b7b", "#e29b9b", "#eabbbb", "#cd99ff", "#cd9900", "#ed9900", "#ff810a", "#dd890b", "#cd99d4"];
const candidate10 = ["#4477AA", "#EE6677", "#228833", "#CCBB44", "#66CCEE", "#AA3377", "#BBBBBB"];
const candidate11 = ["#EE7733", "#0077BB", "#33BBEE", "#EE3377", "#CC3311", "#009988", "#BBBBBB"];
const candidate12 = [
  "#E8ECFB",
  "#D9CCE3",
  "#D1BBD7",
  "#CAACCB",
  "#BA8DB4",
  "#AE76A3",
  "#AA6F9E",
  "#994F88",
  "#882E72",
  "#1965B0",
  "#437DBF",
  "#5289C7",
  "#6195CF",
  "#7BAFDE",
  "#4EB265",
  "#90C987",
  "#CAE0AB",
  "#F7F056",
  "#F7CB45",
  "#F6C141",
  "#F4A736",
  "#F1932D",
  "#EE8026",
  "#E8601C",
  "#E65518",
  "#DC050C",
  "#A5170E",
  "#72190E",
  "#42150A",
  "#42150A",
  "#42150A",
  "#42150A",
  "#42150A",
  "#42150A",
];
const candidate13 = ["#77AADD", "#EE8866", "#EEDD88", "#FFAABB", "#99DDFF", "#44BB99", "#BBCC33", "#AAAA00", "#DDDDDD"];
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
  let colourScale = [];
  switch (profile) {
    case "candidate1":
      candidate1.map((key) => colourScale.push(chroma(key).darken().hex(), chroma(key).hex(), chroma(key).brighten().hex(), chroma(key).brighten(2).hex()));
      return colourScale.flat();
    case "candidate2":
      candidate2.map((key) => colourScale.push(chroma(key).darken().hex(), chroma(key).hex(), chroma(key).brighten().hex(), chroma(key).brighten(2).hex()));
      return colourScale.flat();
    case "candidate3":
      candidate3.map((key) => colourScale.push(chroma(key).darken().hex(), chroma(key).hex(), chroma(key).brighten().hex(), chroma(key).brighten(2).hex()));
      return colourScale.flat();
    case "candidate4":
      return candidate4;
    case "candidate5":
      return candidate5;
    case "candidate6":
      return candidate6;
    case "candidate7":
      return candidate7;
    case "IBM":
      IBM.map((key) => colourScale.push(chroma(key).darken().hex(), chroma(key).hex(), chroma(key).brighten().hex(), chroma(key).brighten(2).hex()));
      return colourScale.flat();
    case "wong":
      wong.map((key) => colourScale.push(chroma(key).darken().hex(), chroma(key).hex(), chroma(key).brighten().hex(), chroma(key).brighten(2).hex()));
      return colourScale.flat();
    case "candidate10":
      candidate10.map((key) => colourScale.push(chroma(key).darken().hex(), chroma(key).hex(), chroma(key).brighten().hex(), chroma(key).brighten(2).hex()));
      return colourScale.flat();
    case "candidate11":
      candidate11.map((key) => colourScale.push(chroma(key).darken().hex(), chroma(key).hex(), chroma(key).brighten().hex(), chroma(key).brighten(2).hex()));
      return colourScale.flat();
    case "candidate12":
      candidate12.map((key) => colourScale.push(chroma(key).darken().hex(), chroma(key).hex(), chroma(key).brighten().hex(), chroma(key).brighten(2).hex()));
      return colourScale.flat();
    case "candidate13":
      candidate13.map((key) => colourScale.push(chroma(key).darken().hex(), chroma(key).hex(), chroma(key).brighten().hex(), chroma(key).brighten(2).hex()));
      return colourScale.flat();
    case "candidate21":
      candidate21.map((key) => colourScale.push(chroma(key).hex(), chroma(key).hex(), chroma(key).hex(), chroma(key).hex()));
      //return colourScale.flat();
      return candidate20;
    default:
      candidate2.map((key) => colourScale.push(chroma(key).darken().hex(), chroma(key).hex(), chroma(key).brighten().hex(), chroma(key).brighten(2).hex()));
      return colourScale.flat();
  }
};
