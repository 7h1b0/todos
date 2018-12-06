import { h, Component } from 'preact';
import { TODO } from '../status';

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
      category: TODO.id,
    });
    this.setState({ value: null });
  };

  render({ title, autoFocus = false }, { value }) {
    return (
      <form onSubmit={this.handleSubmit}>
        <label for="add">
          <input
            id="add"
            name="add"
            type="text"
            value={value}
            onChange={this.handleChange}
            autoFocus={autoFocus}
            placeholder={title}
          />
        </label>
        <button class="submit" type="submit">
          +
        </button>
      </form>
    );
  }
}
