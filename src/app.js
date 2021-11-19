const { board } = window.miro;
const e = React.createElement;

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    if (this.state.liked) {
      return "You liked this.";
    }

    return e(
      "button",
      { onClick: () => this.setState({ liked: true }) },
      "Like"
    );
  }
}
async function init() {
  const domContainer = document.querySelector("#like_button_container");
  ReactDOM.render(e(LikeButton),
    domContainer);
  const stickyNote = await board.createStickyNote({
    content: "Start",
  });

  await board.viewport.zoomTo(stickyNote);
}

init();
