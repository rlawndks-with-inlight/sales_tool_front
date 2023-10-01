import PropTypes from 'prop-types';
// @mui
import { Table, TableBody, TableContainer } from '@mui/material';
// components
import Scrollbar from 'src/components/scrollbar';
import { TableHeadCustom } from 'src/components/table';
//
import CheckoutCartProduct from './CheckoutCartProduct';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'product', label: '상품명' },
  { id: 'option', label: '옵션정보' },
  { id: 'count', label: '수량' },
  { id: 'price', label: '가격(책정가)' },
  { id: 'estimate_print', label: '견적서개별출력' },
  { id: '' },
];

// ----------------------------------------------------------------------

CheckoutCartProductList.propTypes = {
  onDelete: PropTypes.func,
  products: PropTypes.array,
  onDecreaseQuantity: PropTypes.func,
  onIncreaseQuantity: PropTypes.func,
};

export default function CheckoutCartProductList({
  products,
  onDelete,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onClickEstimatePreview,
  customer,
  onSavePdf
}) {
  return (
    <TableContainer sx={{ overflow: 'unset' }}>
      <div style={{ width: '100%', overflow: 'auto' }}>
        <Table sx={{ minWidth: 720 }}>
          <TableHeadCustom headLabel={TABLE_HEAD} />
          <TableBody>
            {products.map((row, idx) => (
              <CheckoutCartProduct
                key={row.id}
                row={row}
                idx={idx}
                onDelete={() => onDelete(idx)}
                onClickEstimatePreview={() => onClickEstimatePreview(idx)}
                onDecrease={() => onDecreaseQuantity(idx)}
                onIncrease={() => onIncreaseQuantity(idx)}
                customer={customer}
                onSavePdf={onSavePdf}
              />
            ))}
          </TableBody>
        </Table>
     </div>
    </TableContainer>
  );
}
