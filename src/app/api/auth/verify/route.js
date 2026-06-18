import { NextResponse } from "next/server";
import { getAuthTokensContainer, getUsersContainer } from "@/lib/cosmos";
import { setSessionCookie } from "@/lib/session";

function siteUrl(path) {
  const base = process.env.AUTH_BASE_URL || "https://vowsandvedas.com";
  return `${base}${path}`;
}

export async function GET(request) {
  const token = request.nextUrl.searchParams.get("token");
  if (!token) {
    return NextResponse.redirect(siteUrl("/?auth=invalid"));
  }

  let tokenDoc;
  try {
    const tokensContainer = getAuthTokensContainer();
    // Token id is the token itself; we need email as partition key, so query by id
    const { resources } = await tokensContainer.items
      .query({ query: "SELECT * FROM c WHERE c.id = @token", parameters: [{ name: "@token", value: token }] })
      .fetchAll();
    tokenDoc = resources[0];
  } catch (err) {
    console.error("Cosmos token lookup error:", err);
    return NextResponse.redirect(siteUrl("/?auth=error"));
  }

  if (!tokenDoc || tokenDoc.expiresAt < Date.now()) {
    return NextResponse.redirect(siteUrl("/?auth=expired"));
  }

  // Delete token (one-time use)
  try {
    await getAuthTokensContainer().item(token, tokenDoc.email).delete();
  } catch {
    // Non-fatal — token expiry via TTL will clean it up
  }

  // Fetch user
  let user;
  try {
    const { resource } = await getUsersContainer().item(tokenDoc.email, tokenDoc.email).read();
    user = resource;
  } catch (err) {
    console.error("Cosmos user fetch error:", err);
    return NextResponse.redirect(siteUrl("/?auth=error"));
  }

  if (!user) {
    return NextResponse.redirect(siteUrl("/?auth=invalid"));
  }

  // Set session cookie
  await setSessionCookie({
    sub: user.id,
    email: user.email,
    firstName: user.firstName ?? "",
    lastName: user.lastName ?? "",
  });

  return NextResponse.redirect(siteUrl("/"));
}
