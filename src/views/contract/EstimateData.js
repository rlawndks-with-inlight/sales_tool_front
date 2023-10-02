import ReactPDF, { PDFViewer } from '@react-pdf/renderer';
import { Font, Page, StyleSheet, Document, Text, Image, View, PDFDownloadLink } from '@react-pdf/renderer';
import { Col, Row } from 'src/components/elements/styled-components';
import Logo from 'src/components/logo/Logo';
import { useSettingsContext } from 'src/components/settings';
import { logoSrc } from 'src/data/data';
import { fCurrency } from 'src/utils/formatNumber';
import { commarNumber, returnMoment } from 'src/utils/function';
import styled from 'styled-components';
import jsPDF from "jspdf";
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

Font.register({ family: 'Noto Sans CJK KR', src: '/fonts/NotoSansKR-Regular.ttf' });

const table_head_list = [
    '제품디자인',
    '모델',
    '사양',
    '수량',
    '단가',
    '금액',
    '비고',
]
const TableCellComponent = styled(TableCell)`
border-right: 1px solid #ccc;
border-bottom: 1px solid #ccc;
padding: 0 0.5rem 1rem 0.5rem;
align-items:center;
text-align:center;
`
const EstimateData = (props) => {
    const { themeDnsData } = useSettingsContext();
    const {
        previewIndex,
        products,
        style,
        class_name,
        customer,
        product,
        dns_data,
        estimate,
    } = props;
    const styles = StyleSheet.create({
        col: {
            display: 'flex',
            flexDirection: 'column',
            rowGap: 2,
        },
        row: {
            display: 'flex',
            columnGap: 2
        },
        title: {
            fontSize: 20,
            fontFamily: 'Noto Sans CJK KR'
        },
        text: {
            fontSize: 12,
            fontFamily: 'Noto Sans CJK KR'
        },
        table_head_cell: {
            padding: '0 0.5rem 1rem 0.5rem'
        }
    });
    const renderPdfPage = (product, products) => {
        const { budget, select_groups=[], price, count, name, characters=[], } = product;
        let dnsData = themeDnsData || dns_data;
        return <>
            <Col style={{
                ...style,
                padding: 16,
                width: '100%'
            }}
            >
                <Row style={{ alignItems: 'center' }}>
                    <img src={logoSrc()} style={{ height: '28px', width: 'auto' }} />
                    <div style={{ ...styles.title, margin: '0 auto', width: '50%' }}>{estimate?.title}</div>
                    <div />
                </Row>
                <Row style={{ ...styles.row, justifyContent: 'space-between', }}>
                    <Row style={styles.col}>
                        <Row style={styles.row}>
                            <div style={styles.text}>
                                수신:
                            </div>
                            <div style={styles.text}>
                                {customer?.name}
                            </div>
                        </Row>
                        <Row style={styles.row}>
                            <div style={styles.text}>
                                연락처:
                            </div>
                            <div style={styles.text}>
                                {customer?.phone_num}
                            </div>
                        </Row>
                        <Row style={styles.row}>
                            <div style={styles.text}>
                                견적일자:
                            </div>
                            <div style={styles.text}>
                                {returnMoment().substring(0, 10)}
                            </div>
                        </Row>
                        <Row style={styles.row}>
                            <div style={styles.text}>
                                아래와 같이 견적합니다.
                            </div>
                        </Row>
                        <Row style={{
                            ...styles.row,
                            backgroundColor: themeDnsData?.theme_css?.main_color,
                            padding: `0.4rem 1rem 1rem 1rem`,
                            marginTop: '1rem'
                        }}>
                            <div style={styles.text}>
                                TOTAL PRICE: {count}개 기준
                            </div>
                            <div style={styles.text}>
                                {commarNumber(((budget?.budget_price || price) + _.sum(select_groups.map((group => { return group?.option_price ?? 0 })))) * count)} 원 (부가세포함가)
                            </div>
                        </Row>
                    </Row>
                    <Row style={{ ...styles.col, alignItems: 'end' }}>
                        <Row style={styles.row}>
                            <div style={styles.text}>
                                발신:
                            </div>
                            <div style={styles.text}>
                                {dnsData.name}
                            </div>
                        </Row>
                        <Row style={styles.row}>
                            <div style={styles.text}>
                                본사:
                            </div>
                            <div style={styles.text}>
                                {dnsData.addr}
                            </div>
                        </Row>
                        <Row style={styles.row}>
                            <div style={styles.text}>
                                발신자:
                            </div>
                            <div style={styles.text}>
                                {dnsData.ceo_name}
                            </div>
                        </Row>
                        <Row style={styles.row}>
                            <div style={styles.text}>
                                HP:
                            </div>
                            <div style={styles.text}>
                                {dnsData.phone_num}
                            </div>
                        </Row>
                        <Row style={styles.row}>
                            <div style={styles.text}>
                                Tel:
                            </div>
                            <div style={styles.text}>
                                {dnsData.phone_num}
                            </div>
                        </Row>
                        <Row style={styles.row}>
                            <div style={styles.text}>
                                Fax:
                            </div>
                            <div style={styles.text}>
                                {dnsData?.fax_num}
                            </div>
                        </Row>
                    </Row>
                </Row>
                <Table style={{
                    marginTop: '1rem'
                }}
                >
                    <TableHead>
                        <TableRow>
                            {table_head_list.map((text, idx) => (
                                <>
                                    <TableCellComponent sx={styles.table_head_cell} style={{ borderTop: '1px solid #ccc', borderLeft: `${idx == 0 ? '1px solid #ccc' : ''}` }}>{text}</TableCellComponent>
                                </>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody style={{ borderLeft: '1px solid #ccc' }}>
                        <TableRow>
                            <TableCellComponent rowSpan={select_groups?.length + characters?.length + 1}>
                                <img src={product?.product_img} style={{ width: '150px' }} />
                            </TableCellComponent>
                            <TableCellComponent>상품명</TableCellComponent>
                            <TableCellComponent>{product?.name}</TableCellComponent>
                            <TableCellComponent rowSpan={select_groups?.length + characters?.length + 1}>{product?.count}</TableCellComponent>
                            <TableCellComponent rowSpan={select_groups?.length + characters?.length + 1}>{commarNumber(product?.price)}</TableCellComponent>
                            <TableCellComponent rowSpan={select_groups?.length + characters?.length + 1}>{commarNumber(product?.price * product?.count)}</TableCellComponent>
                            <TableCellComponent rowSpan={select_groups?.length + characters?.length + 1}>{estimate?.etc}</TableCellComponent>
                        </TableRow>
                        {select_groups && select_groups.map((group, idx) => (
                            <>
                                <TableRow>
                                    <TableCellComponent>{group?.group_name}</TableCellComponent>
                                    <TableCellComponent>{group?.option_name}</TableCellComponent>
                                </TableRow>
                            </>
                        ))}
                        {characters && characters.map((character, idx) => (
                            <>
                                <TableRow>
                                    <TableCellComponent>{character?.character_key}</TableCellComponent>
                                    <TableCellComponent>{character?.character_value}</TableCellComponent>
                                </TableRow>
                            </>
                        ))}
                        <TableRow>
                            <TableCellComponent colSpan={3}>배송 및 설치비</TableCellComponent>
                            <TableCellComponent>{commarNumber(estimate?.install_count)}</TableCellComponent>
                            <TableCellComponent>{commarNumber(estimate?.install_price)}</TableCellComponent>
                            <TableCellComponent>{commarNumber(estimate?.install_price * estimate?.install_count)}</TableCellComponent>
                            <TableCellComponent></TableCellComponent>
                        </TableRow>
                        <TableRow>
                            <TableCellComponent colSpan={3}>총합계</TableCellComponent>
                            <TableCellComponent></TableCellComponent>
                            <TableCellComponent colSpan={2}>
                                <Row style={{ justifyContent: 'space-between' }}>
                                    <div>{commarNumber(product?.price * product?.count + estimate?.install_price * estimate?.install_count)}</div>
                                    <div>원</div>
                                </Row>
                            </TableCellComponent>
                            <TableCellComponent></TableCellComponent>
                        </TableRow>
                    </TableBody>
                </Table>
            </Col>
        </>
    }
    if (product) {
        return renderPdfPage(product,)
    }
    return (
        <>
            {products.map((product, idx) => {
                return renderPdfPage(product, idx)
            })}
        </>
    )
}

export default EstimateData;