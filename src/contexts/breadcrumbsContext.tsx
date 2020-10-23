import React, { useState } from 'react';

const BreadcrumbsContext = React.createContext<
  | {
      breadcrumbs: any;
      setBreadcrumbs: (value: any) => void;
      removeLastBreadcrumb: () => void;
    }
  | undefined
>(undefined);

const BreadcrumbsProvider: React.FC<{
  children: React.ReactElement;
}> = ({ children }) => {
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  const removeLastBreadcrumb = () => {
    breadcrumbs.pop();
    setBreadcrumbs(breadcrumbs);
  };

  return (
    <BreadcrumbsContext.Provider
      value={{
        breadcrumbs,
        setBreadcrumbs,
        removeLastBreadcrumb,
      }}
    >
      {children}
    </BreadcrumbsContext.Provider>
  );
};

export function withBreadcrumbs(Component) {
  return props => {
    return (
      <BreadcrumbsProvider>
        <Component {...props} />
      </BreadcrumbsProvider>
    );
  };
}

export function useBreadCrumbs() {
  const context = React.useContext(BreadcrumbsContext);
  if (context === undefined) {
    throw new Error('useBreadCrumbs must be used within a BreadcrumbsProvider');
  }
  return context;
}
