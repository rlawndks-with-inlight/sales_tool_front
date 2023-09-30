import ReactPDF, { PDFViewer } from '@react-pdf/renderer';
import { Font, Page, StyleSheet, Document, Text, Image, View, PDFDownloadLink } from '@react-pdf/renderer';
import { Col, Row } from 'src/components/elements/styled-components';
import Logo from 'src/components/logo/Logo';
import { useSettingsContext } from 'src/components/settings';
import { logoSrc } from 'src/data/data';
import { fCurrency } from 'src/utils/formatNumber';
import { commarNumber, returnMoment } from 'src/utils/function';
import styled from 'styled-components';

const Wrappers = styled.div`
width:100%;
display:flex;
flex-direction:column;
`
const ContentWrappers = styled.div`

`
const RowSpaceBetween = styled.div`
display:flex;
justify-content:space-between;
padding:0 1rem;
`
Font.register({ family: 'Noto Sans CJK KR', src: '/fonts/NotoSansKR-Regular.ttf' });

const EstimateData = (props) => {
    const { themeDnsData } = useSettingsContext();
    const {
        previewIndex,
        products,
        style,
        class_name,
        customer,
        product,
    } = props;
    const styles = StyleSheet.create({
        col: {
            display: 'flex',
            flexDirection: 'column',
            rowGap: 2,
            
        },
        row: {
            display: 'flex',
        },
        title: {
            fontSize: 24,
            fontFamily: 'Oswald'
        },
        text: {
            fontSize: 14,
            fontFamily:'Noto Sans CJK KR'
        },
    });
    const renderPdfPage = (product, idx) => {
        const { budget, select_groups, price } = product;
        return <>
            <Document style={{
                width: '100vw',
                maxWidth: '420px',
                height: '594px'
            }}>
                <Page
                    size={'A4'}
                    style={{
                        display: `${idx == previewIndex ? '' : 'none'}`,
                        ...style,
                    }}>
                    <View style={{ ...styles.row, justifyContent: 'space-between', padding: 16, }}>
                        <View style={styles.col}>
                            <View style={styles.row}>
                                <Text style={styles.text}>
                                    수신:
                                </Text>
                                <Text style={styles.text}>
                                    {customer?.name}
                                </Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.text}>
                                    연락처:
                                </Text>
                                <Text style={styles.text}>
                                    {customer?.phone_num}
                                </Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.text}>
                                    견적일자:
                                </Text>
                                <Text style={styles.text}>
                                    {returnMoment().substring(0, 10)}
                                </Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.text}>
                                    아래와 같이 견적합니다.
                                </Text>
                            </View>
                            <View style={{
                                ...styles.row,
                                backgroundColor: themeDnsData?.theme_css?.main_color,
                                padding: 16
                            }}>
                                <Text style={styles.text}>
                                    TOTAL PRICE:
                                </Text>
                                <Text style={styles.text}>
                                    {commarNumber((budget?.budget_price || price) + _.sum(select_groups.map((group => { return group?.option_price ?? 0 }))))} 원
                                </Text>
                            </View>
                        </View>
                        <View style={styles.col}>
                            <View style={styles.row}>
                                <Text style={styles.text}>
                                    발신:
                                </Text>
                                <Text style={styles.text}>
                                    {themeDnsData.name}
                                </Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.text}>
                                    본사:
                                </Text>
                                <Text style={styles.text}>
                                    {themeDnsData.addr}
                                </Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.text}>
                                    발신자:
                                </Text>
                                <Text style={styles.text}>
                                    {themeDnsData.ceo_name}
                                </Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.text}>
                                    HP:
                                </Text>
                                <Text style={styles.text}>
                                    {themeDnsData.phone_num}
                                </Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.text}>
                                    Tel:
                                </Text>
                                <Text style={styles.text}>
                                    {themeDnsData.phone_num}
                                </Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.text}>
                                    Fax:
                                </Text>
                                <Text style={styles.text}>
                                    {themeDnsData?.fax_num}
                                </Text>
                            </View>
                        </View>
                    </View>
                </Page>
            </Document>
        </>
    }
    if(product){
        return renderPdfPage(product, )
    }
    return (
        <>
            {products.map((product, idx) => {
                if(idx == previewIndex){
                    return renderPdfPage(product, idx)
                }
            })}
        </>
    )
}

export default EstimateData;