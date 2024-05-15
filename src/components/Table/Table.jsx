import Icon from "../Icon/Icon";

const Table = ({ objects = [], onSelect = () => {} }) => {
  //Table objects format {id: '', image: '', title: '', description: ''}
  return <div className="grid lg:grid-cols-[repeat(4,minmax(200px,1fr))] grid-cols-[repeat(3,minmax(200px,1fr))] gap-3">
    {
      objects && objects.map((item, i) => {
        return <div
          key={i}
          className="flex-1 max-w-full h-auto rounded-lg shadow-sm border border-zinc-100 bg-zinc-50 p-3 cursor-pointer hover:bg-zinc-100 transition-all duration-300"
          onClick={() => onSelect(item.id)}
        >
          <div className="grid grid-cols-[60px_minmax(100px,1fr)] items-center gap-3">
            <div className="rounded-full w-[60px] h-[60px] bg-white shadow-sm flex items-center justify-center">
              {
                item.image
                  ? <img />
                  : <Icon iconName="BuildingOfficeIcon" iconClassName="w-[40px] h-[40px] text-zinc-300" type="filled" />
              }
            </div>
            <div className="flex flex-col">
              <div className="text-lg font-semibold text-zinc-800 text-ellipsis line-clamp-1" title={item.name}>
                {item.title}
              </div>
              <div className="font-semibold text-zinc-500 text-ellipsis line-clamp-1" title={item.contactPerson}>
                {item.description}
              </div>
            </div>
          </div>
        </div>
      })
    }
  </div>
};

export default Table;