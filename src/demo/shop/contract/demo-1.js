import { Box, Button, Card, CardContent, CardHeader, FormControlLabel, Grid, Paper, Radio, RadioGroup, Stack, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Row, Title } from 'src/components/elements/styled-components';
import { test_pay_list, test_address_list, test_item, test_items } from 'src/data/test-data';
import { CheckoutCartProductList, CheckoutSteps, CheckoutSummary } from 'src/views/e-commerce/checkout';
import styled from 'styled-components'
import _ from 'lodash'
import Label from 'src/components/label/Label';
import EmptyContent from 'src/components/empty-content/EmptyContent';
import Iconify from 'src/components/iconify/Iconify';
import { useSettingsContext } from 'src/components/settings';
import { getProductsByUser } from 'src/utils/api-shop';
import { calculatorPrice, getCartDataUtil, onPayProductsByHand } from 'src/utils/shop-util';
import { useAuthContext } from 'src/auth/useAuthContext';
import Payment from 'payment'
import Cards from 'react-credit-cards'
import { formatCreditCardNumber, formatExpirationDate } from 'src/utils/formatCard';
import { useModal } from 'src/components/dialog/ModalProvider';
import toast from 'react-hot-toast';

const Wrappers = styled.div`
max-width:1500px;
display:flex;
flex-direction:column;
margin: 0 auto;
width: 90%;
min-height:90vh;
margin-bottom:10vh;
`

