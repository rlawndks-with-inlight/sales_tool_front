import { useState } from "react";
import styled from "styled-components"

const Contract = () => {

    const [activeStep, setActiveStep] = useState(0);
    return (
        <>
            {activeStep == 0 &&
                <>
                    상품 선택
                </>}
            {activeStep == 1 &&
                <>
                    고객정보입력
                </>}
            {activeStep == 2 &&
                <>
                    새로운 영업자일시 영업자 가입
                </>}
            {activeStep == 3 &&
                <>
                    계약서 작성
                </>}
            {activeStep == 4 &&
                <>
                    완료
                </>}
        </>
    )
}
export default Contract;