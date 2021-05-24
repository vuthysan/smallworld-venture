import { Form, Space, Input, Button } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
function FormList({ name, message }) {
  return (
    <>
      <div className="ant-col ant-form-item-label">
        <label className="ant-form-item-required">{name}</label>
      </div>
      <Form.List
        name={name.toLowerCase()}
        rules={[
          {
            required: true,
            message: `Please input opportunity's ${message.toLowerCase()}!`,
          },
        ]}
      >
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, fieldKey, ...restField }) => (
              <Space
                key={key}
                style={{ display: "flex", marginBottom: 8 }}
                align="baseline"
              >
                <Form.Item
                  {...restField}
                  name={[name]}
                  fieldKey={[fieldKey]}
                  rules={[
                    {
                      required: true,
                      message: `Missing ${message.toLowerCase()}!`,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
                style={{ borderColor: "#1388d1" }}
              >
                Add {message}
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </>
  );
}

export default FormList;
