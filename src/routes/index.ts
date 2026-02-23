import { FastifyPluginAsync } from "fastify";

import { waterFountainRoutes } from "./waterFountainRoutes";
import { temperatureRoutes }   from "./temperatureRoutes";

export const routes: FastifyPluginAsync = async app => {

    app.register(waterFountainRoutes, { prefix: "/water-fountains" });
    app.register(temperatureRoutes,   { prefix: "/temperatures" });

}
