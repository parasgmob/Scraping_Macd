import { development,staging } from "./env";
export default (() => {
  console.log("{{}}", process.env.REACT_APP_ENV );
  switch (process.env.REACT_APP_ENV) {
    case "dev":
    case "development":
      return development;
    case "stag":
    case "staging":
      return staging;
    default:
      return development;
  }
})();
