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
  DatePicker 
} from 'antd'

import moment from 'moment'

import Headers from '../../header/Headers'
import PikYear from '../../components/pikYear/PikYear'
import PikItemGrp from '../../components/pikItemGrp/PikItemGrp'
import { rkpCluster } from '../../api/Api'
import { isOnlyNumberKey } from '../../help/Help'
import PdfDesain from './PdfDesain'

const { Option } = Select
const { RangePicker } = DatePicker

const Index = () => {
  const title = "Rekap Jumlah Cluster";
  const [itemgrp, setItemgrp] = useState([])
  const [resultDatasets, setResultDatasets] = useState([])

  // useEffect(() => {
  //   itemgroup().then(response => setItemgrp(response))
  // }, [])
  const [form] = Form.useForm();
  
  const [data, setData] = useState({
    // range: '1',

    startdate: moment().subtract(30, 'days').format('YYYY-MM-DD'),
    enddate: moment().format('YYYY-MM-DD'),
    // bulan: 'jan',
    // showTahun: true,
    // itemgrp: null,
    // showBulan: true
    cluster: "3"
  })

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

  const fetchDatasets = () => {
    setCssData({
      ...setCssData,
      spinner: true
    })
    console.log(data)
    rkpCluster(data).then(response => {
      console.log(response)
      setResultDatasets(response)
      setCssData({
        ...setCssData,
        resultHeight: 'auto',
        spinner: false
      })
    })
  }

  const columns = [
    {
      title: 'No.',
      dataIndex: 'id',
      key: 'id',
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
      dataIndex: 'jumlah',
      key: 'jumlah',
    },
  ];

  return(
    <Spin tip="Loading...." spinning={cssData.spinner} size="large">
    <Container fluid>
      <Headers title={title} />
      <Row>
        <Col span={24}>
          <div style={{background: '#ffffff', margin: '0px 18px', padding: '10px 10px', minHeight: '630px'}}>
            <div>
              <h3>{title}</h3>
              <p>Rekap Jumlah Cluster</p>
            </div>
            <Form
              name="rkpcluster"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 24,
              }}
              layout="vertical"
              form={form}
              initialvalue={{
                cluster: data.cluster,
                periode: [data.startdate,data.enddate]
              }}
            >
              <Row gutter={16}>
                <Col className="gutter-row" span={6}>
                  <Form.Item
                    label="Periode"
                    name="periode"
                  >
                    {/*<Select
                      onChange={e => setTahun(e)} 
                      value={data.tahun}
                    >
                      <Option value="2020">2020</Option>
                      <Option value="2021">2021</Option>
                    </Select>*/}
                    <RangePicker 
                      value={[data.startdate,data.enddate]}
                      onChange={(a) => setPeriode(a)}
                    />
                  </Form.Item>
                </Col>
                <Col className="gutter-row" span={6}>
                  <Form.Item
                    label="Jumlah Cluster"
                    name="cluster"
                    normalize={str => str.replace(/[^0-9]/g, '')}
                    // initialValue={data.cluster}
                  >
                    <Input 
                      placeholder="Contoh: 2" 
                      onKeyPress={e => isOnlyNumberKey(e)} 
                      // value={data.cluster} 
                    />
                  </Form.Item>
                </Col>
                {/*<Col className="gutter-row" span={6}>
                  <Form.Item
                    label="Jumlah Cluster"
                    name="cluster "
                  >
                    <Input placeholder="Contoh: 2" />
                  </Form.Item>
                </Col>*/}
              </Row>
              <Row>
                <Col className="gutter-row" span={12}>
                  <center><Button type="primary" size="default" onClick={fetchDatasets}>Cari</Button></center>
                </Col>
                <Col className="gutter-row" span={12}>
                  <center><Button type="primary" size="default" >Download</Button></center>
                </Col>
              </Row>
            </Form>
            <br />
            <Row>
              <PdfDesain />
            </Row>
            <Row>
              <Col className="gutter-row" span={24}>
                <h4>Dataset</h4>
                <div style={{height: cssData.resultHeight}}>
                  {/*{
                    setResultDatasets.length !== 0
                    ?
                    (
                    : 'Tidak ada data'
                  }*/}
                  <Table dataSource={resultDatasets} columns={columns} rowKey="id" />)
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

export default Index