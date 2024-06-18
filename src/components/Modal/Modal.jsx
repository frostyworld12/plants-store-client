import ButtonIcon from '../ButtonIcon/ButtonIcon';
import Button from '../Button/Button';

const Modal = ({ width = 30, height = 'auto', title, children, onClose = () => { }, buttons = [] }) => {
  return (
    <div>
      <div className='flex items-center justify-center absolute inset-0'>
        <div
          className='bg-zinc-50 rounded-lg flex flex-col z-50'
          style={{ width: `${width}rem`, height: height !== 'auto' ? `${height}rem` : 'height' }}
        >
          <div className='flex justify-between px-6 py-6 border-b-[1px]'>
            <h3 className='text-xl font-semibold'>{title}</h3>
            <ButtonIcon iconName='XMarkIcon' type='bare' onClick={() => onClose()} />
          </div>

          <div className='flex-1 px-6 py-6'>
            {children}
          </div>

          {
            buttons.length
              ? <div className='flex justify-end px-6 py-6 border-t-[1px] gap-3'>
                {
                  buttons.map((button, i) => <Button
                    key={i}
                    title={button.title}
                    type={button.type}
                    buttonType={button.buttonType}
                    form={button.form}
                    onClick={button.action}
                    isDisabled={button.disabled}
                  />)
                }
              </div>
              : null
          }
        </div>
      </div>
      <div className='backdrop-saturate-50 bg-zinc-900/30 h-full w-full absolute inset-0 z-10'></div>
    </div>
  );
}

export default Modal;