const STEPS = ['견적서 작성', '고객정보 작성', '계약서 작성'];
export function AddressItem({ item, onCreateBilling }) {
  const { receiver, addr, address_type, phone, is_default } = item;
  return (
    <Card
      sx={{
        p: 3,
        mb: 3,
      }}
    >
      <Stack
        spacing={2}
        alignItems={{
          md: 'flex-end',
        }}
        direction={{
          xs: 'column',
          md: 'row',
        }}
      >
        <Stack flexGrow={1} spacing={1}>
          <Stack direction="row" alignItems="center">
            <Typography variant="subtitle1">
              {receiver}
              <Box component="span" sx={{ ml: 0.5, typography: 'body2', color: 'text.secondary' }}>
                ({address_type})
              </Box>
            </Typography>
            {is_default && (
              <Label color="info" sx={{ ml: 1 }}>
                기본주소
              </Label>
            )}
          </Stack>
          <Typography variant="body2">{addr}</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {phone}
          </Typography>
        </Stack>
        <Stack flexDirection="row" flexWrap="wrap" flexShrink={0}>
          {!is_default && (
            <Button variant="outlined" size="small" color="inherit" sx={{ mr: 1 }}>
              삭제
            </Button>
          )}
          <Button variant="outlined" size="small" onClick={onCreateBilling}>
            해당 주소로 배송하기
          </Button>
        </Stack>
      </Stack>
    </Card>
  );
}
const Demo1 = (props) => {
  const {
    data: {

    },
    func: {
      router
    },
  } = props;
  const { setModal } = useModal()
  const { user } = useAuthContext();
  const { themeCartData, onChangeCartData, themeDnsData } = useSettingsContext();
  const [products, setProducts] = useState([]);
  const [activeStep, setActiveStep] = useState(0);
  const [addressList, setAddressList] = useState([]);
  const [buyType, setBuyType] = useState(undefined);
  const [cardFucus, setCardFocus] = useState()
  const [payData, setPayData] = useState({
    brand_id: themeDnsData?.id,
    user_id: user?.id ?? undefined,
    //total_amount
    buyer_name: user?.nick_name ?? "",
    installment: 0,
    buyer_phone: '',
    card_num: '',
    yymm: '',
    auth_num: '',
    card_pw: '',
    addr: "",
    detail_addr: '',
    password: "",
  })
  useEffect(() => {
    getCart();
  }, [])
  const getCart = async () => {
    setProducts(themeCartData);
  }
  const onDelete = (idx) => {
    let product_list = [...products];
    product_list.splice(idx, 1);
    onChangeCartData(product_list);
    setProducts(product_list);
  }
  const onDecreaseQuantity = (idx) => {
    let product_list = [...products];
    product_list[idx].count--;
    setProducts(product_list)
  }
  const onIncreaseQuantity = (idx) => {
    let product_list = [...products];
    product_list[idx].count++;
    setProducts(product_list)
  }
  const onClickNextStep = () => {
    if (activeStep == 0) {

    }
    if (activeStep == 1) {

    }
    setActiveStep(activeStep + 1);
    scrollTo(0, 0)
  }
  const onClickPrevStep = () => {
    setActiveStep(activeStep - 1);
    scrollTo(0, 0)
  }
  const onCreateBilling = (item) => {
    setPayData({
      ...payData,
      ...item,
    })
    onClickNextStep();
  }
  const selectPayType = async (item) => {
    if (item?.type == 'card') {//카드결제
      setBuyType('card');
    } else if (item?.type == 'certification') {

    }
  }
  const onPay = async () => {
    if (buyType == 'card') {//카드결제
      let result = await onPayProductsByHand(products, payData);
      if(result){
        await onChangeCartData([]);
        toast.success('성공적으로 구매에 성공하였습니다.');
        router.push('/shop/auth/history');
      }
    }
  }
  return (
    <>
      <Wrappers>
        <Title>새 계약 생성</Title>
        <CheckoutSteps activeStep={activeStep} steps={STEPS} />
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            {activeStep == 0 &&
              <>
                <Card>
                  {products.length > 0 ?
                    <>
                      <CheckoutCartProductList
                        products={products}
                        onDelete={onDelete}
                        onDecreaseQuantity={onDecreaseQuantity}
                        onIncreaseQuantity={onIncreaseQuantity}
                      />
                    </>
                    :
                    <>
                      <EmptyContent
                        title="상품 리스트가 비어 있습니다."
                        description="상품 > 상품추가 버튼을 이용해 상품을 추가해 주세요."
                        img="/assets/illustrations/illustration_empty_cart.svg"
                      />
                    </>}
                </Card>
              </>}
            {activeStep == 1 &&
              <>
                {addressList.length > 0 ?
                  <>
                    {addressList.map((item, idx) => (
                      <>
                        <AddressItem
                          key={idx}
                          item={item}
                          onCreateBilling={() => onCreateBilling(item)}
                        />
                      </>
                    ))}
                  </>
                  :
                  <>
                    <Card sx={{ marginBottom: '1.5rem' }}>
                      <EmptyContent
                        title="배송지가 없습니다."
                        description="배송지를 추가해 주세요."
                        img=""
                      />
                    </Card>
                  </>}
              </>}
            {activeStep == 2 &&
              <>
                <Card sx={{ marginBottom: '1.5rem' }}>
                  {!buyType &&
                    <>
                      <CardHeader title="결제 수단 선택" />
                      <CardContent>
                        <RadioGroup row>
                          <Stack spacing={3} sx={{ width: 1 }}>
                            {test_pay_list.map((item, idx) => (
                              <>
                                <Paper
                                  variant="outlined"
                                  sx={{ padding: '1rem', cursor: 'pointer' }}
                                  onClick={() => {
                                    selectPayType(item)
                                  }}
                                >
                                  <Box sx={{ ml: 1 }}>
                                    <Typography variant="subtitle2">{item.title}</Typography>
                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                      {item.description}
                                    </Typography>
                                  </Box>
                                </Paper>
                              </>
                            ))}
                          </Stack>
                        </RadioGroup>
                      </CardContent>
                    </>}
                  {buyType == 'card' &&
                    <>
                      <CardHeader title="카드정보입력" />
                      <CardContent>
                        <Stack spacing={2}>
                          <Cards cvc={''} focused={cardFucus} expiry={payData.yymm} name={payData.buyer_name} number={payData.card_num} />
                          <Stack>
                            <TextField
                              size='small'
                              label='카드 번호'
                              value={payData.card_num}
                              placeholder='0000 0000 0000 0000'
                              onChange={(e) => {
                                let value = e.target.value;
                                value = formatCreditCardNumber(value, Payment)
                                setPayData({
                                  ...payData,
                                  ['card_num']: value
                                })
                              }}
                            />
                          </Stack>
                          <Stack>
                            <TextField
                              size='small'
                              label='카드 사용자명'
                              value={payData.buyer_name}
                              onChange={(e) => {
                                let value = e.target.value;
                                setPayData({
                                  ...payData,
                                  ['buyer_name']: value
                                })
                              }}
                            />
                          </Stack>
                          <Stack>
                            <TextField
                              size='small'
                              label='만료일'
                              value={payData.yymm}
                              inputProps={{ maxLength: '5' }}
                              onChange={(e) => {
                                let value = e.target.value;
                                value = formatExpirationDate(value, Payment)
                                setPayData({
                                  ...payData,
                                  ['yymm']: value
                                })
                              }}
                            />
                          </Stack>
                          <Stack>
                            <TextField
                              size='small'
                              label='카드비밀번호 앞 두자리'
                              value={payData.card_pw}
                              type='password'
                              inputProps={{ maxLength: '2' }}
                              onChange={(e) => {
                                let value = e.target.value;
                                setPayData({
                                  ...payData,
                                  ['card_pw']: value
                                })
                              }}
                            />
                          </Stack>
                          <Stack>
                            <TextField
                              size='small'
                              label='구매자 휴대폰번호'
                              value={payData.buyer_phone}
                              onChange={(e) => {
                                let value = e.target.value;
                                setPayData({
                                  ...payData,
                                  ['buyer_phone']: value
                                })
                              }}
                            />
                          </Stack>
                          <Stack>
                            <TextField
                              size='small'
                              label='주민번호 또는 사업자등록번호'
                              value={payData.auth_num}
                              onChange={(e) => {
                                let value = e.target.value;
                                setPayData({
                                  ...payData,
                                  ['auth_num']: value
                                })
                              }}
                            />
                          </Stack>
                          {!user &&
                            <>
                              <Stack>
                                <TextField
                                  size='small'
                                  label='비회원주문 비밀번호'
                                  type='password'
                                  value={payData.password}
                                  inputProps={{ maxLength: '6' }}
                                  onChange={(e) => {
                                    let value = e.target.value;
                                    setPayData({
                                      ...payData,
                                      ['password']: value
                                    })
                                  }}
                                />
                              </Stack>
                            </>}
                          <Stack>
                            <Button variant='contained' onClick={() => {
                              setModal({
                                func: () => { onPay() },
                                icon: 'ion:card-outline',
                                title: '정말로 결제 하시겠습니까?'
                              })
                            }}>
                              결제하기
                            </Button>
                          </Stack>
                        </Stack>
                      </CardContent>
                    </>}
                </Card>
              </>}
          </Grid>
          <Grid item xs={12} md={4}>
            <CheckoutSummary
              enableDiscount
              total={_.sum(_.map(products, (item) => { return calculatorPrice(item).total }))}
              option_price={_.sum(_.map(products, (item) => { return calculatorPrice(item).option_price }))}
              subtotal={_.sum(_.map(products, (item) => { return calculatorPrice(item).subtotal }))}
            />
            {activeStep == 0 &&
              <>
                <Button
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  disabled={_.sum(_.map(products, (item) => { return item.quantity * item.product_sale_price })) <= 0}
                  onClick={onClickNextStep}
                >
                  고객정보 입력하기
                </Button>
              </>}
          </Grid>
        </Grid>
        {activeStep > 0 &&
          <>
            <Row style={{ width: '100%', justifyContent: 'space-between', maxWidth: '989px' }}>
              <Button startIcon={<Iconify icon="grommet-icons:form-previous" />} onClick={onClickPrevStep} variant="soft" size="small">
                이전 단계 돌아가기
              </Button>
              {activeStep == 1 &&
                <>
                  <Button
                    size="small"
                    variant="soft"
                    onClick={() => { }}
                    startIcon={<Iconify icon="eva:plus-fill" />}
                  >
                    배송지 추가하기
                  </Button>
                </>}
            </Row>
          </>}
      </Wrappers>
    </>
  )
}

export default Demo1
