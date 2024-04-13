import ButtonIcon from "../ButtonIcon/ButtonIcon";

const Table = ({ data = [], columns = [], actionsColumns = [], columnsToExclude = [], columnsToMark = [] }) => {
  return (
    <div className="flex flex-col h-[calc(100vh-15rem)]">
      <div className="flex-grow overflow-y-auto">
        <table className="relative w-full">
          <thead>
            <tr className="text-xs">
              {
                columns.map((column, i) => {
                  return !columnsToExclude.includes(column)
                    ? <th
                      key={i}
                      className={
                        "uppercase text-left sticky top-0 py-3 px-2 bg-zinc-50 text-zinc-700 first:rounded-l-lg " +
                        (actionsColumns.length === 0 ? "last:rounded-r-lg" : "")
                      }>
                      {column}
                    </th>
                    : null;
                })
              }
              {
                actionsColumns.map((column, i) => {
                  return <th
                    key={i}
                    className={
                      "sticky top-0 py-3 px-2 bg-zinc-50 text-zinc-700 last:rounded-r-lg "
                    }>
                  </th>
                })
              }
            </tr>
          </thead>
          <tbody className="">
            {
              data.map((item, i) => {
                return <tr key={i}>
                  {
                    columns.map((column, i) => {
                      return !columnsToExclude.includes(column)
                        ? <td
                          key={i}
                          className={"break-all font-medium border-0 text-zinc-500 " + (columnsToMark.includes(column) ? "text-zinc-800" : "")}
                        >
                          <div className="bg-zinc-300">
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
                        className="break-all font-medium px-2 py-3 text-zinc-500"
                      >
                        <ButtonIcon type={column.type} title={column.title} iconName={column.iconName} onClick={() => column.action(item.userId)} />
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
