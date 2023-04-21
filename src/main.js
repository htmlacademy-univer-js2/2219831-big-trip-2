import FilterView from './view/filter-view.js';
import { render } from './framework/framework/render.js';
import BoardPresenter from './presenter/board-presenter.js';
import PointsModel from './model/point-model.js';
import { generateFilter } from './mock/filter.js';
import { getPoints, getDestinations, getOffersByType } from './mock/point.js';


const siteMainElement = document.querySelector('.page-main');
const siteHeaderElement = document.querySelector('.trip-main');
const points = getPoints();
const offersByType = getOffersByType();
const destinations = getDestinations();

const pointsModel = new PointsModel();
pointsModel.init(points, destinations, offersByType);
const boardPresenter = new BoardPresenter(siteMainElement.querySelector('.trip-events'), pointsModel);
boardPresenter.init();
const filters = generateFilter(pointsModel.points);

render(new FilterView(filters), siteHeaderElement.querySelector('.trip-controls__filters'));

