import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Table } from 'antd';
import './tableComp.css'


export default function TableComp(props) {

return(
  <Table  columns={props.columns} dataSource={props.data} pagination={{ pageSize: 10 }} />
)}