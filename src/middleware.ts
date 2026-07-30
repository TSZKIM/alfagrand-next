import createMiddleware from "next-intl/middleware";
import { routing } from "./app/[locale]/config";

export default createMiddleware(routing);

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
