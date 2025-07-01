import $ from 'jquery';

import LikeButton from './LikeButton';
import './like-button.scss';

$('.js-like-button').each((i, el) => new LikeButton(el));