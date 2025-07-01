import 'slick-carousel/slick/slick.min';
import 'slick-carousel/slick/slick.scss';

class RoomCard {
  initialize() {
    this.roomCards = document.querySelectorAll('.js-room-card');

    this.roomCards.forEach((card) => {
      $(card).find('.js-room-card__carousel').slick({
        arrows: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        lazyLoad: 'ondemand',
      });

      const handlePreviousClick = () => {
        $(card).find('.js-room-card__carousel').slick('slickPrev');
      };

      const handleNextClick = () => {
        $(card).find('.js-room-card__carousel').slick('slickNext');
      };

      card.querySelector('.js-room-card__photos-previous').addEventListener('click', handlePreviousClick);

      card.querySelector('.js-room-card__photos-next').addEventListener('click', handleNextClick);

      let changeSlideFlag = true;

      const handleCarouselChange = () => {
        card.querySelectorAll('.js-room-card__photos-dot').forEach((dot) => {
          dot.classList.remove('room-card__photos-dot_active');
        });
        card.querySelectorAll('.js-room-card__photos-dot')[$(card).find('.js-room-card__carousel').slick('slickCurrentSlide')].classList.add('room-card__photos-dot_active');
        changeSlideFlag = true;
      };

      card.querySelectorAll('.js-room-card__photos-dot').forEach((dot, index) => {
        const handleDotClick = () => {
          if (changeSlideFlag) {
            $(card).find('.js-room-card__carousel').slick('slickGoTo', index);
            changeSlideFlag = false;
          }
        };

        dot.addEventListener('click', handleDotClick);
      });

      $(card).find('.js-room-card__carousel').on('afterChange', handleCarouselChange);
    });
  }
}

export default RoomCard;
