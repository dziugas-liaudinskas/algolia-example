import { useCallback } from "react";
import type { LinksFunction } from "@remix-run/node";
import { RefinementList, useDynamicWidgets } from "react-instantsearch-hooks-web";

import {
  PriceFilter,
  links as priceFilterLinks,
} from "~/components/PriceFilter";

export const links: LinksFunction = () => {
  return [
    ...priceFilterLinks(),
  ];
};


const FallbackComponent = ({ attribute}:{ attribute: string }) => {
  return <>
    <h3>{attribute}</h3>
    <RefinementList attribute={attribute} />
  </>;
};

export default function Filters() {
  const { attributesToRender } = useDynamicWidgets({ facets: [`*`] });

  const DynamicWidgetComponent = useCallback(
    ({ attribute }: { attribute: string }) => {
      if (attribute === `price` || attribute.startsWith(`categories`) || attribute.startsWith(`hierarchicalCategories`)) {
        return null;
      }
      return <FallbackComponent attribute={attribute} />;
    },
    []
  );

  return (
    <div className="Filters">
      <PriceFilter
        attribute="price"
      />
      {attributesToRender.map((attribute) => {
        return (
          <DynamicWidgetComponent
            key={attribute}
            attribute={attribute}
          ></DynamicWidgetComponent>
        );
      })}
    </div>
  );
}
