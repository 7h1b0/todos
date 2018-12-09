import { h, Component } from 'preact';
import { formatDate, diffByDay, getClassByDiffDay } from 'utils/utils';

export default class Todo extends Component {
  shouldComponentUpdate({ title, date }) {
    return title !== this.props.title || date !== this.props.date;
  }

  render({ id, title, date, onDelete, onDragStart }) {
    return (
      <div class="todo" draggable onDragStart={onDragStart(id)}>
        <div class={getClassByDiffDay(diffByDay(date))}>
          <p class="title">{title}</p>
          <p class="caption">Added on: {formatDate(date)}</p>
        </div>
        <button class="delete" onClick={onDelete(id)} />
      </div>
    );
  }
}
