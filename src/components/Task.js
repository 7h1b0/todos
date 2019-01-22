import { h, Component } from 'preact';
import { connect } from 'unistore/preact';
import { removeTask } from 'reducers';
import { formatDate, diffByDay, getClassByDiffDay } from 'utils/utils';

class Task extends Component {
  taskRef = null;
  state = {
    dragging: false,
  };

  setTaskRef = el => {
    this.taskRef = el;
  };

  shouldComponentUpdate({ title, date }, { dragging }) {
    return (
      title !== this.props.title ||
      date !== this.props.date ||
      dragging !== this.state.dragging
    );
  }

  handleDrag = e => {
    const { id } = this.props;
    this.setState({ dragging: true });
    e.dataTransfer.setData('taskId', JSON.stringify({ id }));
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.dropEffect = 'move';
  };

  handleDragEnd = () => {
    this.setState({ dragging: false });
  };

  handleRemove = () => {
    this.props.removeTask(this.props.id);
  };

  render({ title, date }, { dragging }) {
    const className = dragging ? 'task dragging' : 'task';
    return (
      <div
        ref={this.setTaskRef}
        class={className}
        draggable
        onDragStart={this.handleDrag}
        onDragEnd={this.handleDragEnd}
      >
        <div class={getClassByDiffDay(diffByDay(date))}>
          <p class="title">{title}</p>
          <p class="caption">Added on: {formatDate(date)}</p>
        </div>
        <button class="delete" onClick={this.handleRemove} />
      </div>
    );
  }
}

export default connect(
  undefined,
  { removeTask },
)(Task);
