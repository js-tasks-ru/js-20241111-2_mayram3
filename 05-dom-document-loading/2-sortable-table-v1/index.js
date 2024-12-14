const validSortTypes = ["number", "string"];

export default class SortableTable {
  element;
  subElements = {};
  orderValue;
  sortedFieldValue;

  constructor(headerConfig = [], data = []) {
    this.headerConfig = headerConfig;
    this.data = data;

    this.element = this.createElement(this.createTemplate());
    this.selectSubElements();
  }

  createElement(template) {
    const element = document.createElement("div");

    element.innerHTML = template;

    return element.firstElementChild;
  }

  createArrowTemplate() {
    return `
      <span data-element="arrow" class="sortable-table__sort-arrow">
        <span class="sort-arrow"></span>
      </span>
    `;
  }

  createTableHeaderCellTemplate({ id, sortable, title }) {
    const isSortableColumn =
      sortable && this.orderValue && this.sortedFieldValue === id;
    const dataOrder = isSortableColumn ? `data-order="${this.orderValue}"` : "";
    const arrowTemplate = isSortableColumn ? this.createArrowTemplate() : "";

    return `
      <div class="sortable-table__cell" data-id="${id}" data-sortable="${sortable}" ${dataOrder}>
        <span>${title}</span>
        ${arrowTemplate}
      </div>
    `;
  }

  createTableHeaderCellsTemplate() {
    return this.headerConfig
      .map((columnHeaderData) =>
        this.createTableHeaderCellTemplate(columnHeaderData)
      )
      .join("");
  }

  createTableHeaderTemplate() {
    return `
      <div data-element="header" class="sortable-table__header sortable-table__row">
        ${this.createTableHeaderCellsTemplate()}
      </div>
    `;
  }

  createTableBodyCellTemplate(productData, { id, template }) {
    return template
      ? template(productData[id])
      : `<div class="sortable-table__cell">${productData[id]}</div>`;
  }

  createTableBodyRowTemplate(productData) {
    return `
      <a href="/products/${productData["id"]}" class="sortable-table__row">
        ${this.headerConfig
          .map((columnData) =>
            this.createTableBodyCellTemplate(productData, columnData)
          )
          .join("")}
      </a>
    `;
  }

  createTableBodyRowsTemplate() {
    return this.data
      .map((item) => this.createTableBodyRowTemplate(item))
      .join("");
  }

  createTableBodyTemplate() {
    return `
      <div data-element="body" class="sortable-table__body">
        ${this.createTableBodyRowsTemplate()}
      </div>
    `;
  }

  createTableLoadingTemplate() {
    return `
      <div data-element="loading" class="loading-line sortable-table__loading-line"></div>
    `;
  }

  createTableEmptyPlaceholderTemplate() {
    return `
      <div data-element="emptyPlaceholder" class="sortable-table__empty-placeholder">
        <div>
          <p>No products satisfies your filter criteria</p>
          <button type="button" class="button-primary-outline">Reset all filters</button>
        </div>
      </div>
    `;
  }

  createTemplate() {
    return `
      <div class="sortable-table">
        ${this.createTableHeaderTemplate()}
        ${this.createTableBodyTemplate()}
        ${this.createTableLoadingTemplate()}
        ${this.createTableEmptyPlaceholderTemplate()}
      </div>
    `;
  }

  selectSubElements() {
    this.element.querySelectorAll("[data-element]").forEach((element) => {
      this.subElements[element.dataset.element] = element;
    });
  }

  sortNumericData(sortDirection) {
    this.data.sort((a, b) => {
      const fieldValueA = a[this.sortedFieldValue];
      const fieldValueB = b[this.sortedFieldValue];

      return sortDirection * (fieldValueA - fieldValueB);
    });
  }

  sortStringData(sortDirection) {
    this.data.sort((a, b) => {
      const fieldValueA = a[this.sortedFieldValue];
      const fieldValueB = b[this.sortedFieldValue];

      return (
        sortDirection *
        fieldValueA.localeCompare(fieldValueB, ["ru", "en"], {
          caseFirst: "upper",
          sensitivity: "variant",
        })
      );
    });
  }

  sortData(sortType) {
    const sortDirection = this.orderValue === "asc" ? 1 : -1;

    if (sortType === "number") {
      this.sortNumericData(sortDirection);
    }

    if (sortType === "string") {
      this.sortStringData(sortDirection);
    }
  }

  sort(fieldValue, orderValue) {
    this.sortedFieldValue = fieldValue;
    this.orderValue = orderValue;

    const { sortable, sortType } =
      this.headerConfig.find(({ id }) => id === fieldValue) || {};

    if (!sortable || !validSortTypes.includes(sortType)) {
      return;
    }

    this.sortData(sortType);
    this.update();
  }

  update() {
    this.element.querySelector("[data-element='header']").innerHTML =
      this.createTableHeaderCellsTemplate();
    this.element.querySelector("[data-element='body']").innerHTML =
      this.createTableBodyRowsTemplate();
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }
}
