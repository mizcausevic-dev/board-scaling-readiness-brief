import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "./app.js";

describe("board-scaling-readiness-brief app", () => {
  it("serves all HTML routes", async () => {
    const htmlRoutes = ["/", "/readiness-brief", "/execution-drag", "/acceleration-lanes", "/verification", "/docs"];
    for (const route of htmlRoutes) {
      const response = await request(createApp()).get(route);
      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toContain("text/html");
    }
  });

  it("serves all JSON routes", async () => {
    const jsonRoutes = [
      "/api/dashboard/summary",
      "/api/readiness-brief",
      "/api/execution-drag",
      "/api/acceleration-lanes",
      "/api/risk-map",
      "/api/verification",
      "/api/sample",
      "/api/payload"
    ];
    for (const route of jsonRoutes) {
      const response = await request(createApp()).get(route);
      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toContain("application/json");
    }
  });
});
