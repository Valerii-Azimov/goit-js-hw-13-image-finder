const baseUrl =
  'https://pixabay.com/api/?image_type=photo&orientation=horizontal';

export default {
  page: 1,
  query: '',
  async fetchArticles(query) {
    const key = '17916364-315350d6aa1d9b654f7b6ef04';
    const requestParams = `&q=${this.query}&page=${this.page}&per_page=12&key=${key}`;
    const response = await fetch(baseUrl + requestParams);
    this.incrementPage();
    return await response.json();
  },
  get searchQuery() {
    return this.query;
  },
  set searchQuery(string) {
    this.query = string;
  },
  incrementPage() {
    this.page += 1;
  },
  resrtPage() {
    this.page = 1;
  },
};
