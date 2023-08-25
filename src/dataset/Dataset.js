import { useEffect, useState } from "react"

import { 
  Container,
} from 'react-bootstrap'

import { 
  Form,
  Select,
  // Input,
  Row,
  Col,
  Table,
  Button,
  Spin 
} from 'antd'

import Headers from '../header/Headers'
import PikYear from '../components/pikYear/PikYear'
import PikItemGrp from '../components/pikItemGrp/PikItemGrp'
import { itemgroup, datasets } from '../api/Api'

const { Option } = Select

const Dataset = () => {
  const title = "Dataset";
  const [itemgrp, setItemgrp] = useState([])
  const [resultDatasets, setResultDatasets] = useState([])

  useEffect(() => {
    itemgroup().then(response => setItemgrp(response))
  }, [])

  const [data, setData] = useState({
    range: '1',
    tahun: '2020',
    // bulan: 'jan',
    showTahun: true,
    itemgrp: null,
    // showBulan: true
  })

  const [cssData, setCssData] = useState({
    resultHeight: '200px',
    spinner: false
  })

  const setTahun = (value) => {
    setData({
      ...data,
      tahun: value,
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
    datasets(data).then(response => {
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
              <p>Dataset Penjualan</p>
            </div>
            <Form
              name="dataset"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 24,
              }}
              layout="vertical"
            >
              <Row gutter={16}>
                <Col className="gutter-row" span={6}>
                  <Form.Item
                    label="Tahun"
                    name="year"
                    initialValue={data.tahun}
                  >
                    {/*<Select
                      onChange={e => setTahun(e)} 
                      value={data.tahun}
                    >
                      <Option value="2020">2020</Option>
                      <Option value="2021">2021</Option>
                    </Select>*/}
                    <PikYear onChange={setTahun} value={data.tahun} />
                  </Form.Item>
                </Col>
                <Col className="gutter-row" span={6}>
                  <Form.Item
                    label="Kategori Item"
                    name="itemgrp"
                  >
                    {/*<Select
                      onChange={e => setValueItemgrp(e)}
                      allowClear
                      placeholder="Pilih Grup Item"
                    >
                      {
                        Array.isArray(itemgrp) 
                        ? itemgrp.map( data => (
                          <Option value={data.id} key={data.id}>{data.name}</Option>
                          )
                        )
                        : <Option value="null">Tidak ada data !</Option>
                      }
                    </Select>*/}
                    <PikItemGrp onChange={setValueItemgrp} data={itemgrp} />
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
                <Col className="gutter-row" span={6}>
                  <Button type="primary" size="default" onClick={fetchDatasets}>Tampil</Button>
                </Col>
              </Row>
            </Form>
            <br />
            <Row>
              <Col className="gutter-row" span={24}>
                <h4>Dataset</h4>
                <div style={{height: cssData.resultHeight}}>
                  {
                    setResultDatasets.length !== 0
                    ?
                    (<Table dataSource={resultDatasets} columns={columns} rowKey />)
                    : 'Tidak ada data'
                  }
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

export default Dataset