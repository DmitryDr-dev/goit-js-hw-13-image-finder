export const searchImage = {
  apiKey: '23203162-5bd4fce9443c3feba1bdcfdd5',
  baseUrl: 'https://pixabay.com/api/?image_type=photo&orientation=horizontal',
  qtyPerPage: 12,
  pageNumber: 1,

  async fetchImg(searchQuery) {
    try {
      const response = await fetch(
        `${this.baseUrl}&q=${searchQuery}&page=${this.pageNumber}&per_page=${this.qtyPerPage}&key=${this.apiKey}
`,
      );
      const data = await response.json();
      const hits = await data.hits;
      return hits;
    } catch (error) {
      console.log(error);
    }
  },

  increasePageNumber() {
    this.pageNumber += 1;
  },

  resetPageNumber() {
    this.pageNumber = 1;
  },
};
