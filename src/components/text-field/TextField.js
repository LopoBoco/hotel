import 'jquery-mask-plugin';

class TextField {
  initialize() {
    this.dateTextFields = $('.js-text-field__input-date');
    this.fieldsWithArrow = document.querySelectorAll('.js-text-field__input_with-arrow input');

    this.dateTextFields.mask('00.00.0000');

    this.fieldsWithArrow.forEach((field) => {
      const handleFieldFocus = () => {
        $('.js-text-field__arrow').fadeIn();
      };
      const handleFieldBlur = () => {
        $('.js-text-field__arrow').fadeOut();
      };

      field.addEventListener('focus', handleFieldFocus);
      field.addEventListener('blur', handleFieldBlur);
    });
  }
}

export default TextField;