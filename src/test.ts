import RabbitBox from "./index.js";

//not bug, but a feature
const x = new RabbitBox("!pizza|p:<array>","lemonade|lemon|l",{"burger|sandwich":"TASTY"},"frutiloops|f",{"apple|a":6});
console.log(x.make([]))