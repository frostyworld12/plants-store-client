import ButtonIcon from "../ButtonIcon/ButtonIcon";

const Table = ({ data = [], columns = [], actionsColumns = [], columnsToExclude = [], columnsToMark = [], idColumn = '', imageColumn = '' }) => {
  return (
    <div className="flex flex-col h-[calc(100vh-15rem)]">
      <div className="overflow-y-auto">
        <table className="border-separate border-spacing-y-4 w-full">
          <tbody>
            {
              data.map((item, i) => {
                return <tr className="" key={i}>
                  {
                    columns.map((column, i) => {
                      return !columnsToExclude.includes(column)
                        ? <td
                          key={i}
                          className={`px-2 py-4 break-all font-medium text-zinc-500 bg-zinc-50 first:rounded-l-lg first:border-l border-t border-b border-zinc-100
                            ${(columnsToMark.includes(column) ? " text-zinc-800 " : "")}
                            ${(!actionsColumns.length ? " last:rounded-r-lg last:border-r " : "")}`
                          }
                        >
                          <div className="">
                            {item[column]}
                          </div>
                        </td>
                        : null
                    })
                  }
                  {
                    actionsColumns.map((column, i) => {
                      return <td
                        key={i}
                        className="px-2 bg-zinc-50 first:rounded-l-lg first:border-l last:rounded-r-lg last:border-r border-t border-b border-zinc-100"
                      >
                        <div className="">
                          <ButtonIcon type={column.type} title={column.title} iconName={column.iconName} onClick={() => column.action(item[idColumn])} />
                        </div>
                      </td>
                    })
                  }
                </tr>
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
