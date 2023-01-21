import RabbitBox from "./index.js";

//not bug, but a feature
const x = new RabbitBox("pizza|p:<object,number>","lemon");
console.log(x.make({':':5}))