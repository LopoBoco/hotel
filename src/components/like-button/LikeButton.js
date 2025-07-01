import $ from 'jquery';

const ICON = '.js-like-button__icon';
const COUNT = '.js-like-button__count';

class LikeButton {
  constructor(nodeElem) {
    this.$likeButton = $(nodeElem);
    this.init();
  }

  init() {
    this.$icon = this.$likeButton.find(ICON);
    this.$count = this.$likeButton.find(COUNT);
    this._bindEventListener();
  }

  _bindEventListener() {
    this._handleLikeButtonClick = this._handleLikeButtonClick.bind(this);
    this.$likeButton.on('click', this._handleLikeButtonClick);
  }

  _handleLikeButtonClick() {
    if (this.isLike) {
      this._unlike();
    } else {
      this._like();
    }
  }

  _unlike() {
    this.$likeButton.removeClass('like-button_liked');
    this.$icon.text('favorite_border');
    this.$count.text(+this.$count.text() - 1);
  }

  _like() {
    this.$likeButton.addClass('like-button_liked');
    this.$icon.text('favorite');
    this.$count.text(+this.$count.text() + 1);
  }

  get isLike() {
    return this.$likeButton.hasClass('like-button_liked');
  }
}

export default LikeButton;