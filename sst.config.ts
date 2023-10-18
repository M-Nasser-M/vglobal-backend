import { SSTConfig } from "sst";
import { strapiStack } from "./stacks/StrapiEcsStack";

export default {
  config(_input) {
    return {
      name: "vglobal-strapi",
      region: "eu-north-1",
    };
  },
  stacks(app) {
    app.stack(strapiStack);
  },
} satisfies SSTConfig;
