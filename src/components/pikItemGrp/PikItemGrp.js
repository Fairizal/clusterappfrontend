import { Select } from 'antd'

const { Option } = Select

const PikItemGrp = (props) => {
	return (
		<>
			<Select
              onChange={e => props.onChange(e)}
              allowClear
              placeholder="Pilih Kategori Item"
            >
              {
                Array.isArray(props.data) 
                ? props.data.map( itemgrp => (
                  <Option value={itemgrp.id} key={itemgrp.id}>{itemgrp.nama}</Option>
                  )
                )
                : <Option value="null">Tidak ada data !</Option>
              }
            </Select>
		</>
	)
}

export default PikItemGrp