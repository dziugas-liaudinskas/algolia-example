import React from 'react';

import type { UseQueryRulesProps } from 'react-instantsearch-hooks';
import { useQueryRules } from 'react-instantsearch-hooks';
function cx(
  ...classNames: Array<string | number | boolean | undefined | null>
) {
  return classNames.filter(Boolean).join(' ');
}


export type QueryRuleCustomDataProps = Omit<
  React.ComponentProps<'div'>,
  'children'
> &
  Partial<Pick<UseQueryRulesProps, 'transformItems'>> & {
  children: (options: { items: any[] }) => React.ReactNode;
};

export function QueryRuleCustomData(props: QueryRuleCustomDataProps) {
  const { items } = useQueryRules(props);
  return (
    <div className={cx('ais-QueryRuleCustomData', props.className)}>
      {props.children({ items })}
    </div>
  );
}
