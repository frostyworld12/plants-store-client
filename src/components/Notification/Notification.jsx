import Icon from '../Icon/Icon';
import { Link } from "react-router-dom";
import { useNotification } from '../../hooks/useNotification';

const Notification = ({ currentUser = {} }) => {
  const {
    notifications,
    isNotificationsListVisible,
    setIsNotificationsListVisible,
    handleReadNotification
  } = useNotification(currentUser);

  return (
    <div>
      <div className='relative cursor-pointer' onClick={() => setIsNotificationsListVisible(!isNotificationsListVisible)}>
        <Icon iconName='BellIcon' iconClassName='w-6 text-zinc-400' />
        {notifications.length > 0 && <div className='w-[8px] h-[8px] bg-zinc-800 rounded-full absolute top-0 right-1'></div>}
      </div>
      {
        isNotificationsListVisible && <div className='mt-1 bg-white shadow-lg border absolute rounded-lg flex flex-col divide-y select-none'>
          {
            notifications.map((item, i) => {
              return <Link key={i} to={item.url} onClick={() => handleReadNotification(item.id)}>
                <div className='py-3 px-4 text-sm font-semibold text-zinc-800'>
                  {item.title}
                </div>
              </Link>
            })
          }
        </div>
      }
    </div>
  )
};

export default Notification;