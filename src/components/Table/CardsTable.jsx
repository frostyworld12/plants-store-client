import ButtonIcon from "../ButtonIcon/ButtonIcon";
import Icon from "../Icon/Icon";

const CardsTable = ({data = [], columns = [], actionsColumns = [], columnsToExclude = [], columnsToMark = [], idColumn = '', imageColumn = ''}) => {
  return (
    <div className="flex gap-5">
      {
        data.map((item , i) => {
          return <div key={i} className="rounded-lg p-3 border border-zinc-100 min-w-52">
            <div>
              <ButtonIcon type="bare" iconName="EllipsisHorizontalIcon" title="More" onClick={() => {}}/>
            </div>
            <div className="flex flex-col items-center">
              <div className="mb-3">
                {
                  item.image
                    ? <img className="rounded-full h-24 w-24" src={item.image}/>
                    : <Icon iconClassName="h-24 w-24 text-zinc-300" iconName="UserIcon"/>
                }
              </div>
              <div className="font-semibold text-zinc-800 text-xl">
                { `${item.firstName} ${item.lastName || ''}` }
              </div>
              <div className="mb-3 text-zinc-700">
                { item.username }
              </div>
              <div className="uppercase text-zinc-500">
                { item.position }
              </div>
            </div>
          </div>
        })
      }
    </div>
  );
};

export default CardsTable;
