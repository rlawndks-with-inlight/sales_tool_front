import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { sentenceCase } from 'change-case';
// next
import { useRouter } from 'next/router';
// form
import { Controller, useForm } from 'react-hook-form';
// @mui
import {
  Box,
  Link,
  Stack,
  Button,
  Rating,
  Divider,
  MenuItem,
  Typography,
  IconButton,
  Select,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  RadioGroup,
  Paper,
  Chip,
} from '@mui/material';
// routes
// utils
import { fShortenNumber, fCurrency } from 'src/utils/formatNumber';
// _mock
// components
import Label from 'src/components/label/Label';
import Iconify from 'src/components/iconify/Iconify';
import { IncrementerButton } from 'src/components/custom-input';
import { ColorSinglePicker } from 'src/components/color-utils';
import { commarNumber } from 'src/utils/function';
import { themeObj } from 'src/components/elements/styled-components';
import { useSettingsContext } from 'src/components/settings';
import _ from 'lodash';
import { toast } from 'react-hot-toast';
import { CheckoutBillingAddress, CheckoutCartProductList, CheckoutSteps, CheckoutSummary } from 'src/views/e-commerce/checkout';
import { test_address_list, test_pay_list } from 'src/data/test-data';
import EmptyContent from 'src/components/empty-content/EmptyContent';
import Payment from 'payment'
import Cards from 'react-credit-cards'
import { useAuthContext } from 'src/auth/useAuthContext';
import { formatCreditCardNumber, formatExpirationDate } from 'src/utils/formatCard';
import { useModal } from "src/components/dialog/ModalProvider";
import { onPayItemByCard } from 'src/utils/api-shop';
import { insertCartDataUtil, selectItemOptionUtil } from 'src/utils/shop-util';
import { product_status_list } from 'src/data/status-data';
// ----------------------------------------------------------------------

