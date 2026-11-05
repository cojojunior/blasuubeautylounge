import { services } from "./services";
import { packages } from "./packages";

export const allServices = [...services, ...packages];
export * from "./services";
export * from "./packages";
