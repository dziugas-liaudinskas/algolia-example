import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import { renderToString } from "react-dom/server";
import { getServerState } from "react-instantsearch-hooks-server";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Search, { links as searchLinks } from "~/components/Search";

export const links: LinksFunction = () => {
  return [...searchLinks()]
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const url = new URL(request.url);
  const facetFilters = ["hierarchicalCategories.lvl2:Audio > Home Audio > Speakers"];
  const serverState = await getServerState(
    <Search url={url} facetFilters={facetFilters} />,
    { renderToString }
  );

  return json({ serverState, url, facetFilters });
};

export default function Category() {
  const { url, serverState, facetFilters } = useLoaderData();
  return (
    <Search url={url} serverState={serverState} facetFilters={facetFilters} />
  )
}
