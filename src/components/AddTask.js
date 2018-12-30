import { h, Component } from 'preact';

export default class AddTask extends Component {
  state = { value: null };

  handleChange = e => {
    this.setState({ value: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit({
      title: this.state.value,
      date: Date.now(),
      category: this.props.categoryId,
    });
    this.setState({ value: null });
  };

  render(_, { value }) {
    return (
      <form onSubmit={this.handleSubmit}>
        <label for="add">
          Task Label
          <input
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
