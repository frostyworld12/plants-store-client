const Image = ({ image = ''}) => {
  return (
    <div>
      <img src={image} className="rounded-lg"></img>
    </div>
  );
}

export default Image;