import PageContainer from "../../components/PageContainer/PageContainer";
import PageHeader from "../../components/PageHeader/PageHeader";
import ButtonIcon from "../../components/ButtonIcon/ButtonIcon";

const SuppliesPage = () => {
  return (
    <PageContainer>
      <PageHeader>
        <ButtonIcon type="outline" iconName="PlusIcon" title="Add Supplie"/>
      </PageHeader>
    </PageContainer>
  )
};

export default SuppliesPage;