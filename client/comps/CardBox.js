import Image from "next/image";
function CardBox({ title, des, src }) {
  return (
    <div className="card-box-info">
      <img loading="lazy" width="200px" height="170px" src={src} alt={title} />
      <h3>{title}</h3>
      <p>{des}</p>
    </div>
  );
}

export default CardBox;
