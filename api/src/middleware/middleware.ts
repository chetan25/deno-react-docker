import { Response, Status } from "../../deps.ts";

export const setContentTypeHeader = async (
  { response }: { response: Response },
  next: () => Promise<unknown>
): Promise<void> => {
  await next();
  response.headers.set("Content-Type", "application/json");
};

export const notFound = ({ response }: { response: Response }) => {
  response.status = Status.NotFound;
  response.body = {
    success: false,
    message: "404 Not Found",
  };
};
