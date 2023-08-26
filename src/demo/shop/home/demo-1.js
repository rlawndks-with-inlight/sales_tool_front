import { useSettingsContext } from "src/components/settings";
import styled from "styled-components";
import Slider from 'react-slick'
import { Icon } from "@iconify/react";
import { useState } from "react";
import { m } from 'framer-motion'
import { Items, Row, themeObj } from "src/components/elements/styled-components";
import { Button } from "@mui/material";
import { useEffect } from "react";

const Wrappers = styled.div`
width:100%;
min-height:100vh;
display:flex;
flex-direction:column;
`
const FitWrappers = styled.div`
width:90%;
max-width:1600px;
margin: 1rem auto;
`
const BannerImgContent = styled.div`
display:flex;
position: relative;
width: 78vw;
height: 39vw;
background-size: 100%;
background-repeat: no-repeat;
background-position: center;
border-radius:${props => props.img_list_length >= 3 ? '1rem' : '0'};
animation: ${props => props.iscurrentSlideIndex ? 'zoom-in-out' : ''} 10s ease-in-out infinite;
@keyframes zoom-in-out {
    0% {
        background-size: 100%;
    }
    50% {
        background-size: 105%;
    }
    100% {
        background-size: 100%;
    }
  }
@media (max-width:1200px) {
    width: 100vw;
    height: 50vw;
    border-radius:0;
}
}
`
const TextContainer = styled.div`
display:flex;
flex-direction:column;
position:absolute;
right:8rem;
top:12vw;
z-index:10;
align-items:end;
row-gap:1rem;
@media (max-width:1200px) {
    right:4rem;
    top:10vw;
    row-gap:0rem;
}
`
const SlideTitle = styled.div`
font-size:${themeObj.font_size.size2};
font-weight:bold;
color:#fff;
@media (max-width:1200px) {
font-size:${themeObj.font_size.size3};
}
@media (max-width:600px) {
font-size:${themeObj.font_size.size4};
}
`
const NextArrowStyle = styled.div`
  position: absolute;
    top: 18vw;
    right: 12px;
    z-index: 2;
    width: 3rem;
    height: 3rem;
    cursor: pointer;
    font-size: 28px;
    border-radius: 50%;
    background: #aaaaaa55;
    color: #fff !important;
    display: flex;
    @media (max-width:1200px) {
      top: 22vw;
      font-size: 1rem;
      width: 1.5rem;
      height: 1.5rem;
    }
  `
const PrevArrowStyle = styled.div`
  position: absolute;
  top: 18vw;
  left: 12px;
  z-index: 2;
  cursor: pointer;
  font-size: 28px;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: #aaaaaa55;
  color: #fff !important;
  display: flex;
  @media (max-width:1200px) {
    top: 22vw;
    font-size: 1rem;
    width: 1.5rem;
    height: 1.5rem;
  }
  `
const NextArrow = ({ onClick, sx }) => {
    return (
        <NextArrowStyle onClick={onClick} style={{ ...sx }}>
            <Icon style={{ color: '#fff', margin: 'auto' }} icon={'ooui:previous-rtl'} />
        </NextArrowStyle>
    );
};

