import { createPinia } from "pinia";

let piniaInstance = null;

const pinia = () => {
  if (piniaInstance !== null) return piniaInstance;

  piniaInstance = createPinia();

  return piniaInstance;
};

export default pinia;
