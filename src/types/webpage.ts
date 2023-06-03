interface Webpage {
    name: string,
    url: string,
    navSelectors: {
      searchBox: string,
      searchButton: string,
      ready: string,
      openSearch?: string,
      resultsPage: string,
      multipleResultsPage?: string,
      firstResult?: string,
    },
    dataSelectors: {
      name: string,
      mainImageURL: string,
      extraImages: string,
      description: string,
      brand: string,
      category: string,
    }
  }
  