import FilterView from './view/filter-view.js';
import {render} from './render.js';
import BoardPresenter from './presenter/board-presenter.js';

const siteMainElement = document.querySelector('.page-main');
const siteHeaderElement = document.querySelector('.trip-main');
const boardPresenter = new BoardPresenter();

render(new FilterView(), siteHeaderElement.querySelector('.trip-controls__filters'));

boardPresenter.init(siteMainElement.querySelector('.trip-events'));
