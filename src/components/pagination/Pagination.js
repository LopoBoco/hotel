class Pagination {
  getElements() {
    this.pagination = document.querySelector('.js-pagination');
    this.paginationList = document.querySelector('.js-pagination ul');
  }

  createPagination(totalPages, page) {
    let liTag = '';
    let active;
    let beforePage = page - 1;
    let afterPage = page + 1;
    if (page > 1) {
      liTag += `<li class="pagination__item pagination__item_type_previous" onclick="createPagination(${totalPages}, ${page - 1})"></li>`;
    }
    if (page > 2) {
      liTag += `<li class="pagination__item" onclick="createPagination(${totalPages}, 1)">1</li>`;
      if (page > 3) {
        liTag += `<li class="pagination__item pagination__item_type_dots">...</li>`;
      }
    }

    if (page === totalPages || page === totalPages - 1) {
      beforePage -= 1;
    }

    if (page === 1 || page === 2) {
      afterPage += 1;
    }

    for (let pageLength = beforePage; pageLength <= afterPage; pageLength++) {
      if (pageLength <= totalPages) {
        if (pageLength === 0) {
          pageLength += 1;
        }
        if (page === pageLength) {
          active = 'pagination__item_active';
        } else {
          active = '';
        }
        liTag += `<li class="pagination__item ${active}" onclick="createPagination(${totalPages}, ${pageLength})">${pageLength}</li>`;
      }
    }

    if (page < totalPages - 1) {
      if (page < totalPages - 2) {
        liTag += `<li class="pagination__item pagination__item_type_dots">...</li>`;
      }
      liTag += `<li class="pagination__item" onclick="createPagination(${totalPages}, ${totalPages})">${totalPages}</li>`;
    }
    if (page < totalPages) {
      liTag += `<li class="pagination__item pagination__item_type_next" onclick="createPagination(${totalPages}, ${page + 1})"></li>`;
    }
    this.paginationList.innerHTML = liTag;
  }

  initialize() {
    this.getElements();

    if (this.pagination) {
      const totalPagesFromDataset = this.pagination.dataset.pages;
      const initialPage = 1;

      this.createPagination(totalPagesFromDataset, initialPage);

      window.createPagination = this.createPagination.bind(this);
    }
  }
}

export default Pagination;
