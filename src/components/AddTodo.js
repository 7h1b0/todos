import { h, Component } from 'preact';

export default class AddTodos extends Component {
  state = { value: null };

  handleChange = e => {
    this.setState({ value: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit({ title: this.state.value, date: Date.now() });
    this.setState({ value: null });
  };

  render({ title, autoFocus = false }, { value }) {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          id={title}
          name={title}
          type="text"
          value={value}
          onChange={this.handleChange}
          autoFocus={autoFocus}
          placeholder={title}
        />
        <button class="submit" type="submit">
          +
        </button>
      </form>
    );
  }
}
