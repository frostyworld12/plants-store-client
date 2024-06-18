import Modal from '../../../components/Modal/Modal';
import { useSupplyRequestProcess } from '../../../hooks/useSupplyRequest';
import AutocompletePicklist from '../../../components/AutocompletePicklist/AutocompletePicklist';
import Input from '../../../components/Input/Input';
import DocumentViewer from '../../../components/DocumentViewer/DocumentViewer';
import ButtonIcon from '../../../components/ButtonIcon/ButtonIcon';
import SignatureModal from '../../../components/SignatureModal/SignatureModal';

const SupplyRequestModal = ({ data = {}, onClose = () => { } }) => {
  const {
    suppliers,
    products,
    productsInfo,
    currentStep,
    currentFile,
    isSignatureOpen,
    action,
    setIsSignatureOpen,
    setCurrentStep,
    handleStep,
    handleSelect,
    handleProductInfoChange,
    handleSigning
  } = useSupplyRequestProcess(data, onClose);

  const modalButtons = [
    action === 'new' && { title: 'Back', type: 'outline', disabled: currentStep === 1, action: () => { setCurrentStep(currentStep - 1) } },
    action !== 'view' && { title: currentStep < 3 && action === 'new' ? 'Next' : 'Save', type: 'filled', form: 'generateRequest', buttonType: 'submit' },
    action !== 'view' && { title: 'Cancel', type: 'outline', action: () => onClose() }
  ];

  return (
    <>
      <Modal title='Supply Request' onClose={onClose} buttons={modalButtons} width={42}>
        <form id='generateRequest' onSubmit={handleStep}>
          <div className='flex flex-col gap-2'>
            {
              (currentStep === 1 && action === 'new') && <>
                <AutocompletePicklist
                  label='Suppliers'
                  entity='suppliers'
                  entityFieldsMapping={{ label: 'name', value: 'id', description: 'contactPerson' }}
                  predefinedItems={suppliers}
                  onSelect={(items) => handleSelect('suppliers', items)}
                />

                <AutocompletePicklist
                  label='Products'
                  isMultiSelect={true}
                  entity='products'
                  entityFieldsMapping={{ label: 'name', value: 'id' }}
                  predefinedItems={products}
                  onSelect={(items) => handleSelect('products', items)}
                />
              </>
            }
            {
              (currentStep === 2 && action === 'new' && suppliers.length > 0 && products.length > 0) && <>
                <span className='text-sm font-semibold'>
                  <span className='text-zinc-800'>
                    Supply request for: {suppliers[0].label}
                  </span>
                </span>

                <div className='text-zinc-800 font-semibold text-sm border rounded-lg p-3 bg-white'>
                  <div className='grid grid-cols-4 gap-3 items-center py-2 border-b'>
                    <div>
                      Product
                    </div>
                    <div>
                      Quantity
                    </div>
                    <div>
                      Cost per unit
                    </div>
                    <div>
                      Total
                    </div>
                  </div>
                  <div className='max-h-[400px] overflow-y-auto'>
                    {
                      productsInfo.map((item, i) => {
                        return <div className='grid grid-cols-4 gap-3 items-center py-2' key={i}>
                          <div>
                            {item.name}
                          </div>
                          <div>
                            <Input step='0' min={1} type='number' value={item.quantity} onChange={(e) => handleProductInfoChange(e.target.value, 'quantity', i)} isRequired/>
                          </div>
                          <div>
                            <Input type='number' min={1} value={item.costPerUnit} onChange={(e) => handleProductInfoChange(e.target.value, 'costPerUnit', i)} isRequired/>
                          </div>
                          <div>
                            {item.total}
                          </div>
                        </div>
                      })
                    }
                  </div>
                </div>
              </>
            }
            {
              (currentStep === 3 || action === 'view' || action === 'sign') && <div>
                {
                  action !== 'view' && <div className='flex justify-end mb-3'>
                    <ButtonIcon iconName='PencilSquareIcon' type='outline' title='Add signature' onClick={() => setIsSignatureOpen(true)} />
                  </div>
                }
                <div className='max-h-[600px] overflow-y-auto rounded-lg'>
                  <DocumentViewer currentFile={currentFile} />
                </div>

                {isSignatureOpen && <SignatureModal onClose={() => setIsSignatureOpen(false)} onSave={handleSigning} />}
              </div>
            }
          </div>
        </form>
      </Modal>
    </>
  );
};

export default SupplyRequestModal;