import ButtonIcon from "../ButtonIcon/ButtonIcon";
import Image from "../Image/Image";

const TableList = ({ data = [], columns = [], actionsColumns = [], columnsToExclude = [], columnsToMark = [], idColumn = '', imageColumn = '' }) => {
  const gridStyle = {
    gridTemplateColumns: `${imageColumn ? 'repeat(1, 70px)' : ''} repeat(${(columns.length - columnsToExclude.length)}, minmax(0, 1fr)) repeat(${actionsColumns.length}, 70px)`
  }
  return (
    <div className="h-[calc(100vh-10rem)] w-full">
      { data.length > 0
        ? data.map((item, i) => {
          return <div key={i} className="grid bg-zinc-50 mb-5 rounded-lg items-center" style={gridStyle}>
            {
              imageColumn && <Image image={item[imageColumn]}/>
            }
            {
              columns.map((column, i) => {
                return !columnsToExclude.includes(column)
                ? <div key={i} className={"p-4 truncate text-zinc-500 font-medium " + (columnsToMark.includes(column) ? "text-zinc-700" : "")} title={item[column]}>
                    { item[column] }
                  </div>
                : null
              })
            }
            {
              actionsColumns.map((column, i) => {
                return <div key={i} className="p-4">
                  <ButtonIcon type={column.type} title={column.title} iconName={column.iconName} onClick={() => column.action(item[idColumn])} />
                </div>
              })
            }
          </div>
        })
        : <div className="h-full flex items-center justify-center text-2xl text-zinc-500 font-medium">No records found</div>
      }
    </div>
  );
}

export default TableList;
