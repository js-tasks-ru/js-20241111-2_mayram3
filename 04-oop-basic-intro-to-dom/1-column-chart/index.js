export default class ColumnChart {
  element;
  chartHeight = 50;

  constructor({
    data = [],
    label = "",
    value = 0,
    link = "",
    formatHeading = (value) => value,
  } = {}) {
    this.data = data;
    this.label = label;
    this.value = value;
    this.link = link;
    this.formatHeading = formatHeading;

    this.element = this.createElement(this.createTemplate());
  }

  createElement(template) {
    const element = document.createElement("div");

    element.innerHTML = template;

    return element.firstElementChild;
  }

  getColumnProps() {
    const maxValue = Math.max(...this.data);
    const scale = this.chartHeight / maxValue;

    return this.data.map((item) => ({
      percent: ((item / maxValue) * 100).toFixed(0) + "%",
      value: String(Math.floor(item * scale)),
    }));
  }

  createColumnChartClasses() {
    return this.data.length
      ? "column-chart"
      : "column-chart column-chart_loading";
  }

  createColumnChartStyles() {
    return `--chart-height: ${this.chartHeight}`;
  }

  createLinkTemplate() {
    return this.link
      ? `<a href="${this.link}" class="column-chart__link">View all</a>`
      : "";
  }

  createHeaderElement() {
    return this.formatHeading(this.value);
  }

  createChartBodyTemplate() {
    return this.getColumnProps()
      .map(
        ({ value, percent }) =>
          `<div style="--value: ${value}" data-tooltip="${percent}"></div>`
      )
      .join("");
  }

  createTemplate() {
    return `
      <div class="${this.createColumnChartClasses()}" style="${this.createColumnChartStyles()}">
        <div class="column-chart__title">
          ${this.label}
          ${this.createLinkTemplate()}
        </div>
        <div class="column-chart__container">
          <div data-element="header" class="column-chart__header">
            ${this.createHeaderElement()}
          </div>
          <div data-element="body" class="column-chart__chart">
            ${this.createChartBodyTemplate()}
          </div>
        </div>
      </div>`;
  }

  update(data) {
    this.data = data;
    this.element.querySelector('[data-element="body"]').innerHTML =
      this.createChartBodyTemplate();
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }
}
