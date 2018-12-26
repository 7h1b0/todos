import { h, Component } from 'preact';

export default class AddTodos extends Component {
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
          Label
          <input
            id="add"
            name="add"
            type="text"
            value={value}
            onChange={this.handleChange}
            placeholder="Enter todo label"
          />
        </label>
        <button class="submit" type="submit">
          Add todo
        </button>
      </form>
    );
  }
}
