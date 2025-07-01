import 'jquery-mask-plugin';

class Dropdown {
  getElements() {
    this.counter = $('.js-dropdown__item-count');
    this.dropdown = $('.js-dropdown');
    this.dropdownGuests = $('.js-dropdown_guests');
    this.dropdownRoom = $('.js-dropdown_room');

    this.itemPlus = $('.js-dropdown__item-plus');
    this.itemMinus = $('.js-dropdown__item-minus');
  }

  initializeDropdownEvents() {
    this.dropdown.each((i, item) => {
      const handleArrowClick = () => {
        const dropdownItem = item;
        $(item).find('.js-dropdown__list').slideToggle();
        if (item.querySelector('.js-dropdown__wrapper').style.borderRadius !== '4px 4px 0px 0px') {
          dropdownItem.querySelector('.js-dropdown__wrapper').style.borderRadius = '4px 4px 0px 0px';
        } else {
          dropdownItem.querySelector('.js-dropdown__wrapper').style.borderRadius = '4px';
        }

        $('html').trigger('closeDropdownRequest', { target: item });
      };

      const handleCloseDropdownRequest = (e, { target }) => {
        if (target !== item) {
          $(item).find('.js-dropdown__list').slideUp(0);
        }
      };

      $(item).find('.js-dropdown__input').on('click', handleArrowClick);
      $('html').on('closeDropdownRequest', handleCloseDropdownRequest);
    });

    this.itemPlus.addClass('dropdown__item-plus_active');
    this.counter.each((i) => {
      if (this.counter.eq(i).html() > 0) {
        $('.js-dropdown__item-minus').eq(i).addClass('dropdown__item-minus_active');
      }
    });

    this.itemPlus.each((i, item) => {
      const handlePlusClick = () => {
        $(item).prev().html(parseInt($(item).prev().html(), 10) + 1);
        $(item).prev().prev().addClass('dropdown__item-minus_active');
        this.sumListItems();
      };

      $(item).on('click', handlePlusClick);
    });

    this.itemMinus.each((i, item) => {
      const handleMinusClick = () => {
        if ($(item).next().html() > 0) {
          $(item).next().html(parseInt($(item).next().html(), 10) - 1);
        }
        if ($(item).next().html() === '0') {
          $(item).removeClass('dropdown__item-minus_active');
        }
        this.sumListItems();
      };

      $(item).on('click', handleMinusClick);
    });
  }

  sumListItems() {
    this.dropdownGuests.each((i, item) => {
      const inputArray = [];
      let sum = 0;
      let guests = 0;
      $(item).find('.js-dropdown__item-count').each((j, count) => {
        sum += parseInt($(count).html(), 10);
        if (j < 2) {
          guests += parseInt($(count).html(), 10);
        }
      });
      const babies = parseInt($(item).find('.js-dropdown__item-count').eq(2).html(), 10);
      if (sum === 0) {
        $(item).find('.js-dropdown__input input').val('Сколько гостей');
      } else {
        if (guests === 1) {
          inputArray.push(`${guests} гость`);
        } else if (guests > 1 && guests < 5) {
          inputArray.push(`${guests} гостя`);
        } else if (guests >= 5) {
          inputArray.push(`${guests} гостей`);
        }

        if (babies === 1) {
          inputArray.push(`${babies} младенец`);
        } else if (babies > 1 && babies < 5) {
          inputArray.push(`${babies} младенца`);
        } else if (babies >= 5) {
          inputArray.push(`${babies} младенцев`);
        }

        $(item).find('.js-dropdown__input input').val(inputArray.join(', '));
      }

      if (sum > 0) {
        $(item).find('.js-dropdown__buttons-reset button').html('очистить');
      } else {
        $(item).find('.js-dropdown__buttons-reset button').html('');
      }

      const handleResetClick = () => {
        $(item).find('.js-dropdown__item-count').each((j, count) => {
          $(count).html('0');
          $(count).prev().removeClass('dropdown__item-minus_active');
          this.sumListItems();
        });
      };

      const handleApplyClick = () => {
        const dropdownItem = item;

        $(item).find('.js-dropdown__item-count').each((j, count) => {
          dropdownItem.querySelector('.js-dropdown__wrapper').style.borderRadius = '4px';
          $(item).find('.js-dropdown__list').slideUp();
        });
      };

      $(item).find('.js-dropdown__buttons-reset button').on('click', handleResetClick);

      $(item).find('.js-dropdown__buttons-apply button').on('click', handleApplyClick);
    });
    this.dropdownRoom.each((i, item) => {
      const bedrooms = parseInt($(item).find('.js-dropdown__item-count').eq(0).html(), 10);
      const beds = parseInt($(item).find('.js-dropdown__item-count').eq(1).html(), 10);
      const bathrooms = parseInt($(item).find('.js-dropdown__item-count').eq(2).html(), 10);
      const inputArray = [];

      let sum = 0;
      $(item).find('.js-dropdown__item-count').each((j, count) => {
        sum += parseInt($(count).html(), 10);
      });
      if (sum === 0) {
        $(item).find('.js-dropdown__input input').val('Сколько спален');
      } else {
        if (bedrooms === 1) {
          inputArray.push(`${bedrooms} спальня`);
        } else if (bedrooms > 1 && bedrooms < 5) {
          inputArray.push(`${bedrooms} спальни`);
        } else if (bedrooms >= 5) {
          inputArray.push(`${bedrooms} спален`);
        }

        if (beds === 1) {
          inputArray.push(`${beds} кровать`);
        } else if (beds > 1 && beds < 5) {
          inputArray.push(`${beds} кровати`);
        } else if (beds >= 5) {
          inputArray.push(`${beds} кроватей`);
        }

        if (bathrooms === 1) {
          inputArray.push(`${bathrooms} ванная`);
        } else if (bathrooms > 1 && bathrooms < 5) {
          inputArray.push(`${bathrooms} ванные`);
        } else if (bathrooms >= 5) {
          inputArray.push(`${bathrooms} ванных`);
        }

        $(item).find('.js-dropdown__input input').val(inputArray.join(', ').concat('...'));
      }

      if (sum > 0) {
        $(item).find('.js-dropdown__buttons-reset button').html('очистить');
      } else {
        $(item).find('.js-dropdown__buttons-reset button').html('');
      }

      const handleResetClick = () => {
        $(item).find('.js-dropdown__item-count').each((j, count) => {
          $(count).html('0');
          $(count).prev().removeClass('dropdown__item-minus_active');
          this.sumListItems();
        });
      };

      const handleApplyClick = () => {
        $(item).find('.js-dropdown__list').slideUp();
      };

      $(item).find('.js-dropdown__buttons-reset button').on('click', handleResetClick);

      $(item).find('.js-dropdown__buttons-apply button').on('click', handleApplyClick);
    });
  }

  initialize() {
    this.getElements();
    this.sumListItems();
    this.initializeDropdownEvents();
  }
}

export default Dropdown;
