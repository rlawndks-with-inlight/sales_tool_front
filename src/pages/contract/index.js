import { useEffect } from "react";
import { useState } from "react";
import AddContract from "src/views/contract/AddContract";
import AddSalesMan from "src/views/contract/AddSalesMan";
import InsertCustomer from "src/views/contract/InsertCustomer";
import SelectItems from "src/views/contract/SelectItems";
import styled from "styled-components"

const Contract = () => {

    const [activeStep, setActiveStep] = useState(0);

    useEffect(() => {
        settingPage(activeStep);
    }, [activeStep])
    const settingPage = (step) => {
        if (step == 0) {

        }
    }

    return (
        <>
            {activeStep == 0 &&
                <>
                    <SelectItems />
                </>}
            {activeStep == 1 &&
                <>
                    <InsertCustomer />
                </>}
            {activeStep == 2 &&
                <>
                    <AddSalesMan />
                </>}
            {activeStep == 3 &&
                <>
                    <AddContract />
                </>}
            {activeStep == 4 &&
                <>
                    완료
                </>}
        </>
    )
}
export default Contract;