import { useAutocompleteProcess } from "../../hooks/useAutocomplete";
import ButtonIcon from "../ButtonIcon/ButtonIcon";
import Input from "../Input/Input";

const AutocompletePicklist = ({
  label = '',
  entity = '',
  isMultiSelect = false,
  isReadOnly = false,
  additionalParams = {},
  entityFieldsMapping = {
    label: '',
    value: '',
    description: ''
  },
  onSelect = () => { },
  predefinedItems = []
}) => {
  const {
    isOptionsVisible,
    items,
    selectedItems,
    searchQuery,
    setIsOptionsVisible,
    handleSelect,
    handleUnselect,
    handleSearchQueryChange
  } = useAutocompleteProcess(entity, entityFieldsMapping, predefinedItems, additionalParams, onSelect);

  return (
    <>
      <div>
        <div>
          {
            (!isMultiSelect && selectedItems.length > 0)
              ? <>
                <label className="block mb-1 text-sm font-medium text-zinc-600">{label}</label>
                <div
                  className="flex items-center justify-between border font-semibold bg-white border-zinc-200 text-zinc-800 rounded-lg text-sm px-3 py-2"
                >
                  {selectedItems[0].label}
                  <ButtonIcon iconName="XMarkIcon" type="bareRounded" onClick={() => handleUnselect(selectedItems[0])} />
                </div>
              </>
              : <Input
                label={label}
                type="bordered"
                iconName={isOptionsVisible ? 'ChevronUpIcon' : 'ChevronDownIcon'}
                value={searchQuery}
                placeholder="Select an option"
                isReadOnly={isReadOnly}
                onClick={() => setIsOptionsVisible(!isOptionsVisible)}
                onChange={(e) => handleSearchQueryChange(e.target.value)}
              />
          }
        </div>
        {
          isOptionsVisible && <div className="relative z-30">
            <div
              className="absolute mt-1 w-full rounded-lg border border-zinc-100 bg-white shadow-lg max-h-[200px] overflow-y-auto"
            >
              <ul className="py-2">
                {
                  (items && items.length > 0)
                    ? items.map((item, i) => {
                      return <li
                        className="px-5 py-2 hover:bg-zinc-100 transition-all duration-300 cursor-pointer text-zinc-600 font-semibold text-sm"
                        onClick={() => handleSelect(item)}
                        key={i}
                      >
                        {item.label} {item.description ? ' - ' + item.description : ''}
                      </li>
                    })
                    : <li className="px-5 py-1 cursor-pointer text-zinc-600 font-semibold text-sm">No items found</li>
                }
              </ul>
            </div>
          </div>
        }
        {
          (isMultiSelect && selectedItems.length > 0) && <div className="mt-1 flex flex-wrap gap-2 max-h-[80px] overflow-y-auto">
            {
              selectedItems.map((item, i) => {
                return <div
                  key={i}
                  className="flex gap-1 items-center rounded-lg pl-2 pr-1 text-sm text-zinc-500 font-semibold border border-zinc-200 bg-white"
                >
                  {item.label}
                  <ButtonIcon iconName="XMarkIcon" type="bareRounded" onClick={() => handleUnselect(item)} />
                </div>
              })
            }
          </div>
        }
      </div>
      <div className={'absolute w-full h-full inset-0 ' + (!isOptionsVisible ? 'hidden' : '')} onClick={() => setIsOptionsVisible(false)}></div>
    </>
  )
};

export default AutocompletePicklist;