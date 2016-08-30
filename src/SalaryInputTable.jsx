import React from "react";
import ReactDOM from "react-dom";

export default class SalaryInputTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      salary_input_table: [
        { sum: 3, values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
        { sum: 7, values: [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1] }
      ]
    };
  }

  setSalary(row_index, value_index, change_value) {
    var salary_input_table = this.state.salary_input_table;
    var sum = 0;
    salary_input_table[row_index].values[value_index] = change_value;
    this.state.salary_input_table[row_index].values.map((value) => {
        sum += Number(value)
    })
    salary_input_table[row_index].sum = sum
    this.setState({salary_input_table: salary_input_table});
  }

  render() {
    var month = new Array(12);
    // var month = [...array, 4, 5, 6];
    return (
      <table>
        <thead>
          <tr>{month.map((m, v) => { return (<th>{m + 1}</th>) })}</tr>
        </thead>
        <tbody>
          {this.state.salary_input_table.map((row, index) => {
            return <SalaryInputTableRow key={index} row_index={index} row={row} setSalary={this.setSalary.bind(this)} />;
          })}
        </tbody>
      </table>
    );
  }
}

class SalaryInputTableRow extends React.Component {
  onChangeSalary(value_index, e) {
    this.props.setSalary(this.props.row_index, value_index, e.target.value)
  }

  render() {
    return (
      <tr>
        {this.props.row.values.map((value, index) => {
          return (
            <td key={index}>
              <input key={index} type="text" defaultValue={value} onChange={this.onChangeSalary.bind(this, index)}/>
            </td>
          )
        })}
        <td>{this.props.row.sum}</td>
      </tr>
    );
  }

}

ReactDOM.render(
  <SalaryInputTable />,
  document.getElementById("salary_input_table")
);