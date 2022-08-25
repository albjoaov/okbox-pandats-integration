import pd from "node-pandas-js";

const df = pd.readCsv("leads.csv");

export default df;
