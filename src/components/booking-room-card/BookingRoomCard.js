class BookingRoomCard {
  getElements() {
    this.prices = document.querySelectorAll('.js-booking-room-card__item-price');
    this.descriptions = document.querySelectorAll('.js-booking-room-card__item-description');
    this.sumText = document.querySelector('.js-booking-room-card__sum-text');
    this.sumNumber = document.querySelector('.js-booking-room-card__sum-number');
    this.sumLine = document.querySelector('.js-booking-room-card__sum-line');
  }

  calculateSum() {
    let sum = 0;
    let discount = 0;
    let sumHigh;
    let sumLow;

    this.prices.forEach((price) => {
      sum += parseInt(price.innerHTML.replace(/&nbsp;/g, ''), 10);
    });

    this.descriptions.forEach((description) => {
      const discountIndex = description.innerHTML.indexOf('скидка');
      if (discountIndex !== -1) {
        const discountIndexEnd = description.innerHTML.indexOf('₽', discountIndex);
        discount += parseInt(description.innerHTML.slice(discountIndex + 7, discountIndexEnd).replace(/&nbsp;/g, ''), 10);
      }
    });

    if (discount < sum) {
      sum -= discount;
    }

    if (Math.trunc(sum / 1000) === 0) {
      sumHigh = '';
    } else {
      sumHigh = `${Math.trunc(sum / 1000)} `;
    }

    if (sum >= 1000) {
      sumLow = sum % 1000;
    } else {
      sumLow = sum;
    }

    if (sumHigh && sumLow === 0) {
      sumLow = '000';
    } else if (sumHigh && sumLow < 10) {
      sumLow = `00${sumLow}`;
    } else if (sumHigh && sumLow < 100) {
      sumLow = `0${sumLow}`;
    }

    return { sumLow, sumHigh };
  }

  setLineWidth() {
    this.sumLine.style.width = `${(this.sumNumber.offsetLeft + this.sumNumber.clientLeft - this.sumText.offsetLeft - this.sumText.clientLeft - this.sumText.offsetWidth)}px`;
  }

  initialize() {
    this.getElements();

    if (!this.prices[0]) {
      return;
    }

    const sumObject = this.calculateSum();

    this.sumNumber.innerHTML = `${sumObject.sumHigh} ${sumObject.sumLow}₽`;

    if (this.sumLine && this.sumNumber && this.sumText) {
      this.setLineWidth();
    } else {
      console.warn('One or more required elements are missing');
    }

    if (this.prices.length) {
      window.addEventListener("resize", this.setLineWidth.bind(this));
      window.addEventListener("orientationchange", this.setLineWidth.bind(this));
    }
  }
}

export default BookingRoomCard;
