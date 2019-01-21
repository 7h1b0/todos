import { h, Component } from 'preact';
import { connect } from 'unistore/preact';
import { addTask, closeModal } from 'utils/actions';

class AddTask extends Component {
  input = null;
  state = { value: null };

  setInputRef = ref => {
    this.input = ref;
  };

  componentDidMount() {
    if (this.input != null) {
      this.input.focus();
    }
  }

  handleChange = e => {
    this.setState({ value: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { addTask, closeModal, statusId } = this.props;
    closeModal();
    addTask({
      title: this.state.value,
      date: Date.now(),
      statusId,
    });
    this.setState({ value: null });
  };

  render(_, { value }) {
    return (
      <form onSubmit={this.handleSubmit}>
        <label for="add">
          Task Label
          <input
            ref={this.setInputRef}
            id="add"
            name="add"
            type="text"
            value={value}
            onChange={this.handleChange}
            placeholder="Enter task label"
          />
        </label>
        <button class="submit" type="submit">
          ADD TASK
        </button>
      </form>
    );
  }
}

export default connect(
  'statusId',
  { addTask, closeModal },
)(AddTask);
