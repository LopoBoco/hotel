class Header {
  getElements() {
    this.wrapper = document.querySelector('.js-header__wrapper');
    this.hamburger = document.querySelector('.js-header__hamburger');

    this.arrows = document.querySelectorAll('.js-header__list-arrow');
    this.arrow = document.querySelector('.js-header__list-arrow');
  }

  initialize() {
    this.getElements();

    const handleHamburgerClick = () => {
      this.hamburger.classList.toggle('header__hamburger_active');
      if (this.wrapper.style.left === '0%') {
        this.wrapper.style.left = '-100%';
      } else {
        this.wrapper.style.left = '0%';
      }
    };

    if (this.hamburger) {
      this.hamburger.addEventListener('click', handleHamburgerClick);
    }

    const handleHeaderArrowClick = (e) => {
      $(e.target.parentNode.nextElementSibling).slideToggle();
    };

    if (this.arrow) {
      this.arrows.forEach((arrow) => {
        arrow.addEventListener('click', handleHeaderArrowClick);
        arrow.previousElementSibling.addEventListener('click', handleHeaderArrowClick);
      });
    }
  }
}

export default Header;
