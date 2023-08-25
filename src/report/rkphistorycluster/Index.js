import { useEffect, useState } from "react"
import { 
  Container,
} from 'react-bootstrap'
import { 
  Form,
  Select,
  Input,
  Row,
  Col,
  Table,
  Button,
  Spin,
  DatePicker,
  Empty 
} from 'antd'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import moment from 'moment'
import Headers from '../../header/Headers'
import PikYear from '../../components/pikYear/PikYear'
import PikItemGrp from '../../components/pikItemGrp/PikItemGrp'
import { rkpHistoryCluster, historyCluster } from '../../api/Api'
import { random_rgba, isOnlyNumberKey } from '../../help/Help'

const { Option } = Select
const { RangePicker } = DatePicker

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const Index = () => {
  const title = "Rekap History Cluster";
  const [itemgrp, setItemgrp] = useState([])
  const [resultReport, setResultReport] = useState([])
  const [resultDetail, setResultDetail] = useState([])
  const [form] = Form.useForm();
  
  const [data, setData] = useState({
    startdate: moment().subtract(30, 'days').format('YYYY-MM-DD'),
    enddate: moment().format('YYYY-MM-DD'),
    cluster: "2"
  })

  const initialValues = {periode: [moment().subtract(30, 'days'), moment()], cluster: '2'}

  const [cssData, setCssData] = useState({
    resultHeight: '200px',
    spinner: false
  })

  const setPeriode = (e) => {
    setData({
      ...data,
      startdate: e[0],
      enddate: e[1],
    })
  }

  const setValueItemgrp = (value) => {
    setData({
      ...data,
      itemgrp: value,
    })
  }

  const fetchReport = v => {
    const payload = {
      startdate: moment(v.periode[0]).format("YYYY-MM-DD"),
      enddate: moment(v.periode[1]).format("YYYY-MM-DD"),
      cluster: v.cluster
    }
    setCssData({
      ...setCssData,
      spinner: true
    })

    rkpHistoryCluster(payload).then(response => {
      setResultReport(response.data)
      setCssData({
        ...setCssData,
        resultHeight: 'auto',
        spinner: false
      })
    })
  }

  const fetchDetail = v => {
    console.log(v)
    const payload = {
      cluster_id: v
    }
    setCssData({
      ...setCssData,
      spinner: true
    })

    historyCluster(payload).then(response => {
      setResultDetail(response.data)
      setCssData({
        ...setCssData,
        spinner: false
      })
    })
  }

  const columns = [
    {
      title: 'No.',
      dataIndex: 'id',
      key: 'id',
      render: ((data,record,index) => {
        return index+1
      })
    },
    { 
      title: 'Tanggal',
      dataIndex: 'date',
      key: 'date',
      render: (data => {
        return moment(data).format('YYYY-MM-DD')
      })
    },
    {
      title: 'Jumlah Cluster',
      dataIndex: 'jumlah_cluster',
      key: 'jumlah_cluster',
      render: ((data, record) => {
        return <a onClick={v => fetchDetail(record.id)} style={{color: '#1890ff'}}>{data}</a>
      })
    },
    {
      title: 'Jumlah Data',
      dataIndex: 'count_data',
      key: 'count_data',
    },
    {
      title: 'Rata-rata Data',
      dataIndex: 'avg_data',
      key: 'avg_data',
      render: (data => {
        return Intl.NumberFormat().format(data)
      })
    },
  ]

  const labels = [
    'Jan', 
    'Feb', 
    'Mar', 
    'Apr', 
    'Mei', 
    'Jun', 
    'Jul', 
    'Ags', 
    'Sep', 
    'Okt', 
    'Nov', 
    'Des'
  ]

  const columnsDetail = [
    {
      title: 'No.',
      dataIndex: 'id',
      key: 'id',
      render: ((data,record,index) => {
        return index+1
      })
    },
    {
      title: 'Nama',
      dataIndex: 'nama',
      key: 'nama',
    },
    {
      title: 'Jan',
      dataIndex: 'jan',
      key: 'jan',
    },
    {
      title: 'Feb',
      dataIndex: 'feb',
      key: 'feb',
    },
    {
      title: 'Mar',
      dataIndex: 'mar',
      key: 'mar',
    },
    {
      title: 'Apr',
      dataIndex: 'apr',
      key: 'apr',
    },
    {
      title: 'Mei',
      dataIndex: 'mei',
      key: 'mei',
    },
    {
      title: 'Jun',
      dataIndex: 'jun',
      key: 'jun',
    },
    {
      title: 'Jul',
      dataIndex: 'jul',
      key: 'jul',
    },
    {
      title: 'Ags',
      dataIndex: 'ags',
      key: 'ags',
    },
    {
      title: 'Sep',
      dataIndex: 'sep',
      key: 'sep',
    },
    {
      title: 'Okt',
      dataIndex: 'okt',
      key: 'okt',
    },
    {
      title: 'Nov',
      dataIndex: 'nov',
      key: 'nov',
    },
    {
      title: 'Des',
      dataIndex: 'des',
      key: 'des',
    },
  ]

  return(
    <Spin tip="Loading...." spinning={cssData.spinner} size="large">
    <Container fluid>
      <Headers title={title} />
      <Row>
        <Col span={24}>
          <div style={{
            background: '#ffffff', 
            margin: '0px 18px', 
            padding: '10px 10px', 
            minHeight: '630px'
          }}>
            <div>
              <h3>{title}</h3>
            </div>
            <Form
              form={form}
              initialValues={initialValues}
              name="rkpHistoryCluster"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 24,
              }}
              layout="vertical"
              onFinish={fetchReport}
            >
              <Row gutter={16}>
                <Col className="gutter-row" span={6}>
                  <Form.Item
                    label="Periode"
                    name="periode"
                  >
                    <RangePicker 
                      format={'YYYY-MM-DD'}
                      onChange={(a) => setPeriode(a)}
                    />
                  </Form.Item>
                </Col>
                <Col className="gutter-row" span={6}>
                  <Form.Item
                    label="Jumlah Cluster"
                    name="cluster"
                    normalize={str => str.replace(/[^0-9]/g, '')}
                  >
                    <Input placeholder="Contoh: 2" onKeyPress={e => isOnlyNumberKey(e)}/>
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col className="gutter-row" span={12}>
                  <Button type="primary" size="default" htmlType="submit">Cari</Button>
                </Col>
              </Row>
            </Form>
            <br />
            <Row>
              <Col className="gutter-row" span={24}>
                <h4>Hasil</h4>
                <div style={{height: cssData.resultHeight}}>
                  <Table 
                    dataSource={resultReport} 
                    columns={columns} 
                    size="small" 
                    pagination={{defaultPageSize: 5}} 
                    rowKey="id" />
                </div>
              </Col>
            </Row>
            {
              resultDetail.length !== 0 
              ? 
                (
                  <Row>
                  <Col className="gutter-row" span={24}>
                    <h4>Detail History</h4>
                    <Row>
                      <h4>Tabel Cluster</h4>
                      <Col className="gutter-row" span={24}>
                        <div style={{height: cssData.resultHeight}}>
                          {
                            resultDetail.length !== 0
                            ?
                            (
                              resultDetail.map( (dataDetail, index) => {
                                return(
                                  <div>
                                    <h5>Cluster {index+1}</h5>
                                    <Table 
                                      dataSource={dataDetail} 
                                      columns={columnsDetail} 
                                      size="small" 
                                      pagination={{defaultPageSize: 5}}
                                      rowKey />
                                  </div>
                                )
                              })
                            )
                            : null
                          }
                        </div>
                      </Col>
                    </Row>
                  </Col>
                  <Col className="gutter-row" span={24}>
                    <h4>Grafik Cluster</h4>
                    <div style={{height: cssData.resultHeight}}>
                      { resultDetail.length !== 0
                        ?
                        resultDetail.map( (dataDetail, index) => {
                          const options = {
                            responsive: true,
                            plugins: {
                              legend: {
                                position: 'top',
                              },
                            },
                          };

                          let datasets = []
                          if (dataDetail.length !== 0) {
                              dataDetail.map( (datas, idx) => {
                                const color = random_rgba()
                                datasets.push({
                                  label: datas.nama,
                                  data: [
                                    datas.jan, 
                                    datas.feb, 
                                    datas.mar, 
                                    datas.apr, 
                                    datas.mei, 
                                    datas.jun, 
                                    datas.jul, 
                                    datas.ags, 
                                    datas.sep, 
                                    datas.okt, 
                                    datas.nov, 
                                    datas.des
                                  ],
                                  borderColor: color[0],
                                  backgroundColor: color[1],
                                })
                                return true
                              })
                          }

                          const data = {
                            labels,
                            datasets: datasets,
                          }
                          return (
                            <div>
                              <h5>Cluster {index+1}</h5>
                              {
                                dataDetail.length !== 0
                                ?
                                (<Line options={options} data={data} key={index}/>)
                                :
                                (<Empty description="Tidak ada data" />)
                              }    
                            </div>
                          )
                        })
                        : null
                      }
                    </div>
                  </Col>
                </Row>
                )
              : null
            }
          </div>
        </Col>
      </Row>
    </Container>
    </Spin>
  )
}

export default Index