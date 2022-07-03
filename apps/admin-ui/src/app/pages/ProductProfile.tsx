import { FC } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import withDashboardLayout from '../layouts/AppLayout';
import {
  ProductDto,
  UniqueProductDto,
  UpdateProductDto,
} from '@nest-commerce/data';
import { Card, Group, LoadingOverlay } from '@mantine/core';
import {
  DeleteButton,
  DisplayTable,
  EditButton,
  ErrorModal,
  MutationType,
  QueryKey,
  useGetQuery,
  useMutation,
} from '@nest-commerce/ui';
import { Route } from '../configs/routes';
import { PRODUCT_FIELDS } from '../configs/products';

const ProductProfile: FC = () => {
  const { id } = useParams();
  const { isLoading, data, error, refetch } = useGetQuery<ProductDto>(
    id,
    QueryKey.PRODUCT
  );
  const {
    mutate,
    error: deleteError,
    reset: resetDelete,
  } = useMutation<ProductDto, UniqueProductDto>(
    QueryKey.PRODUCT,
    MutationType.DELETE
  );
  const {
    mutate: update,
    error: updateError,
    reset: resetUpdate,
  } = useMutation<ProductDto, UpdateProductDto>(
    QueryKey.PRODUCT,
    MutationType.UPDATE,
    id
  );
  const navigate = useNavigate();

  const deleteProduct = () => {
    mutate({ id: Number(id) });
    navigate(Route.PRODUCTS);
  };

  if (!id) {
    return <Navigate to={Route.PRODUCTS} />;
  }

  return (
    <Group className="w-full" direction="column">
      <LoadingOverlay visible={!data || isLoading} />
      <ErrorModal error={error} onClose={refetch} />
      <ErrorModal error={deleteError} onClose={resetDelete} />
      <ErrorModal error={updateError} onClose={resetUpdate} />
      {data && (
        <Card className="w-full" shadow="xl">
          <Group spacing="xl" align="start">
            <Group className="w-full" position="right">
              <EditButton
                fields={PRODUCT_FIELDS}
                data={data}
                validationClass={UpdateProductDto}
                onConfirmation={update}
              />
              <DeleteButton onConfirm={deleteProduct} />
            </Group>
            <DisplayTable fields={PRODUCT_FIELDS} data={data} />
          </Group>
        </Card>
      )}
    </Group>
  );
};

export default withDashboardLayout(ProductProfile);
