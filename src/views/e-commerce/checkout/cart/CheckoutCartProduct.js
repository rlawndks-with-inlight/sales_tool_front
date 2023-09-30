import PropTypes from 'prop-types';
// @mui
import { Box, Stack, Divider, TableRow, TableCell, Typography, IconButton } from '@mui/material';
// utils
import { fCurrency } from 'src/utils/formatNumber';
// components
import Image from 'src/components/image';
import Label from 'src/components/label';
import Iconify from 'src/components/iconify/Iconify';
import { ColorPreview } from 'src/components/color-utils';
import { IncrementerButton } from 'src/components/custom-input';
import { commarNumber } from 'src/utils/function';
import _ from 'lodash';
import EstimateData from 'src/views/contract/EstimateData';
import { BlobProvider } from '@react-pdf/renderer';

// ----------------------------------------------------------------------

CheckoutCartProduct.propTypes = {
  row: PropTypes.object,
  onDelete: PropTypes.func,
  onDecrease: PropTypes.func,
  onIncrease: PropTypes.func,
};

export default function CheckoutCartProduct({ row, customer, onDelete, onDecrease, onIncrease, onClickEstimatePreview }) {
  const { name, size, price, colors, cover, quantity, available, select_groups = [], budget, idx, product_img } = row;

  return (
    <TableRow>
      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        <Image
          alt="product image"
          src={product_img}
          sx={{ width: 64, height: 64, borderRadius: 1.5, mr: 2 }}
        />

        <Stack spacing={0.5}>
          <Typography noWrap variant="subtitle2" sx={{ maxWidth: 240 }}>
            {name}
          </Typography>
        </Stack>
      </TableCell>
      <TableCell>
        <Stack spacing={0.5}>
          {select_groups.length > 0 ?
            <>
              {select_groups.map((group, idx) => {
                return <>
                  <Stack
                    direction="row"
                    alignItems="center"
                    sx={{ typography: 'body2', color: 'text.secondary' }}
                  >
                    <div style={{ display: 'flex' }}>
                      {group?.group_name}: {group?.option_name} ({group?.option_price > 0 ? '+' : ''}{commarNumber(group?.option_price)}원)
                    </div>
                  </Stack>
                </>
              })}
            </>
            :
            <>
              ---
            </>}
        </Stack>
      </TableCell>
      <TableCell>{fCurrency((budget?.budget_price || price) + _.sum(select_groups.map((group => { return group?.option_price ?? 0 }))))} 원</TableCell>
      <TableCell align='center'>

        <IconButton onClick={onClickEstimatePreview}>
          <Iconify icon="fontisto:preview" />
        </IconButton>
      </TableCell>
      <TableCell align='center'>
        <BlobProvider document={<EstimateData product={row} customer={customer} />}>
          {({ url }) => (
            <IconButton href={url} target='_blank'>
              <Iconify icon="ph:printer" />
            </IconButton>
          )}
        </BlobProvider>
      </TableCell>
      <TableCell align="right">
        <IconButton onClick={onDelete}>
          <Iconify icon="eva:trash-2-outline" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
