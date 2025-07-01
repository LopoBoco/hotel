class Button {
  getElements() {
    this.wideButton = document.querySelectorAll('.js-button_type_wide');
    this.invertButton = document.querySelectorAll('.js-button_type_invert');
    this.wideButtonArrow = document.querySelectorAll('.js-button__wrapper .js-button__arrow');
  }

  initializeButtonEvents() {
    this.wideButtonArrow.forEach((arrow) => {
      const arrowTemp = arrow;
      const handleMouseOver = () => {
        arrowTemp.previousElementSibling.style.opacity = 0.5;
      };
      const handleMouseLeave = () => {
        arrowTemp.previousElementSibling.style.opacity = 1;
      };

      arrow.addEventListener('mouseover', handleMouseOver);
      arrow.addEventListener('mouseleave', handleMouseLeave);
    });

    this.wideButton.forEach((wide) => {
      const wideTemp = wide;
      const handleMouseOver = () => {
        wideTemp.style.opacity = 0.5;
      };
      const handleMouseLeave = () => {
        wideTemp.style.opacity = 1;
      };

      wide.addEventListener('mouseover', handleMouseOver);
      wide.addEventListener('mouseleave', handleMouseLeave);
    });

    this.invertButton.forEach((invert) => {
      const invertTemp = invert;
      const handleMouseOver = () => {
        invertTemp.closest('.button__wrapper-invert').classList.add('button__wrapper-invert_hover');
      };
      const handleMouseLeave = () => {
        invertTemp.closest('.button__wrapper-invert').classList.remove('button__wrapper-invert_hover');
      };
      invert.addEventListener('mouseover', handleMouseOver);

      invert.addEventListener('mouseleave', handleMouseLeave);
    });
  }

  initialize() {
    this.getElements();

    this.initializeButtonEvents();
  }
}

export default Button;
