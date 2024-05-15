import { useProducts } from "../../../hooks/useProducts";
import Pagination from "../../../components/Pagination/Pagination";
import ButtonIcon from "../../../components/ButtonIcon/ButtonIcon";
import DropDown from "../../../components/DropDown/DropDown";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import Icon from "../../../components/Icon/Icon";

import { useDropDown } from "../../../hooks/useDropDown";
import ProductDetailsModal from "./ProductDetailsModal";

const ProductsTable = ({ onRecordEdit = () => { }, onRecordRemove = () => { }, searchQuery = '', isNeedUpdate = false }) => {
  const {
    isLoading,
    products,
    currentProduct,
    setCurrentProduct,
    processProducts,
    pageSize,
    setOffset,
    totalCount,
    isProductDetailsVisible,
    handleProductDetails
  } = useProducts(searchQuery, isNeedUpdate);

  const {
    isDropDownHidden,
    handleOpenDropDown
  } = useDropDown();

  const actions = [
    { title: 'Edit', value: 'Edit', action: onRecordEdit },
    { title: 'Delete', value: 'Delete', action: onRecordRemove }
  ]

  const handlePageClick = async (offset) => {
    setOffset(offset);
    await processProducts();
  };

  const handleDropDown = (state, productId) => {
    handleOpenDropDown(state);
    if (productId) {
      setCurrentProduct({ id: productId });
    }
  };

  const handleProductDetailsVisibility = (product, state) => {
    setCurrentProduct(product);
    handleProductDetails(state);
  };

  return (
    <>
      {
        isLoading && <div className="flex items-center justify-center h-[calc(100vh-20rem)]">
          <LoadingSpinner color="fill-zinc-600" />
        </div>
      }
      <div className={"overflow-auto h-[calc(100vh-20rem)] " + (isLoading ? "hidden" : "")}>
        <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-4 grid-col">
          {
            products.map((product, i) => {
              return <div key={i} className="h-auto max-w-full rounded-lg p-3 shadow-sm border border-zinc-100 box-border bg-zinc-50 cursor-pointer">
                <div className="h-full flex flex-col">
                  <div className="flex justify-end z-20">
                    <ButtonIcon type="bare" iconName="EllipsisHorizontalIcon" title="More" onClick={() => handleDropDown(false, product.id)} />
                  </div>
                  {
                    (!isDropDownHidden && currentProduct.id === product.id) &&
                    <DropDown
                      items={actions}
                      data={product}
                      onBlankClick={() => handleDropDown(true)}
                    />
                  }
                  <div className="flex flex-col items-center" onClick={() => handleProductDetailsVisibility(product, true)}>
                    <div className="rounded-lg w-[200px] h-[200px] overflow-hidden flex items-center justify-center shadow-lg">
                      {
                        product.image
                          ? <img className="object-cover w-[200px] h-[200px]" src={product.image}></img>
                          : <Icon iconName="CameraIcon" iconClassName="w-[100px] text-zinc-300" type="solid" />
                      }
                    </div>
                    <div className="my-3 font-semibold text-zinc-800 text-xl">
                      <div className="text-center">
                        {product.name}
                      </div>
                    </div>
                    <div className="text-zinc-600 line-clamp-3 text-ellipsis text-sm">
                      {product.description}
                    </div>
                  </div>
                </div>
              </div>
            })
          }
        </div>
      </div>
      {
        <div className={"flex justify-center mt-6 " + (isLoading ? "hidden" : "")}>
          <Pagination totalCount={totalCount} pageSize={pageSize} onPageClick={handlePageClick}></Pagination>
        </div>
      }
      <ProductDetailsModal state={isProductDetailsVisible} onClose={() => handleProductDetailsVisibility({}, false)} data={currentProduct}/>
    </>
  )
}

export default ProductsTable;