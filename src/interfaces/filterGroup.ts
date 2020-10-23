import Facet from './facet';

export default interface FilterGroup {
  id: string;
  facets: Array<Facet>;
  multiSelect?: Boolean;
  hasParent: Boolean;
}
