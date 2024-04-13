import ButtonIcon from "../ButtonIcon/ButtonIcon";
import Button from "../Button/Button";

const ConfirmationDialog = ({ isOpen, width = 30, children, onCloseClick, onConfirmClick}) => {
  return (
    <div className={isOpen ? "" : "hidden"}>
      <div className="flex items-center justify-center absolute inset-0">
        <div className="bg-zinc-100 rounded-lg flex flex-col z-50" style={{ width: `${width}rem` }}>
          <div className="flex px-3 py-3 justify-end">
            <ButtonIcon iconName="XMarkIcon" type="bare" onClick={(e) => onCloseClick(e)}/>
          </div>

          <div className="flex-1 px-6 py-6 flex items-center justify-center">
            { children }
          </div>

          <div className="flex justify-end px-3 py-3 border-t-[1px] gap-3">
            <Button
              title='Ok'
              type='filled'
              onClick={() => onConfirmClick(true)}
            />
            <Button
              title='Cancel'
              type='outline'
              onClick={() => onConfirmClick(false)}
            />
          </div>
        </div>
      </div>
      <div className="backdrop-saturate-50 bg-zinc-900/30 h-full w-full absolute inset-0"></div>
    </div>
  );
}

export default ConfirmationDialog;