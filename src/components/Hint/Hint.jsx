import './Hint.scss';

import React, { Component } from 'react';

export class Hint extends Component {
  handleStore = () => {
    const { onStore } = this.props;
    onStore();
  };
  handleClose = () => {
    const { onClose } = this.props;
    onClose();
  };
  render() {
    return (
      <div className="hint-wrap">
        <p>Сохратить город?</p>
        <div>
          <span onClick={this.handleStore}>да</span>
          <span onClick={this.handleClose}>нет</span>
        </div>
      </div>
    );
  }
}
