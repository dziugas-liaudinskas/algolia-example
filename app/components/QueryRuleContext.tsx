import type { UseQueryRulesProps } from 'react-instantsearch-hooks';
import { useQueryRules } from 'react-instantsearch-hooks';

export type QueryRuleContextProps = Partial<
  Pick<UseQueryRulesProps, 'trackedFilters' | 'transformRuleContexts'>
>;

export function QueryRuleContext(props: QueryRuleContextProps) {
  useQueryRules(props);
  return null;
}
