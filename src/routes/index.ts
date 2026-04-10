import { FastifyPluginAsync } from "fastify";

import { waterFountainRoutes } from "./waterFountainRoutes";

export const routes: FastifyPluginAsync = async app => {

    app.register(waterFountainRoutes, { prefix: "/water-fountains" });

}