ProductDetailsSummary.propTypes = {
  cart: PropTypes.array,
  onAddCart: PropTypes.func,
  product: PropTypes.object,
  onGotoStep: PropTypes.func,
};
const STEPS = ['배송지 확인', '결제하기'];
export default function ProductDetailsSummary({ product, onAddCart, onGotoStep, ...other }) {
  const { setModal } = useModal()
  const { themeCartData, onChangeCartData, themeDnsData } = useSettingsContext();
  const { user } = useAuthContext();
  const [addressList, setAddressList] = useState([]);
  const [selectAddress, setSelectAddress] = useState({});
  const [payList, setPayList] = useState([]);
  const [selectProduct, setSelectProduct] = useState({ id: product?.id, count: 1, select_option_obj: {} });
  const [payData, setPayData] = useState({
    brand_id: themeDnsData?.id,
    user_id: user?.id ?? undefined,
    product_id: product?.id,
    amount: product?.product_sale_price ?? 0,
    item_name: product?.product_name,
    buyer_name: user?.nick_name ?? "",
    installment: 0,
    buyer_phone: '',
    card_num: '',
    yymm: '',
    auth_num: '',
    card_pw: '',
    addr: "",
    detail_addr: '',
    temp: [],
    password: ""
  })
  const [cardFucus, setCardFocus] = useState()
  const cart = []

  const {
    id,
    name,
    sub_name,
    product_sale_price = 0,
    product_price = 0,
    sizes = [],
    price,
    budget,
    cover,
    status,
    colors = [],
    available,
    priceSale,
    rating,
    product_average_scope,
    totalReview,
    inventoryType,
    inventory,
    product_name,
    product_comment,
    groups = []
  } = product;
  useEffect(() => {
    let pay_list = test_pay_list;
    setPayList(pay_list)
  }, [])

  const onSelectOption = (group, option) => {
    let select_product = selectItemOptionUtil(group, option, selectProduct);
    setSelectProduct(select_product);
  }

  return (
    <>
      <form>
        <Stack
          spacing={3}
          sx={{
            p: (theme) => ({
              md: theme.spacing(5, 5, 0, 2),
            }),
          }}
          {...other}
        >
          <Stack spacing={2}>
            <Typography
              variant="overline"
              component="div"
              sx={{
                color: status === 'sale' ? 'error.main' : 'info.main',
              }}
            >
              <Chip label={product_status_list[status].title} variant="soft" color={product_status_list[status].chip_color} />
            </Typography>

            <Typography variant="h5">{name}</Typography>
            <Typography variant="h7" color={themeObj.grey[500]}>{product_comment}</Typography>

            <Stack direction="row" alignItems="center" spacing={1}>
              <Rating value={5} precision={0.1} readOnly />
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                ({5})
              </Typography>
            </Stack>
            <Typography variant="h4">
              {product_price > product_sale_price && (
                <Box
                  component="span"
                  sx={{ color: 'text.disabled', textDecoration: 'line-through', mr: 0.5 }}
                >
                  {fCurrency(product_price)}
                </Box>
              )}
              {commarNumber(budget?.budget_price || price)} 원
            </Typography>
          </Stack>
          <Divider sx={{ borderStyle: 'dashed' }} />
          {groups.map((group) => (
            <>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="subtitle2" sx={{ height: 40, lineHeight: '40px', flexGrow: 1 }}>
                  {group?.group_name}
                </Typography>
                <Select
                  name="size"
                  size="small"
                  sx={{
                    minWidth: 96,
                    '& .MuiFormHelperText-root': {
                      mx: 0,
                      mt: 1,
                      textAlign: 'right',
                    },
                  }}
                  onChange={(e) => {
                    onSelectOption(group, e.target.value)
                  }}
                >
                  {group?.options && group?.options.map((option) => (
                    <MenuItem key={option?.option_name} value={option}>
                      {option?.option_name}
                    </MenuItem>
                  ))}
                </Select>
              </Stack>
            </>
          ))}
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="subtitle2" sx={{ height: 40, lineHeight: '40px', flexGrow: 1 }}>
              색상
            </Typography>
            <Select
              name="size"
              size="small"
              sx={{
                minWidth: 96,
                '& .MuiFormHelperText-root': {
                  mx: 0,
                  mt: 1,
                  textAlign: 'right',
                },
              }}
              onChange={(e) => {
              }}
            >
              <MenuItem value={0}>
                블랙
              </MenuItem>
              <MenuItem value={1}>
                화이트
              </MenuItem>
            </Select>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="subtitle2" sx={{ height: 40, lineHeight: '40px', flexGrow: 1 }}>
              타입
            </Typography>
            <Select
              name="size"
              size="small"
              sx={{
                minWidth: 96,
                '& .MuiFormHelperText-root': {
                  mx: 0,
                  mt: 1,
                  textAlign: 'right',
                },
              }}
              onChange={(e) => {
              }}
            >
              <MenuItem value={0}>
                벽걸이
              </MenuItem>
              <MenuItem value={1}>
                키다리
              </MenuItem>
            </Select>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="subtitle2" sx={{ height: 36, lineHeight: '36px' }}>
              수량
            </Typography>

            <Stack spacing={1}>
              <IncrementerButton
                name="quantity"
                quantity={selectProduct.count}
                disabledDecrease={selectProduct.count <= 1}
                disabledIncrease={selectProduct.count >= available}
                onIncrease={() => {
                  setSelectProduct({
                    ...selectProduct,
                    count: selectProduct.count + 1
                  })
                }}
                onDecrease={() => {
                  setSelectProduct({
                    ...selectProduct,
                    count: selectProduct.count - 1
                  })
                }}
              />
              {/* <Typography
              variant="caption"
              component="div"
              sx={{ textAlign: 'right', color: 'text.secondary' }}
            >
              재고: ss ({commarNumber(inventory)})
            </Typography> */}
            </Stack>
          </Stack>
          <Divider sx={{ borderStyle: 'dashed' }} />
          <Stack direction="row" spacing={2}>
            <Button
              fullWidth
              disabled={!(status == 0)}
              size="large"
              color="warning"
              variant="contained"
              startIcon={<Iconify icon="ic:round-add-shopping-cart" />}
              onClick={() => { }}
              sx={{ whiteSpace: 'nowrap' }}

            >
              상품추가
            </Button>
            <Button
              fullWidth
              size="large"
              disabled={!(status == 0)}
              variant="contained" onClick={() => {

              }}>
              계약서작성
            </Button>
          </Stack>
          <Stack direction="row" alignItems="center" justifyContent="center">
            {[].map((social) => (
              <IconButton key={social.name}>
                <Iconify icon={social.icon} />
              </IconButton>
            ))}
          </Stack>
        </Stack>
      </form>
    </>
  );
}
