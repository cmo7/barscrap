import {Webpage} from '../types/webpage'

const heo: Webpage = {
  name: 'HEO',
  url: 'https://www.heo.com',
  navSelectors: {
    searchBox: '.search-box input',
    searchButton: '[ng-click="searchForString()"]',
    ready: '[ng-class=\'{loading: spinner}\']',
    resultsPage: '.article',
  },
  dataSelectors: {
    name: 'h1',
    mainImageURL: '.product-pic img',
    extraImages: '.warper-product .slick-track img',
    description: '[ng-bind-html="article.getDescription(getLanguage())"]',
    brand: 'h2',
    category: 'h2',
  },
}

const sd: Webpage = {
  name: 'SD',
  url: 'https://www.sddistribuciones.com/',
  navSelectors: {
    openSearch: '[href="#div_buscador"]',
    searchBox: '#txtBuscador_master',
    searchButton: '#btnBuscar',
    ready: '[href="#div_buscador"]',
    resultsPage: '#ContentPlaceHolder1_imgPortada',
    multipleResultsPage: '#ContentPlaceHolder1_ul_buscador',
    firstResult: '#ContentPlaceHolder1_ul_buscador:first-child a',
  },
  dataSelectors: {
    name: '#ContentPlaceHolder1_lblTitulo',
    mainImageURL: '#ContentPlaceHolder1_imgPortada',
    extraImages: '.imagenes_adicionales',
    description: '#ContentPlaceHolder1_lblSinopsis',
    brand: '#ContentPlaceHolder1_lblFabricante_merchan',
    category: '#ContentPlaceHolder1_lblTipo_merchan',
  },
}

const globalFreaks: Webpage = {
  name: 'Global Freaks',
  url: 'https://www.global-freaks.com',
  navSelectors: {
    searchBox: '',
    searchButton: '',
    ready: '',
    openSearch: undefined,
    resultsPage: '',
    multipleResultsPage: undefined,
    firstResult: undefined,
  },
  dataSelectors: {
    name: '',
    mainImageURL: '',
    extraImages: '',
    description: '',
    brand: '',
    category: '',
  },
}

const webpages = {
  globalFreaks, heo, sd,
}

export default webpages
