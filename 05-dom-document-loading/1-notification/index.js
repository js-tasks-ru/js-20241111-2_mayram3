const initialOptions = {
  duration: 2_000,
  type: "success",
};

export default class NotificationMessage {
  static lastShownComponent;

  constructor(message, { duration, type } = initialOptions) {
    this.message = message;
    this.duration = duration;
    this.type = type;
    this.durationInSeconds = this.duration / 1_000;

    this.element = this.createElement(this.createTemplate());
  }

  createElement(template) {
    const element = document.createElement("div");

    element.innerHTML = template;

    return element.firstElementChild;
  }

  createTemplate() {
    return `
      <div class="notification ${this.type}" style="--value:${this.durationInSeconds}s">
        <div class="timer"></div>
        <div class="inner-wrapper">
          <div class="notification-header">${this.type}</div>
          <div class="notification-body">
            ${this.message}
          </div>
        </div>
      </div>
    `;
  }

  show(element) {
    if (NotificationMessage.lastShownComponent) {
      NotificationMessage.lastShownComponent.destroy();
    }

    NotificationMessage.lastShownComponent = this;

    const currentElement = element ?? document.body;

    currentElement.append(this.element);
    this.timerId = setTimeout(() => this.destroy(), this.duration);
  }

  remove() {
    this.element.remove();
  }

  clear() {
    clearTimeout(this.timerId);
  }

  destroy() {
    this.remove();
    this.clear();
  }
}
