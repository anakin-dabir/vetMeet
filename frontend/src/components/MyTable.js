import { Table } from "antd";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    width: 150,
  },
  {
    title: "Age",
    dataIndex: "age",
    width: 150,
  },
  {
    title: "Address",
    dataIndex: "address",
  },
];

const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: `Lane Light ${i}`,
    age: 32,
    address: `Lahore, VC house ${i}`,
  });
}

export default () => (
  <Table columns={columns} dataSource={data} pagination={{ pageSize: 50 }} scroll={{ y: 240 }} />
);