const PrevArrow = ({ onClick, sx }) => {
    return (
        <PrevArrowStyle onClick={onClick} style={{ ...sx }}>
            <Icon style={{ color: '#fff', margin: 'auto' }} icon={'ooui:previous-ltr'} />
        </PrevArrowStyle>
    );
};
const TabContainer = styled.div`
display:flex;
margin-left: 0;
margin-top: 1rem;
column-gap: 0.5rem;
row-gap: 0.5rem;
overflow-x: auto;
white-space: nowrap;
flex-direction: row;
@media (max-width:1000px) {
    flex-direction:row;
    margin-left: auto;
}
`
const CategoryTabs = (props) => {
    const {
        category_list,
        onClickCategory,
        curCategoryId
    } = props;
    return (
        <>
            <TabContainer>
                <Button variant={curCategoryId == 0 ? `contained` : `outlined`} sx={{ height: '36px' }} onClick={() => {
                    onClickCategory(0);
                }}>
                    전체
                </Button>
                {category_list && category_list.map((item, index) => (
                    <>
                        <Button variant={curCategoryId == item?.id ? `contained` : `outlined`} sx={{ height: '36px' }} onClick={() => {
                            onClickCategory(item?.id);
                        }}>
                            {item?.name}
                        </Button>
                    </>
                ))}
            </TabContainer>
        </>
    )
}
const Demo1 = (props) => {
    const {
        data: {

        },
        func: {
            router
        },
    } = props;
    const img_list = [
        '/images/test/visual_011.jpg',
        '/images/test/visual_012.jpg',
        '/images/test/visual_013.jpg',
    ]
    const { themeShopSetting } = useSettingsContext();
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const [curCategoryId, setCurCategoryId] = useState(0);
    const afterChangeHandler = (currentSlide) => {
        setCurrentSlideIndex(currentSlide);
    };

    let slide_setting = {
        centerMode: true,
        centerPadding: (themeShopSetting?.products.length >= 3 ? (window.innerWidth > 1200 ? '10%' : 0) : 0), // 이미지 간격을 조절할 수 있는 값입니다.
        infinite: true,
        speed: 500,
        autoplay: false,
        autoplaySpeed: 2500,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        nextArrow: <NextArrow onClick />,
        prevArrow: <PrevArrow onClick />,
        afterChange: afterChangeHandler,
    }
    const fadeInUpVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };
    const onClickCategory = (id) => {
        setCurCategoryId(id);
    }
    useEffect(() => {
    }, [curCategoryId])
    return (
        <>
            <Wrappers>
                <Slider {...slide_setting}>
                    {img_list.map((item, index) => (
                        <>
                            <BannerImgContent
                                img_list_length={themeShopSetting?.products.length}
                                iscurrentSlideIndex={currentSlideIndex == index}
                                style={{
                                    width: `${img_list.length >= 3 ? '' : '100vw'}`,
                                    backgroundImage: `url(${item})`,
                                }}
                            >
                                {currentSlideIndex == index &&
                                    <>
                                        <TextContainer>
                                            {item?.name &&
                                                <m.div
                                                    initial="hidden"
                                                    animate="visible"
                                                    variants={fadeInUpVariants}
                                                >
                                                    <SlideTitle>
                                                        {item?.name}
                                                    </SlideTitle>
                                                </m.div>
                                            }
                                        </TextContainer>
                                    </>}
                            </BannerImgContent>
                        </>
                    ))}
                </Slider>
                <FitWrappers>
                    <CategoryTabs onClickCategory={onClickCategory} category_list={themeShopSetting?.product_categories} curCategoryId={curCategoryId} />
                    <Row>
                        <Items items={themeShopSetting?.products && themeShopSetting?.products.filter(item => item?.category_id == curCategoryId || curCategoryId == 0)} />
                    </Row>
                    <div style={{ fontSize: themeObj.font_size.size3, fontWeight: 'bold', marginTop: '3rem' }}>핫한상품</div>
                    <div style={{ fontSize: themeObj.font_size.size5, color: themeObj.grey[500] }}>핫한상품을 만나 보세요!</div>
                    <Row>
                        <Items items={themeShopSetting?.products} />
                    </Row>
                    <div style={{ fontSize: themeObj.font_size.size3, fontWeight: 'bold', marginTop: '3rem' }}>인기상품</div>
                    <div style={{ fontSize: themeObj.font_size.size5, color: themeObj.grey[500] }}>인기상품을 만나 보세요!</div>
                    <Row>
                        <Items items={themeShopSetting?.products} />
                    </Row>
                </FitWrappers>

            </Wrappers>
        </>
    )
}
export default Demo1;