const DropDown = ({ items = [], position = 'right', data = {}, onBlankClick = () => {} }) => {
  const dropDownPosition = {
    left: '',
    right: 'right-0'
  };

  const handleSelectItem = (action) => {
    action(data);
    onBlankClick();
  }

  return (
    <>
      <div className="relative z-20">
        <div className={"rounded-lg absolute border border-zinc-100 bg-white shadow-lg " + dropDownPosition[position]}>
          <ul className="py-2">
            {
              items.map((item, i) => {
                return <li
                  key={i}
                  className="px-5 py-1 hover:bg-zinc-100 transition-all duration-300 cursor-pointer text-zinc-600"
                  onClick={() => handleSelectItem(item.action)}
                >
                  {item.title}
                </li>
              })
            }
          </ul>
        </div>
      </div>
      <div className="absolute w-full h-full top-0 right-0" onClick={onBlankClick}></div>
    </>
  );
}

export default DropDown;