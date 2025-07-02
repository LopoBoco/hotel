import 'slick-carousel/slick/slick.min';
import 'slick-carousel/slick/slick.scss';

class RoomDetails {
  toggleSlider() {
    if (document.documentElement.clientWidth <= 768 && !this.carousel.hasClass('slick-initialized')) {
      this.carousel.slick(this.sliderSettings);
    }
    if (document.documentElement.clientWidth > 768 && this.carousel.hasClass('slick-initialized')) {
      this.carousel.slick('unslick');
    }
  }

  initialize() {
    this.carousel = $('.js-room-details__photos');

    this.sliderSettings = {
      arrows: false,
      dots: false,
      infinite: true,
      slidesToShow: 1,
    };

    const handleResizeWindow = () => {
      this.toggleSlider();
    };

    this.toggleSlider();

    $(window).on('resize', handleResizeWindow);
  }
}

export default RoomDetails;
