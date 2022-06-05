import View from './View';

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _message = 'Recipe was successfully uploaded :)';
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');
  _btnAddIngredient = document.getElementById('btn-plus');
  _btnRemoveIngredient = document.getElementById('btn-minus');
  _ingredientCounter = 1;

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
    this._addHandlerAddIngredient();
    this._addHandlerRemoveIngredient();
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  _addHandlerAddIngredient() {
    this._btnAddIngredient.addEventListener(
      'click',
      this._generateIngredientMarkup.bind(this)
    );
  }

  _addHandlerRemoveIngredient() {
    this._btnRemoveIngredient.addEventListener(
      'click',
      this._removeIngredient.bind(this)
    );
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();

      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);

      handler(data);
    });
  }

  handleFormErrors() {
    const input = this._parentElement.querySelectorAll('input');
    let isValid = true;

    input.forEach(el => {
      if (!el.validity.valid) {
        this._showErrors(el);
        isValid = false;
      } else if (el.nextElementSibling?.classList.contains('errorMsg')) {
        el.nextElementSibling.textContent = '';
      }
    });

    return isValid;
  }

  _showErrors(el) {
    const err = el.nextElementSibling;
    let title = el.parentElement.previousElementSibling.textContent;
    title = title.startsWith('Ingredient') ? el.className.split('-')[1] : title;

    if (el.validity.valueMissing) {
      err.textContent = `Enter ${title}`;
    } else if (el.validity.typeMismatch) {
      err.textContent = `Invalid value`;
    } else if (el.validity.tooShort) {
      err.textContent = `${title} should be at least ${el.minLength} characters`;
    } else if (el.validity.patternMismatch) {
      err.textContent = `Invalid ${title}`;
    }
  }

  _generateIngredientMarkup(e) {
    e.preventDefault();

    if (this._ingredientCounter >= 6) return;

    this._ingredientCounter++;

    const html = `<label>Ingredient ${this._ingredientCounter}</label>
    <div class="upload__ingredients-input">
      <input
        required
        class="input-item"
        type="text"
        name="ingredient-${this._ingredientCounter}"
        placeholder="item"
      />
      <span class="errorMsg"></span>
      <input
        required
        class="input-quantity"
        type="number"
        name="quantity-${this._ingredientCounter}"
        placeholder="qty"
      />
      <span class="errorMsg"></span>
      <select class="input-unit" name="unit-${this._ingredientCounter}">
        <option value="kg">kg</option>
        <option value="grams">grams</option>
        <option value="ounce">ounce</option>
        <option value="ml">ml</option>
        <option value="litres">litres</option>
        <option value="tsp">tsp</option>
        <option value="tbsp">tbsp</option>
        <option value="pcs">pcs</option>
      </select>
    </div>`;

    document
      .querySelectorAll('.upload__ingredients-input')
      [this._ingredientCounter - 2].insertAdjacentHTML('afterend', html);
    document
      .querySelectorAll('.upload__ingredients-input')
      [this._ingredientCounter - 1].appendChild(this._btnAddIngredient);
    document
      .querySelectorAll('.upload__ingredients-input')
      [this._ingredientCounter - 1].appendChild(this._btnRemoveIngredient);
  }

  _removeIngredient(e) {
    e.preventDefault();

    if (this._ingredientCounter <= 1) return;

    const targetEl = document.querySelectorAll('.upload__ingredients-input');

    targetEl[this._ingredientCounter - 2].appendChild(this._btnAddIngredient);
    targetEl[this._ingredientCounter - 2].appendChild(
      this._btnRemoveIngredient
    );
    targetEl[this._ingredientCounter - 1].previousElementSibling.remove();
    targetEl[this._ingredientCounter - 1].remove();

    this._ingredientCounter--;
  }

  _generateMarkup() {}
}

export default new AddRecipeView();
