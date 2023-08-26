import styled from 'styled-components'
import { Box, Tab, Tabs, Card, Grid, Divider, } from '@mui/material';
import { test_item } from 'src/data/test-data';
import { useSettingsContext } from 'src/components/settings';
import { ProductDetailsCarousel, ProductDetailsReview, ProductDetailsSummary } from 'src/views/e-commerce/details';
import { useEffect, useState } from 'react';
import { SkeletonProductDetails } from 'src/components/skeleton';
import { apiShop, getProductByUser, getProductReviewsByUser } from 'src/utils/api-shop';
import dynamic from 'next/dynamic'
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
})
const Wrapper = styled.div`
display:flex;
flex-direction:column;
min-height:76vh;
`
const ContentWrapper = styled.div`
max-width:1200px;
width:90%;
margin: 1rem auto;
`
const Demo1 = (props) => {
  const {
    data: {

    },
    func: {
      router
    },
  } = props;
  const { themeStretch } = useSettingsContext();

  const [loading, setLoading] = useState(true);

  const [currentTab, setCurrentTab] = useState('description');
  const [item, setItem] = useState({});
  const [product, setProduct] = useState({});
  const [reviewPage, setReviewPage] = useState(1);
  const [reviewContent, setReviewContent] = useState({});
  useEffect(() => {
    getItemInfo(1);
  }, [])

  const getItemInfo = async (review_page) => {
    let data = { ...product };
    if (Object.keys(data).length == 0) {
      data = await apiShop(`/product/${router.query?.id}`, 'get')
      console.log(data)
      data['sub_images'] = [];
      for (var i = 0; i < 5; i++) {
        data['sub_images'].push(data?.product_img)
      }
      data['images'] = data['sub_images'];
    }

    setProduct(data);
    setLoading(false);
  }
  const TABS = [
    {
      value: 'description',
      label: '상품설명',
      component: product?.product_description ?
        <ReactQuill
          className='none-padding'
          value={product?.product_description ?? `<body></body>`}
          readOnly={true}
          theme={"bubble"}
          bounds={'.app'}
        /> : null,
    },
    {
      value: 'reviews',
      label: `상품후기 (${reviewContent?.total ?? 0})`,
      component: product ? <ProductDetailsReview product={product} reviewContent={reviewContent} onChangePage={getItemInfo} /> : null,
    },
  ];

  return (
    <>
      <Wrapper>
        <ContentWrapper>
          {loading ?
            <SkeletonProductDetails />
            :
            <>
              {product && (
                <>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6} lg={7}>
                      <ProductDetailsCarousel product={product} />
                    </Grid>

                    <Grid item xs={12} md={6} lg={5}>
                      <ProductDetailsSummary
                        product={product}
                        cart={""}
                        onAddCart={() => { }}
                        onGotoStep={() => { }}
                      />
                    </Grid>
                  </Grid>
                  <Card style={{
                    marginTop: '2rem'
                  }}>
                    <Tabs
                      value={currentTab}
                      onChange={(event, newValue) => setCurrentTab(newValue)}
                      sx={{ px: 3, bgcolor: 'background.neutral' }}
                    >
                      {TABS.map((tab) => (
                        <Tab key={tab.value} value={tab.value} label={tab.label} />
                      ))}
                    </Tabs>
                    <Divider />
                    {TABS.map(
                      (tab) =>
                        tab.value === currentTab && (
                          <Box
                            key={tab.value}
                            sx={{
                              ...(currentTab === 'description' && {
                                p: 3,
                              }),
                            }}
                          >
                            {tab.component}
                          </Box>
                        )
                    )}
                  </Card>
                </>
              )}
            </>}
        </ContentWrapper>
      </Wrapper>
    </>
  )
}
export default Demo1
