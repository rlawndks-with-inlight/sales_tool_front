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
  { id: 'price', label: '가격(책정가)' },
  { id: 'estimate_preview', label: '견적서미리보기' },
  { id: 'estimate_print', label: '견적서출력' },
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
                onDecrease={() => onDecreaseQuantity(row.id)}
                onIncrease={() => onIncreaseQuantity(row.id)}
                customer={customer}
              />
            ))}
          </TableBody>
        </Table>
     </div>
    </TableContainer>
  );
}
