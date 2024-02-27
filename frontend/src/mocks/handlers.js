import { rest } from "msw";
export const handlers = [
  rest.get("/api/getTodos", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        { id: 1, todo: "Shop Groceries" },
        { id: 2, todo: "Send the parcels" },
      ])
    );
  }),
];
