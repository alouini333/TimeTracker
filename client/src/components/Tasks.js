import React from 'react';
import { Table, Input, Button, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import moment from 'moment';
import axios from 'axios';


class Tasks extends React.Component {
  state = {
    searchText: '',
    searchedColumn: '',
    tasks: []
  };


  componentDidMount = () => {
    const API_URL = process.env.REACT_APP_API_URL;
    axios.get(`${API_URL}/tasks`)
        .then(res => res.data)
        .then(data => this.setState({tasks: data}));

  }
  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex] ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()) : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  humanaizeDuration = secs => {
    if (secs === 0) {
        return `0 seconds`;
    }
    const hours = Math.floor(secs / 3600);
    const minutes = Math.floor((secs%3600) / 60);
    const seconds = secs - hours*3600 - minutes*60;
    return `${hours > 0 ? ((minutes > 0 || seconds > 0 ) ? hours+' hour(s), ' : hours+ ' hour(s)') : ''} ${minutes >0 ? ((seconds > 0) ?  minutes+' minute(s), ': minutes + ' minutes ') : '' } ${seconds > 0 ? seconds+' seconds' : ''}`;

}
  render() {
    const columns = [
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        width: '30%',
        ...this.getColumnSearchProps('description'),
      },
      {
        title: 'Duration',
        dataIndex: 'duration',
        key: 'duration',
        render: (text, record) => (<p>{this.humanaizeDuration(record.duration)}</p>)
      },
      {
        title: 'End date',
        dataIndex: 'endDate',
        filters: [
            { text: 'Today', value: moment().format('YYYY-MM-DD') },
            { text: 'Last week', value: moment().subtract('weeks', 1).format('YYYY-MM-DD') },
            { text: 'Last month', value: moment().subtract('months', 1).format('YYYY-MM-DD') },
        ],
        onFilter: (value, record) => moment(record.endDate).isAfter(value),
        sorter: (a, b) => moment(a.endDate).unix() - moment(b.endDate).unix(),
        key: 'endDate',
        render: (text, record) => (<p>{moment(record.endDate).format('YYYY-MM-DD HH:mm')}</p>)
      },
      {
        title: 'Estimated start Date',
        key:'estimated_start',
        render: (text, record) => {
            if (record.duration === 0) {
                return <p>It is not possible to guess the start date</p>
            } else {
                const endDate = moment(record.endDate);
                const startDate = endDate.subtract('seconds', record.duration);
            return <p>{startDate.format('YYYY-MM-DD HH:mm')}</p>
            }
        }
      }

    ];
    return (
      <div className="center-text">
      <h2>List of tasks</h2>
    <Table columns={columns} dataSource={this.state.tasks} />
    </div>);
  }
}

export default Tasks;