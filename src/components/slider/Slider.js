import 'timurprh-range-slider/range-slider';
import 'timurprh-range-slider/range-slider.css';

class Slider {
  getElements() {
    this.$sliderWrapper = $('.js-slider__plugin');
    this.slider = document.querySelector('.slider');
    this.sliderResult = document.querySelector('.slider__result');
    this.currentValues = [];
  }

  updateResult() {
    this.sliderResult.innerHTML = `${Slider.separateThousand(this.currentValues[0])}₽ - ${Slider.separateThousand(this.currentValues[1])}₽`;
  }

  static separateThousand(x) {
    if (x >= 1000) {
      if (x % 1000 === 0) {
        return `${Math.floor(x / 1000)} 000`;
      }
      return `${Math.floor(x / 1000)} ${x % 1000}`;
    }
    return `${x}`;
  }

  initialize() {
    this.getElements();

    const fromAndToValuesHandler = (event, { inputVal, id }) => {
      const dataset = JSON.parse(this.slider.dataset.sliderValues);
      if (id === 0) {
        dataset.from = inputVal;
        this.currentValues[0] = inputVal;
      } else if (id === 1) {
        dataset.to = inputVal;
        this.currentValues[1] = inputVal;
      }
      this.slider.dataset.sliderValues = JSON.stringify(dataset);

      this.updateResult();
    };

    if (this.$sliderWrapper[0]) {
      const {
        min, max, step, from, to,
      } = JSON.parse(this.slider.dataset.sliderValues);

      this.$sliderWrapper.slider({
        range: true,
        vertical: false,
        scale: false,
        tip: false,
        bar: true,
        min,
        max,
        step,
        from,
        to,
      });

      const settings = this.$sliderWrapper.slider('getSettings');
      this.currentValues[0] = settings.from;
      this.currentValues[1] = settings.to;

      this.updateResult(this.currentValues[0], this.currentValues[1]);

      this.$sliderWrapper.on('moveThumbEvent', fromAndToValuesHandler.bind(this));
    }
  }
}

export default Slider;
