import React, {Component} from 'react';

import Task from './Task.jsx';

// App component - represents the whole app
export default class App extends Component {
  getTask() {
    return [
      {_id: 1, text: 'This is task 1'},
      {_id: 2, text: 'This is task 2'},
      {_id: 3, text: 'This is task 3'},
    ];
  }

  renderTasks() {
    return this.getTask().map((task) => (
      <Task key={task._id} task={task} />
    ));
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>MoreTODO</h1>
        </header>

        <ul>
          {this.renderTasks()}
        </ul>
      </div>
    );
  }
}
