import { NextRequest, NextResponse } from "next/server";
// import { trpc } from "./utils/trpc";

export const middleware = async (req: NextRequest) => {
  const slug = req.nextUrl.pathname.split("/").pop();

  const fetchedUrl = await fetch(`${req.nextUrl.origin}/api/get-url/${slug}`);
  if (fetchedUrl.status === 404) {
    return NextResponse.redirect(req.nextUrl.origin);
  }

  const data = await fetchedUrl.json();
  if (data?.url) {
    return NextResponse.redirect(data.url);
  }
};

export const config = {
  matcher: "/:slug/",
};
