import View from './View';
import icons from '../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const gotoPage = +btn.dataset.goto;
      handler(gotoPage);
    });
  }

  _generateMarkup() {
    const currentPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // page 1 and there are other pages
    if (currentPage === 1 && numPages > 1) {
      return this._generateBtn(currentPage + 1, 'right');
    }

    // last page
    if (currentPage === numPages && numPages > 1) {
      return this._generateBtn(currentPage - 1, 'left');
    }

    // other page
    if (currentPage < numPages) {
      return (
        this._generateBtn(currentPage - 1, 'left') +
        this._generateBtn(currentPage + 1, 'right')
      );
    }

    //page 1 and no other pages
  }

  _generateBtn(currentPage, direction) {
    return `
        <button data-goto="${currentPage}" class="btn--inline pagination__btn--${
      direction == 'right' ? 'next' : 'prev'
    }">
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-${direction}"></use>
            </svg>
            <span>Page ${currentPage}</span>
        </button>`;
  }
}

export default new PaginationView();
