import type { LinksFunction } from "@remix-run/node";
import type { Hit as AlgoliaHit } from 'instantsearch.js';
import algoliasearch from 'algoliasearch/lite';
import React from 'react';
import {
  InstantSearch,
  Configure,
  ClearRefinements,
  CurrentRefinements,
  Highlight,
  Hits,
  HitsPerPage,
  InfiniteHits,
  Pagination,
  RefinementList,
  SearchBox,
  InstantSearchSSRProvider,
} from 'react-instantsearch-hooks-web';
import type { InstantSearchServerState } from "react-instantsearch-hooks-web";
import { Link } from "@remix-run/react";


import { Tab, Tabs } from "~/components/layout";
import { QueryRuleContext, QueryRuleCustomData, Refresh } from "~/components";
import Filters, { links as filtersLinks } from "~/components/Filters";

import { links as refreshLinks } from '~/components/Refresh';

import stylesUrl from '../App.css';
import { useInRouterContext } from "react-router";

const instantsearchRouters = require(`instantsearch.js/cjs/lib/routers/index.js`);

export const links: LinksFunction = () => {
  return [
    ...refreshLinks(),
    ...filtersLinks(),
    { rel: "stylesheet", href: stylesUrl }];
};

const searchClient = algoliasearch(
  'latency',
  '6be0576ff61c053d5f9a3225e2a90f76'
);

type HitProps = {
  hit: AlgoliaHit<{
    name: string;
    price: number;
    brand: string;
    categories: string[];
    objectID: string;
  }>;
};

function Hit({ hit }: HitProps) {
  const inRouterContext = useInRouterContext();
  const { objectID } = hit;
  const isSpeaker = hit.categories.includes('Speakers');

  if (!inRouterContext) {
    // DynamicWidgets renders twice on the server, so we need to check if we're in a router context
    // https://github.com/algolia/instantsearch/issues/5552
    return null;
  }
  return (
    <Link to={`/product/${objectID}`}>
      <Highlight hit={hit} attribute="name" className="Hit-label" />
      <Highlight hit={hit} attribute="brand" className="Hit-label" />
      <span>
        Does hit categories include Speakers:
        <span style={{ color: isSpeaker ? 'green' : 'red'}}>{isSpeaker ? ' YES' : ' NO'}</span>
        &nbsp;&nbsp;&nbsp;
      </span>
      <span className="Hit-price">${hit.price}</span>
    </Link>
  );
}
export default function Search({
  url,
  serverState,
  facetFilters,
} : {
  url: URL,
  serverState?: InstantSearchServerState,
  facetFilters?: string[]
}) {
  return (
    <main>
      <InstantSearchSSRProvider { ...serverState }>
        <InstantSearch
          searchClient={searchClient}
          indexName="instant_search"
          initialUiState={undefined}
          routing={{
            router: instantsearchRouters.history({
              getLocation: () => {
                return typeof window === `undefined`
                  ? new URL(url)
                  : window.location;
              },
            }),
          }}
        >
          <Configure facetFilters={facetFilters} />

          <div className="Container">
            <div>
              <Filters />
            </div>
            <div className="Search">
              <SearchBox placeholder="Search" autoFocus />
              <div className="Search-header">
                <HitsPerPage
                  items={[
                    { label: '20 hits per page', value: 20, default: true },
                    { label: '40 hits per page', value: 40 },
                  ]}
                />
                <Refresh />
              </div>
              <div className="CurrentRefinements">
                <ClearRefinements />
                <CurrentRefinements
                  transformItems={(items) =>
                    items.map((item) => {
                      const label = item.label.startsWith('hierarchicalCategories')
                        ? 'Hierarchy'
                        : item.label;

                      return {
                        ...item,
                        attribute: label,
                      };
                    })
                  }
                />
              </div>

              {/*<QueryRuleContext*/}
              {/*  trackedFilters={{*/}
              {/*    brand: () => ['Apple'],*/}
              {/*  }}*/}
              {/*/>*/}

              {/*<QueryRuleCustomData>*/}
              {/*  {({ items }) => (*/}
              {/*    <>*/}
              {/*      {items.map((item) => (*/}
              {/*        <a href={item.link} key={item.banner}>*/}
              {/*          <img src={item.banner} alt={item.title} />*/}
              {/*        </a>*/}
              {/*      ))}*/}
              {/*    </>*/}
              {/*  )}*/}
              {/*</QueryRuleCustomData>*/}

              <Tabs>
                <Tab title="Hits">
                  <Hits hitComponent={Hit} />
                  <Pagination className="Pagination" />
                </Tab>
                {/*<Tab title="InfiniteHits">*/}
                {/*  <InfiniteHits showPrevious hitComponent={Hit} />*/}
                {/*</Tab>*/}
              </Tabs>
            </div>
          </div>
        </InstantSearch>
      </InstantSearchSSRProvider>
    </main>
  );
}
