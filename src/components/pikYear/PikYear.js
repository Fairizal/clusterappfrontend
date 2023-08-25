import { Select } from 'antd'

const { Option } = Select

const PikYear = (props) => {
	return (
		<>
			<Select
		      onChange={e => props.onChange(e)} 
		      value={props.value}
		    >
		      <Option value="2020">2020</Option>
		      <Option value="2021">2021</Option>
		    </Select>
		</>
	)
}

export default PikYear