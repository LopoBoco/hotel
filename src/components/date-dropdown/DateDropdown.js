import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';

class DateDropdown {
  getElements() {
    this.dropdownDateSplit = $('.js-date-dropdown_split');
    this.dropdownDateSplitId = [];
    this.dropdownDateFilter = $('.js-date-dropdown_filter');
    this.dropdownDateFilterId = [];

    $(this.dropdownDateSplit).each((i, item) => {
      this.dropdownDateSplitId.push(item.id);
    });
    $(this.dropdownDateFilter).each((i, item) => {
      this.dropdownDateFilterId.push(item.id);
    });
  }

  initializeDatePickers() {
    this.airDatepickerSplit = [];
    this.airDatepickerFilter = [];

    function handleOnSelectDatepicker(elem) {
      const inputVal = $(elem).find('.js-date-dropdown__calendar-input').val();
      const comma = inputVal.indexOf(',');

      if ($(elem).hasClass('js-date-dropdown_split')) {
        if (comma === -1) {
          $(elem).find('[data-date="from"]').val(inputVal);
          $(elem).find('[data-date="to"]').val('');
        } else {
          $(elem).find('[data-date="from"]').val(inputVal.slice(0, comma));
          $(elem).find('[data-date="to"]').val(inputVal.slice(comma + 2));
        }
      }

      if ($(elem).find('input').val()) {
        $(elem).find('.js-date-dropdown__buttons-reset button').html('очистить');
      } else {
        $(elem).find('.js-date-dropdown__buttons-reset button').html('');
      }
    }

    $(this.dropdownDateSplit).each((i, item) => {
      this.airDatepickerSplit.push(new AirDatepicker(`#${this.dropdownDateSplitId[i]} .js-date-dropdown__calendar-input`, {
        inline: true,
        minDate: new Date(),
        navTitles: {
          days: 'MMMM yyyy',
        },
        prevHtml: '<div class="date-dropdown__previous-arrow">'
          + '<div class="date-dropdown__previous-arrow-line"></div>'
          + '<div class="date-dropdown__previous-arrow-line"></div>'
          + '</div>',
        nextHtml: '<div class="date-dropdown__next-arrow">'
          + '<div class="date-dropdown__next-arrow-line"></div>'
          + '<div class="date-dropdown__next-arrow-line"></div>'
          + '</div>',
        range: true,
        onSelect() {
          handleOnSelectDatepicker(item);
        },
      }));
    });

    $(this.dropdownDateFilter).each((i, item) => {
      this.airDatepickerFilter.push(new AirDatepicker(`#${this.dropdownDateFilterId[i]} .date-dropdown__calendar-input`, {
        inline: true,
        minDate: new Date(),
        locale: {
          monthsShort: ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'],
        },
        navTitles: {
          days: 'MMMM yyyy',
        },
        dateFormat: 'd MMM',
        multipleDatesSeparator: ' - ',
        prevHtml: '<div class="date-dropdown__previous-arrow">'
          + '<div class="date-dropdown__previous-arrow-line"></div>'
          + '<div class="date-dropdown__previous-arrow-line"></div>'
          + '</div>',
        nextHtml: '<div class="date-dropdown__next-arrow">'
          + '<div class="date-dropdown__next-arrow-line"></div>'
          + '<div class="date-dropdown__next-arrow-line"></div>'
          + '</div>',
        range: true,
        onSelect() {
          handleOnSelectDatepicker(item);
        },
      }));
    });
  }

  initialize() {
    this.getElements();
    this.initializeDatePickers();

    function dropdownDateInit(elem, datePicker, id) {
      const $elem = $(elem);
      const handleArrowClick = (e) => {
        const $html = $('html');

        $elem.find('.js-date-dropdown__list').slideToggle();
        $html.trigger('closeDropdownRequest', { target: undefined });

        $html.find('.js-date-dropdown__list').each((i, list) => {
          if (e.target.closest('.js-date-dropdown') !== list.closest('.js-date-dropdown')) {
            $(list).slideUp(0);
          }
        });
      };
      const handleApplyClick = () => {
        $elem.find('.js-date-dropdown__list').slideUp();
      };
      const handleResetClick = () => {
        $elem.find('.js-date-dropdown__calendar-input').val('');
        datePicker.clear();
      };

      $elem.find('.air-datepicker').appendTo(`#${id} .js-date-dropdown__calendar`);

      $elem.find('.js-date-dropdown__arrow').on('click', handleArrowClick);
      $elem.find('.js-date-dropdown__buttons-apply button').on('click', handleApplyClick);
      $elem.find('.js-date-dropdown__buttons-reset button').on('click', handleResetClick);
    }

    if (this.dropdownDateSplit) {
      $(this.dropdownDateSplit).each((i, item) => {
        dropdownDateInit($(item), this.airDatepickerSplit[i], this.dropdownDateSplitId[i]);
      });
    }
    if (this.dropdownDateFilter) {
      $(this.dropdownDateFilter).each((i, item) => {
        dropdownDateInit($(item), this.airDatepickerFilter[i], this.dropdownDateFilterId[i]);
      });
    }

    function handleOutsideClick(e) {
      function isClickOutsideCalendar(element) {
        return (!e.target.closest('.js-date-dropdown_filter') && !e.target.closest('.js-date-dropdown_split') && !e.target.classList.contains('air-datepicker-cell'));
      }

      if (isClickOutsideCalendar(e.target)) {
        $('html').find('.js-date-dropdown__list').each((i, list) => {
          $(list).slideUp();
        });
      }
    }

    $('html').on('click', handleOutsideClick);
  }
}

export default DateDropdown;
