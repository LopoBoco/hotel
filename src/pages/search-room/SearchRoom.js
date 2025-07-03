class SearchRoom {
  initialize() {
    this.result = $('.js-search-room__result');
    this.filter = $('.js-search-room__filter');

    const toggleContent = () => {
      this.result.fadeToggle();
      this.filter.fadeToggle();
    };

    if (this.result[0]) {
      document.querySelector('.js-search-room__filter-symbols-reset').addEventListener('click', toggleContent);
      document.querySelector('.js-search-room__filter-symbols-apply').addEventListener('click', toggleContent);
      document.querySelector('.js-search-room__result-filter').addEventListener('click', toggleContent);
    }
  }
}

export default SearchRoom;
