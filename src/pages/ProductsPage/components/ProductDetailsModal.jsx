import Modal from "../../../components/Modal/Modal";
import Icon from "../../../components/Icon/Icon";
import { useProductDetails } from "../../../hooks/useProducts";

const ProductDetailsModal = ({ data = {}, state = false, onClose = () => { } }) => {
  const {
    tabs,
    selectedTab,
    handleSelectTab,
    handleRedirectToSupplier
  } = useProductDetails(data);

  const modalButtons = [
    { title: 'Ok', type: 'filled', action: () => onClose() }
  ];

  return (
    <Modal title={data.name} visible={state} onClose={onClose} buttons={modalButtons} width={35} height={50}>
      <ul className="flex gap-1 mb-5">
        {
          tabs.map((tab, i) => {
            return <li
              key={i}
              className={
                "text-zinc-700 py-1 px-2 rounded-lg cursor-pointer font-semibold text-md transition-all duration-300 " +
                (selectedTab === tab ? "bg-zinc-200" : "")
              }
              onClick={() => handleSelectTab(tab)}
            >
              {tab}
            </li>
          })
        }
      </ul>
      {
        selectedTab === 'About'
          ? <>
            <div className="flex justify-center">
              <div className="rounded-lg w-[200px] h-[200px] overflow-hidden flex items-center justify-center shadow-lg">
                {
                  data.image
                    ? <img className="object-contain w-[200px] h-[200px]" src={data.image}></img>
                    : <Icon iconName="CameraIcon" iconClassName="w-[100px] text-zinc-300" type="solid" />
                }
              </div>
            </div>
            <div className="mt-6 overflow-y-auto h-[300px]">
              {data.description}
            </div>
          </>
          : <div className="grid grid-cols-3 gap-2">
            {
              data.suppliers?.length && data.suppliers.map((supplier, i) => {
                return <div
                  key={i}
                  className="h-auto max-w-full border rounded-lg p-3 cursor-pointer"
                  onClick={() => handleRedirectToSupplier(supplier.id)}
                >
                  <div className="flex flex-col justify-center h-full">
                    <div className="text-ellipsis overflow-hidden line-clamp-1" title={supplier.name}>
                      {supplier.name}
                    </div>
                    <div className="text-ellipsis overflow-hidden line-clamp-1" title={supplier.contactPerson}>
                      {supplier.contactPerson}
                    </div>
                  </div>
                </div>
              })
            }
          </div>
      }
    </Modal>
  );
};

export default ProductDetailsModal;