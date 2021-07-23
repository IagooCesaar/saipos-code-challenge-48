import axios from "axios";

const catFacts = axios.create({
  baseURL: `https://cat-fact.herokuapp.com`,
});

export { catFacts };
