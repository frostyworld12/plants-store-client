import Modal from '../../../components/Modal/Modal';
import Input from '../../../components/Input/Input';
import { useProductsProcess } from '../../../hooks/useProducts';
import FileInput from '../../../components/FileInput/FileInput';
import Textarea from '../../../components/Textarea/Textarea';
import AutocompletePicklist from '../../../components/AutocompletePicklist/AutocompletePicklist';
import ButtonIcon from '../../../components/ButtonIcon/ButtonIcon';
import { Link } from "react-router-dom";

const ProductsModal = ({ data = {}, onClose = () => { } }) => {
  const {
    action,
    productData,
    handleProductDataChange,
    handleProcessProduct,
    handleEditAction,
    handleRemoveAction,
    handleSelectSupplier
  } = useProductsProcess(data);

  const modalButtons = [
    { title: action !== 'remove' ? 'Save' : 'Ok', type: 'filled', form: 'upsertProduct', buttonType: 'submit' },
    { title: 'Cancel', type: 'outline', action: () => onClose() }
  ];

  return (
    <>
      <Modal title='Product' onClose={onClose} buttons={action !== 'view' ? modalButtons : []} width={35}>
        {
          action === 'view' &&
          <div className='flex justify-end gap-1'>
            <ButtonIcon iconName='PencilIcon' type='outline' onClick={handleEditAction} />
            <ButtonIcon iconName='TrashIcon' type='outline' onClick={handleRemoveAction} />
          </div>
        }
        <form id='upsertProduct' onSubmit={async (e) => { await handleProcessProduct(e); onClose(true); }}>
          {
            action !== 'remove'
              ? <div className='flex flex-col gap-4'>
                <FileInput
                  value={productData.image}
                  onChange={(image) => handleProductDataChange(image, 'image')}
                  isReadOnly={action === 'view'}
                />

                <div className='flex gap-4'>
                  <div className='w-full'>
                    <Input
                      label='Name'
                      placeholder='Flower pot'
                      value={productData.name}
                      onChange={(e) => handleProductDataChange(e.target?.value, 'name')}
                      isRequired={true}
                      isReadOnly={action === 'view'}
                    />
                  </div>
                </div>
                {
                  action === 'view'
                    ? <div>
                      <div className='text-zinc-600 font-semibold text-sm mb-1'>Suppliers</div>
                      {
                        productData.suppliers?.length > 0
                          ? <div className='grid grid-cols-[repeat(5,minmax(100px,1fr))] gap-1 overflow-y-auto overflow-x-hidden max-h-[100px]'>
                            {productData.suppliers.map((supplier, i) => {
                              return <Link key={i} to={`/home/suppliers/${supplier.value}`}>
                                <div className='bg-zinc-100 rounded-lg py-1 px-2 cursor-pointer' >
                                  <div className='self-center text-sm text-zinc-600 font-semibold'>
                                    <span className='text-ellipsis line-clamp-1' title={supplier.label}>
                                      {supplier.label}
                                    </span>
                                  </div>
                                  <div className='text-sm font-semibold text-zinc-400'>
                                    <span className='text-ellipsis line-clamp-1' title={supplier.description}>
                                      {supplier.description}
                                    </span>
                                  </div>
                                </div>
                              </Link>
                            })}
                          </div>
                          : <div className='text-sm font-semibold text-zinc-800'>No suppliers selected for this product.</div>
                      }
                    </div>
                    : <AutocompletePicklist
                      label='Suppliers'
                      entity='suppliers'
                      isMultiSelect={true}
                      entityFieldsMapping={{ label: 'name', value: 'id', description: 'contactPerson' }}
                      predefinedItems={productData.suppliers}
                      onSelect={handleSelectSupplier}
                    />
                }

                <Textarea
                  label='Description'
                  value={productData.description}
                  onChange={(e) => handleProductDataChange(e.target?.value, 'description')}
                  isRequired={true}
                  isReadonly={action === 'view'}
                  rows={10}
                />
              </div>
              : <div>Are you sure you want to remove product?</div>
          }
        </form>
      </Modal>
    </>
  );
};

export default ProductsModal;