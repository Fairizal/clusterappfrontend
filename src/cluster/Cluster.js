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
import Headers from '../header/Headers'
import PikYear from '../components/pikYear/PikYear'
import PikItemGrp from '../components/pikItemGrp/PikItemGrp'
import { itemgroup, clusterdtw } from '../api/Api'
import { random_rgba, isOnlyNumberKey } from '../help/Help'
import Plot from 'react-plotly.js';

const { Option } = Select
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const Cluster = () => {
  const title = "Cluster";
  const [itemgrp, setItemgrp] = useState([])
  const [resultCluster, setResultCluster] = useState([])
  // const [dataGrafik, setDataGrafik] = useState()
  const [formInstance] = Form.useForm()

  useEffect(() => {
    itemgroup().then(response => setItemgrp(response))
  }, [])

  const [data, setData] = useState({
    tahun: '2020',
    showTahun: true,
  })

  const initialValues = {year: '2020', cluster: '2'}

  const [cssData, setCssData] = useState({
    resultHeight: '200px',
    spinner: false
  })

  const setShowTahun = () => {
    setData({
      ...data,
      tahun: '2020',
      showTahun: true
    })
  }

  const setTahun = (value) => {
    setData({
      ...data,
      tahun: value,
    })
  }

  const fetchDataCluster = v => {
    setCssData({
      ...setCssData,
      spinner: true
    })
    setResultCluster([])

    // console.log(v)
    clusterdtw(v).then(response => {
      setResultCluster(response)
      setCssData({
        ...setCssData,
        resultHeight: 'auto',
        spinner: false
      })
    })
  }

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
    'Des']

  const columns = [
    {
      title: 'Nama',
      dataIndex: 'nama',
      key: 'nama',
    },
    // {
    //   title: 'Jan',
    //   dataIndex: 'jan',
    //   key: 'jan',
    // },
    // {
    //   title: 'Feb',
    //   dataIndex: 'feb',
    //   key: 'feb',
    // },
    // {
    //   title: 'Mar',
    //   dataIndex: 'mar',
    //   key: 'mar',
    // },
    // {
    //   title: 'Apr',
    //   dataIndex: 'apr',
    //   key: 'apr',
    // },
    // {
    //   title: 'Mei',
    //   dataIndex: 'mei',
    //   key: 'mei',
    // },
    // {
    //   title: 'Jun',
    //   dataIndex: 'jun',
    //   key: 'jun',
    // },
    // {
    //   title: 'Jul',
    //   dataIndex: 'jul',
    //   key: 'jul',
    // },
    // {
    //   title: 'Ags',
    //   dataIndex: 'ags',
    //   key: 'ags',
    // },
    // {
    //   title: 'Sep',
    //   dataIndex: 'sep',
    //   key: 'sep',
    // },
    // {
    //   title: 'Okt',
    //   dataIndex: 'okt',
    //   key: 'okt',
    // },
    // {
    //   title: 'Nov',
    //   dataIndex: 'nov',
    //   key: 'nov',
    // },
    // {
    //   title: 'Des',
    //   dataIndex: 'des',
    //   key: 'des',
    // },
  ]


  // let dataGrafik = []
  // let layout = {
  //   // xaxis: {
  //   //   range: [ -0.5, 1.5 ]
  //   // },
  //   // yaxis: {
  //   //   range: [-0.5, 1.5]
  //   // },
  //   width:1200,
  //   height:600,
  //   title:'Trend Penjualan'
  // }

  // if (resultCluster.length !== 0) {
  //   resultCluster.map( (dataCluster, index) => {
  //     const i = index + 1
  //     const cluster = {
  //       x: dataCluster[1],
  //       y: dataCluster[2],
  //       mode: 'markers',
  //       type: 'scatter',
  //       name: 'Cluster'+i,
  //       text: dataCluster[0].map(data => data.nama),
  //       marker: { size: 5 }
  //     };
  //     dataGrafik.push(cluster)
  //   // console.log(dataGrafik)
  //     return true
  //   })    
  // }  
  // console.log(dataGrafik)
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
              <p>Membuat Cluster dari data Penjualan</p>
            </div>
            <Form
              form={formInstance}
              initialValues={initialValues}
              name="dataset"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 24,
              }}
              layout="vertical"
              onFinish={fetchDataCluster}
              requiredMark={false}
            >
              <Row gutter={16}>
                <Col className="gutter-row" span={6}>
                  {
                    data.showTahun === true ?
                    (
                      <Form.Item
                        label="Tahun"
                        name="year"
                      >
                        <PikYear />
                      </Form.Item>
                    ) : null
                  }
                </Col>
                <Col className="gutter-row" span={6}>
                  <Form.Item
                    label="Kategori Item"
                    name="itemgrp"
                  >
                    <PikItemGrp data={itemgrp} />
                  </Form.Item>
                </Col>
                <Col className="gutter-row" span={6}>
                  <Form.Item
                    label="Jumlah Cluster"
                    name="cluster"
                    normalize={str => str.replace(/[^0-9]/g, '')}
                    rules={[
                      {
                        required: true,
                        message: 'Jumlah cluster tidak boleh kosong',
                      },
                    ]}
                  >
                    <Input placeholder="Contoh: 2" onKeyPress={e => isOnlyNumberKey(e)}/>
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col className="gutter-row" span={6}>
                  <Button type="primary" size="default" htmlType="submit">Cluster</Button>
                </Col>
              </Row>
            </Form>
            <br />
            <h4>Hasil</h4>
            <Row>
              <Col className="gutter-row" span={24}>
                <h4>Tabel Cluster</h4>
                <div style={{height: cssData.resultHeight}}>
                  {
                    resultCluster.length !== 0
                    ?
                    (
                      resultCluster.map( (dataCluster, index) => {
                        return(
                          <div>
                            <h5>Cluster {index+1}</h5>
                            <Table 
                              dataSource={dataCluster} 
                              columns={columns} 
                              size="small" 
                              pagination={{defaultPageSize: 5}}
                              rowKey />
                          </div>
                        )
                      })
                    )
                    : <Empty description="Tidak ada data" />
                  }

                  {/*{
                    resultCluster.length !== 0
                    ?
                    (
                      resultCluster.map( (dataCluster, index) => {
                        return(
                          <div>
                            <h5>Cluster {index+1}</h5>
                            <Table 
                              dataSource={dataCluster[0]} 
                              columns={columns} 
                              size="small" 
                              pagination={{defaultPageSize: 5}}
                              rowKey />
                          </div>
                        )
                      })
                    )
                    : <Empty description="Tidak ada data" />
                  }*/}
                </div>
              </Col>
            </Row>
            <Row>
              <Col className="gutter-row" span={24}>
                <h4>Grafik Cluster</h4>
                <div style={{height: cssData.resultHeight}}>
                  { resultCluster.length !== 0
                    ?
                    resultCluster.map( (dataCluster, index) => {
                      const options = {
                        responsive: true,
                        plugins: {
                          legend: {
                            position: 'top',
                          },
                        },
                        scales: {
                          y: {
                            min: -1,
                            max: 2,
                          }
                        }
                      };

                      let datasets = []
                      if (dataCluster.length !== 0) {
                          dataCluster.map( (datas, idx) => {
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
                              backgroundColor: color[0],
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
                          <Line options={options} data={data} key={index}/>
                        </div>
                      )
                    })
                    : <Empty description="Tidak ada data" />
                  }
                  {/*{ 
                    resultCluster.length !== 0
                    ?
                    (
                      <div>    
                        <Plot
                          data={dataGrafik}
                          layout={layout}
                        />
                      </div>
                    )
                    
                    : <Empty description="Tidak ada data" />
                  }*/}
                </div>
              </Col>
            </Row>
            </div>
        </Col>
      </Row>
    </Container>
    </Spin>
  )
}

export default Cluster