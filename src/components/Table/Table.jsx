import Icon from '../Icon/Icon';
import { Link } from "react-router-dom";

const Table = ({ objects = [], noImageIcon = '', selectedItemLink = '' }) => {
  //Table objects format {id: '', image: '', title: '', description: ''}
  return <div className='grid lg:grid-cols-[repeat(4,minmax(200px,1fr))] grid-cols-[repeat(3,minmax(200px,1fr))] gap-3'>
    {
      objects.length
      ? objects.map((item, i) => {
        return <Link key={i} to={`${selectedItemLink}${item.id}`}>
          <div
            className='flex-1 max-w-full h-auto rounded-lg shadow-sm border border-zinc-100 bg-zinc-50 p-3 cursor-pointer hover:bg-zinc-100 transition-all duration-300'
          >
            <div className='grid grid-cols-[60px_minmax(100px,1fr)] items-center gap-3'>
              <div className='rounded-full w-[60px] h-[60px] bg-white shadow-sm flex items-center justify-center overflow-hidden'>
                {
                  item.image
                    ? <img src={item.image} className='object-fill w-[60px] h-[60px]'/>
                    : <Icon iconName={noImageIcon} iconClassName='w-[40px] h-[40px] text-zinc-300' type='filled' />
                }
              </div>
              <div className='flex flex-col'>
                <div className='text-lg font-semibold text-zinc-800 text-ellipsis line-clamp-1' title={item.title}>
                  {item.title}
                </div>
                <div className='font-semibold text-zinc-500 text-ellipsis line-clamp-1' title={item.description}>
                  {item.description}
                </div>
              </div>
            </div>
          </div>
        </Link>
      })
      : <div className='font-semibold text-zinc-800'>
        No records found.
      </div>
    }
  </div>
};

export default Table;