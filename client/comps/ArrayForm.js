import { Form, Space, Input, Button } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
function FormList({ name, message }) {
  return (
    <>
      <Form.List
        name={name.toLowerCase()}
        rules={[
          {
            required: true,
            message: `Please input job's ${message.toLowerCase()}!`,
          },
        ]}
      >
        {(fields, { add, remove }) => (
          <>
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
            {fields.map(({ key, name, fieldKey, ...restField }, i) => (
              <Space key={i} style={{ display: "flex" }} align="baseline">
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
          </>
        )}
      </Form.List>
    </>
  );
}

export default FormList;
