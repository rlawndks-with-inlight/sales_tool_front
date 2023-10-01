import PropTypes from 'prop-types';
// @mui
import { Box, Stack, Divider, TableRow, TableCell, Typography, IconButton, Tooltip } from '@mui/material';
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
import { BlobProvider, pdf, renderToString } from '@react-pdf/renderer';
import { useSettingsContext } from 'src/components/settings';
import jsPDF from 'jspdf';
import "jspdf-autotable";
// ----------------------------------------------------------------------

CheckoutCartProduct.propTypes = {
  row: PropTypes.object,
  onDelete: PropTypes.func,
  onDecrease: PropTypes.func,
  onIncrease: PropTypes.func,
};

export default function CheckoutCartProduct({ row, customer, onDelete, onDecrease, onIncrease, onClickEstimatePreview, onSavePdf, idx }) {
  const { themeDnsData } = useSettingsContext();
  const { name, size, price, colors, cover, quantity, available, select_groups = [], budget, product_img, count } = row;

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
      <TableCell>
        <Box sx={{ width: 96, textAlign: 'right' }}>
          <IncrementerButton
            quantity={count ?? 1}
            onDecrease={onDecrease}
            onIncrease={onIncrease}
            disabledDecrease={count <= 1}
            disabledIncrease={count >= available}
          />
        </Box>
      </TableCell>
      <TableCell>{fCurrency(((budget?.budget_price || price) + _.sum(select_groups.map((group => { return group?.option_price ?? 0 })))) * count)} 원</TableCell>
      <TableCell align='center'>
        <Tooltip title={'해당 행의 내용만 들어있는 견적서가 출력됩니다.'}>
          <IconButton onClick={() => {
            onSavePdf(idx);
          }}>
            <Iconify icon="bi:file-pdf" />
          </IconButton>
        </Tooltip>
      </TableCell>
      <TableCell align="right">
        <IconButton onClick={onDelete}>
          <Iconify icon="eva:trash-2-outline" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
