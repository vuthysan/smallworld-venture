import { Modal } from "antd";
import React, { useState } from "react";
import parseHTML from "html-react-parser";

function stripHtmlTags(str) {
  if (str === null || str === "") return false;
  return str.replace(/<[^>]*>/g, "");
}

function Card({ image, title, desc, author }) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <React.Fragment>
      <Modal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width="800px"
        footer={null}
        title={null}
        style={{ top: 20 }}
        className="card-modal"
      >
        {parseHTML(`${desc}`)}
      </Modal>

      <div className="card" onClick={showModal}>
        {image ? (
          <div
            style={{
              backgroundImage: `url(${image})`,
            }}
            className="card-image"
          />
        ) : (
          <div
            className="card-image"
            style={{
              backgroundImage: `url("/images/default_img.png")`,
            }}
          />
        )}
        <div className="card-des">
          <h3>{`${
            title.length > 40 ? `${title.substring(0, 50)}...` : title
          }`}</h3>
          <div className="card-desc">
            {`${stripHtmlTags(`${desc}`).substring(0, 90)}...`}
          </div>
          <span className="name-badge">{author}</span>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Card;
