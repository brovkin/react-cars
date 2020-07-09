import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Table, Divider } from 'antd';
import Error from '../Error/Error';
import {fetchData, changePage} from "../../redux/actions";
import './CarsTable.css';

class CarsTable extends Component {

  componentDidMount() {
    this.props.fetchData();
  }

  render() {

    const tableHeaders = [
      { title: 'VIN', dataIndex: 'vin', key: 'vin'},
      { title: 'Brand', dataIndex: 'brand', key: 'brand'},
      { title: 'Model', dataIndex: 'model', key: 'model'},
      { title: 'Grade', dataIndex: 'grade', key: 'grade'},
      { title: 'Dealer Name', dataIndex: 'dealer_title', key: 'dealer_title'},
      { title: 'Office Address', dataIndex: 'dealer_address', key: 'dealer_address'},
    ];

    const changePage = (page) => {
      this.props.changePage(page);
      this.props.fetchData();
    };

    const tableRender = () => {
      return this.props.data.length > 0
        ? <Table
          rowKey={item => item.vin}
          dataSource={this.props.data}
          columns={tableHeaders}
          loading={this.props.isLoading}
          showTotal={this.props.total}
          pagination={{
            pageSize: 10,
            total: this.props.total - 10, // bug
            showSizeChanger: false,
            onChange: (page) => changePage(page)
          }}
        />
        : null
    };

    return (
      <div className="app__container">
       <Divider orientation="left"><h3 className="app__title">Cars Table</h3></Divider>
        {this.props.isError ? <Error/> : null}
        {tableRender()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    counter: state.counter,
    currentPage: state.currentPage,
    isLoading: state.isLoading,
    isError: state.isError,
    data: state.data,
    total: state.total
  }
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: () => dispatch(fetchData()),
    changePage: (page) => dispatch(changePage(page))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CarsTable);

