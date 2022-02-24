const appRoot = document.getElementById('app-root');
const modalRoot = document.getElementById('modal-root');


class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount() {
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }
  
  render() {
    return ReactDOM.createPortal(
      this.props.children,
      this.el,
    );
  }
};


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showModal: false};
    
    this.handleShow = this.handleShow.bind(this);
    this.handleHide = this.handleHide.bind(this);
  }

  handleShow() {
    this.setState({showModal: true});
  }
  
  handleHide() {
    this.setState({showModal: false});
  }

  render() {
    const modal = this.state.showModal ? (
      <Modal>
        <div className="modal">
          <div>
            Are you sure?
          </div>
          <button onClick={this.handleHide}>Yes</button>
        </div>
      </Modal>
    ) : null;

    return (
      <div className="app">
      {/* Show modal */}
        <button onClick={this.handleShow}></button>
        {modal}
      </div>
    );
  }
}

ReactDOM.render(<App />, appRoot);