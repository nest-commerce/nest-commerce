import withDashboardLayout from '../layouts/AppLayout';
import { Group, Text } from '@mantine/core';
import { MutationType, QueryKey, useMutation } from '@nest-commerce/ui';
import { Route } from '../configs/routes';
import Dashboard from '../components/Dashboard';
import {
  CreateProductDto,
  FindProductsResponseDto,
  ProductDto,
} from '@nest-commerce/data';
import { PRODUCT_FIELDS } from '../configs/products';
import { useNavigate } from 'react-router-dom';

const ProductsDashboard = () => {
  const { mutateAsync } = useMutation<ProductDto, CreateProductDto>(
    QueryKey.PRODUCT,
    MutationType.CREATE
  );
  const navigate = useNavigate();

  const getRoute = (id: number) =>
    Route.PRODUCT_PROFILE.replace(':id', id.toString());

  const dataComponent = ({ name }: ProductDto) => (
    <Group>
      <Text weight={500}>{name}</Text>
    </Group>
  );

  return (
    <Dashboard<FindProductsResponseDto, ProductDto>
      queryKey={QueryKey.PRODUCT}
      dataComponent={dataComponent}
      getDataFn={(response) => response.products}
      getRouteFn={({ id }) => getRoute(id)}
      withAddButton
      fields={PRODUCT_FIELDS}
      validationClass={CreateProductDto}
      onConfirmation={async (value) => {
        const product = await mutateAsync(value as CreateProductDto);
        product && navigate(getRoute(product.id));
      }}
    />
  );
};

export default withDashboardLayout(ProductsDashboard);
