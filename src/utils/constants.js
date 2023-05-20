export const header = (category) => `News - Top ${category} Headlines`;

export const navs = [
    { nav: "Home", page: "/" },
    { nav: "Settings", page: "/settings" },
]

export const categories = [
    'business', 'sports', 'science', 'health', 'entertainment',
    'technology', 'war', 'government', 'politics', 'environment','economy', 'fashion'
]

export const sources = [
    'The Guardian', 'News API', 'New York Times'
]

export const baseUrl = 'http://localhost:8000/api/'

export const mutlimedia_prefix = 'https://static01.nyt.com/'