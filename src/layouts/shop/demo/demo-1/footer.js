import { useTheme } from "@emotion/react"
import styled from "styled-components"

const Wrapper = styled.footer`
width:100%;
padding: 2rem 0 3rem 0;
margin-top:auto;
background:#eeeeee88;
`
const ContentWrapper = styled.div`
display:flex;
flex-direction:column;
width:90%;
max-width:1600px;
margin: 0 auto;
`
const Row = styled.div`
display:flex;
`
const Bold = styled.div`
font-weight:bold;
margin-right:0.5rem;
`
const MarginRight = styled.div`
margin-right:0.5rem;
`
const Footer = (props) => {

  const theme = useTheme();

  return (
    <>
      <Wrapper>
        <ContentWrapper>
          <Row>
            <Bold style={{ marginRight: '1rem', cursor: 'pointer' }}>회사소개</Bold>
            <Bold style={{ marginRight: '1rem', cursor: 'pointer' }}>서비스이용약관</Bold>
            <Bold style={{ cursor: 'pointer' }}>개인정보처리방침</Bold>
          </Row>
          <Row>
            <Bold>회사명</Bold>
            <MarginRight></MarginRight>
            <Bold>주소</Bold>
            <MarginRight></MarginRight>
          </Row>
          <Row>
            <Bold>사업자 등록번호</Bold>
            <MarginRight></MarginRight>
            <Bold>대표</Bold>
            <MarginRight></MarginRight>
            <Bold>전화</Bold>
            <MarginRight></MarginRight>
            <Bold>팩스</Bold>
            <MarginRight></MarginRight>
          </Row>
          <Row>
            <Bold>개인정보 보호책임자</Bold>
            <MarginRight></MarginRight>
          </Row>
          <Row>
            <MarginRight></MarginRight>
          </Row>
        </ContentWrapper>
      </Wrapper>
    </>
  )
}
export default Footer
