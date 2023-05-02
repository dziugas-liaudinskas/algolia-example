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
  const filters = 'hierarchicalCategories.lvl2:"Audio > Home Audio > Speakers"';
  const serverState = await getServerState(
    <Search url={url} filters={filters} />,
    { renderToString }
  );

  return json({ serverState, url, filters });
};

export default function Category() {
  const { url, serverState, filters } = useLoaderData();
  return (
    <Search url={url} serverState={serverState} filters={filters} />
  )
}
