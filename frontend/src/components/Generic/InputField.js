import React from 'react'
import { Form, Input, Button, Checkbox } from 'antd';

const InputField=( { label, name, placeholder, width="70%", margin, rules, defaultValue, type, onChange, message, disabled=false } ) => {
  // margin => ms-auto, mx-auto, me-auto
  return (

    <>
      <div className={` ${margin}`} style={{ width: width }}>
        <label htmlFor={name} className="form-label">{label}</label>

      </div>

      <Form.Item
        name={name}
      className={`mb-3 ${margin}`} style={{ width: width }}
        rules={rules}
    >

        <Input type={type} name={name} defaultValue={defaultValue} disabled={disabled} onChange={onChange} placeholder={placeholder} />
      </Form.Item></>

  )
}

export default InputField
