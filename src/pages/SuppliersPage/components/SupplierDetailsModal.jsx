import Modal from "../../../components/Modal/Modal";

const SupplierDetailsModal = ({ state = false, data = {}, onClose = () => { } }) => {
  return <Modal title={data.name} visible={state} onClose={onClose}>
    {data.name}
  </Modal>
};

export default SupplierDetailsModal;