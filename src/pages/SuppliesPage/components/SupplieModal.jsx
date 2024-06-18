import { useSupplyRequestSupplierProcess } from '../../../hooks/useSupplyRequest';
import Modal from '../../../components/Modal/Modal';
import AutocompletePicklist from '../../../components/AutocompletePicklist/AutocompletePicklist';
import DocumentViewer from '../../../components/DocumentViewer/DocumentViewer';
import ButtonIcon from '../../../components/ButtonIcon/ButtonIcon';
import SignatureModal from '../../../components/SignatureModal/SignatureModal';

const SupplieModal = ({ data = {}, onClose = () => { } }) => {
  const {
    request,
    currentStep,
    currentUser,
    currentFile,
    newFile,
    action,
    isSignatureOpen,
    setCurrentStep,
    setIsSignatureOpen,
    handleSigning,
    handleSelect,
    handleStep
  } = useSupplyRequestSupplierProcess(data, onClose);

  const modalButtons = [
    action === 'new' && { title: 'Back', type: 'outline', disabled: currentStep === 1, action: () => { setCurrentStep(currentStep - 1) } },
    action !== 'view' && { title: currentStep < 3 && action === 'new' ? 'Next' : 'Save', type: 'filled', form: 'createSupply', buttonType: 'submit' },
    action !== 'view' && { title: 'Cancel', type: 'outline', action: () => onClose() }
  ];

  return (
    <>
      <Modal title='Supply' onClose={onClose} width={42} buttons={modalButtons}>
        <form id='createSupply' onSubmit={handleStep}>
          {
            (action !== 'view' && currentStep === 1) && <AutocompletePicklist
              label='Supplies requests'
              entity='requests'
              additionalParams={{ supplierId: currentUser?.supplier?.id }}
              entityFieldsMapping={{ label: 'requestName', value: 'id' }}
              onSelect={handleSelect}
              predefinedItems={request}
            />
          }
          {
            (currentStep === 2 || action === 'view') && <div>
              <div className='max-h-[600px] overflow-y-auto rounded-lg'>
                <DocumentViewer currentFile={currentFile} />
              </div>
            </div>
          }
          {
            currentStep === 3 && <div>
            {
              <div className='flex justify-end mb-3'>
                <ButtonIcon iconName='PencilSquareIcon' type='outline' title='Add signature' onClick={() => setIsSignatureOpen(true)} />
              </div>
            }
            <div className='max-h-[600px] overflow-y-auto rounded-lg'>
              <DocumentViewer currentFile={newFile} />
            </div>

            {isSignatureOpen && <SignatureModal onClose={() => setIsSignatureOpen(false)} onSave={handleSigning} />}
          </div>
          }

        </form>
      </Modal>
    </>
  );
};

export default SupplieModal;