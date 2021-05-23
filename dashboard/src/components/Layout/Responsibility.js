import { Form, Space, Input, Button } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
function Responsibility() {
  return (
    <>
      <div className="ant-col ant-form-item-label">
        <label className="ant-form-item-required">Responsibilities</label>
      </div>
      <Form.List
        name="responsibilities"
        rules={[
          {
            required: true,
            message: "Please input opportunity's responsibility!",
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
                    { required: true, message: "Missing repsonsibility!" },
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
                Add Responsibility
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </>
  );
}

export default Responsibility;
