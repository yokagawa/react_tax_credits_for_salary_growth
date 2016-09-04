import React from "react";
import ReactDOM from "react-dom";

export default class SalaryInputTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      salary_input_table: [
        { name: '山田 太郎', domestic: true, values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], bonus: 100, sum: 0 },
        { name: '田中 二郎', domestic: false, values: [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1], bonus: 200, sum: 0 }
      ]
    };
  }

  // 給与設定
  setSalary(row_index, value_index, change_value) {
    var salary_input_table = this.state.salary_input_table;
    salary_input_table[row_index].values[value_index] = change_value;
    salary_input_table[row_index].sum = this.calcSumSalary(this.state.salary_input_table[row_index]);
    this.setState({salary_input_table: salary_input_table});
  }

  // 賞与設定
  setBonus(row_index, change_value) {
    var salary_input_table = this.state.salary_input_table;
    salary_input_table[row_index].bonus = change_value;
    salary_input_table[row_index].sum = this.calcSumSalary(this.state.salary_input_table[row_index]);
    this.setState({salary_input_table: salary_input_table});
  }

  // 給与合計計算
  calcSumSalary(row) {
    var sum = 0;
    row.values.map((value) => {
        sum += Number(value)
    })
    return sum + Number(row.bonus);
  }

  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>名前</th>
            <th>国内雇用者</th>
            {[...Array(12)].map((x, i) => {
              return <th key={i}>{i + 1}月</th>;
            })}
            <th>賞与</th>
            <th>合計</th>
          </tr>
        </thead>
        <tbody>
          {this.state.salary_input_table.map((row, index) => {
            return <SalaryInputTableRow key={index} row_index={index} row={row} setSalary={this.setSalary.bind(this)} setBonus={this.setBonus.bind(this)} />;
          })}
        </tbody>
      </table>
    );
  }
}

class SalaryInputTableRow extends React.Component {
  // 給与変更
  onChangeSalary(value_index, e) {
    this.props.setSalary(this.props.row_index, value_index, e.target.value)
  }

  // 賞与変更
  onChangeBonus(e) {
    this.props.setBonus(this.props.row_index, e.target.value)
  }

  render() {
    return (
      <tr>
        <td>{this.props.row_index + 1}</td>
        <td>{this.props.row.name}</td>
        <td>{(this.props.row.domestic)? '該当' : '非該当'}</td>
        {this.props.row.values.map((value, index) => {
          return (
            <td key={index}>
              <input key={index} type="text" defaultValue={value} onChange={this.onChangeSalary.bind(this, index)}/>
            </td>
          )
        })}
        <td><input type="text" defaultValue={this.props.row.bonus} onChange={this.onChangeBonus.bind(this)} /></td>
        <td>{this.props.row.sum}</td>
      </tr>
    );
  }

}

ReactDOM.render(
  <SalaryInputTable />,
  document.getElementById("salary_input_table")
);