// external imports

import { NextRequest, NextResponse } from "next/server";
import * as jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";

export default function middleware(req: NextRequest) {
  // extracting current pathname
  const pathName = req.nextUrl.pathname;

  // extraction cookies from token
  const cookie = req.cookies.get("token")?.value;

  let TokenId;

  if (cookie !== null && cookie !== undefined && cookie) {
    const decode = jwt.decode(cookie);
    TokenId = (decode as JwtPayload)?.id;
  }

  const isPublic = pathName === "/" || pathName === "/login";
  const isPrivate =
    pathName.startsWith("/profile/") ||
    pathName === "/profile" ||
    pathName.startsWith("/createtodo/") ||
    pathName.startsWith("/updatetodo/");

  if (isPrivate && !TokenId) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }
  if (isPublic && TokenId) {
    return NextResponse.redirect(new URL(`/profile/${TokenId}`, req.nextUrl));
  }
}

export const config = {
  api: {
    externalResolver: true,
  },
};