import EditFormView from '../view/edit-form-view.js';
import EventsView from '../view/events-view.js';
import SortView from '../view/sort-view.js';
import PreviewPointView from '../view/preview-point-view.js';
import NoPointView from '../view/no-points-view.js';
import { render, replace } from '../framework/framework/render.js';

export default class BoardPresenter {
  #boardComponent = null;
  #boardContainer = null;
  #pointsModel = null;
  #boardPoints = null;
  #destinations = null;
  #offers = null;

  constructor(boardContainer) {
    this.#boardComponent = new EventsView();
    this.#boardContainer = boardContainer;
  }

  init(pointsModel) {
    this.#pointsModel = pointsModel;
    this.#boardPoints = [...this.#pointsModel.points];
    this.#destinations = [...this.#pointsModel.destinations];
    this.#offers = [...this.#pointsModel.offers];

    if (this.#boardPoints.length === 0) {
      render(new NoPointView(), this.#boardContainer);
    }
    else {
      render(new SortView(), this.#boardContainer);
      render(this.#boardComponent, this.#boardContainer);

      for (const point of this.#boardPoints){
        this.#renderPoint(point);
      }
    }
  }

  #renderPoint = (point) => {
    const previewPointComponent = new PreviewPointView(point, this.#destinations, this.#offers);
    const editingPointComponent = new EditFormView(point, this.#destinations, this.#offers);

    const replacePreviewPointToEditingPoint = () => {
      replace(editingPointComponent, previewPointComponent);
    };

    const replaceEditingPointToPreviewPoint = () => {
      replace(previewPointComponent, editingPointComponent);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceEditingPointToPreviewPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    const handleEditClick = () => {
      replacePreviewPointToEditingPoint();
      document.addEventListener('keydown', onEscKeyDown);
    };

    previewPointComponent.setEditClickHandler(handleEditClick);

    editingPointComponent.setPreviewClickHandler(() => {
      replaceEditingPointToPreviewPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    editingPointComponent.setFormSubmitHandler(() => {
      replaceEditingPointToPreviewPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(previewPointComponent, this.#boardComponent.element);
  };
}
