// next
import Head from 'next/head';
import { Container, Typography } from '@mui/material';
// layouts
import ManagerLayout from '../../layouts/manager';
// components
import { useSettingsContext } from '../../components/settings';

// ----------------------------------------------------------------------


// ----------------------------------------------------------------------

const Dashboards = () => {
    const { themeStretch } = useSettingsContext();

    return (
        <>
            <Container maxWidth={themeStretch ? false : 'xl'}>
            dashboards
            </Container>
        </>
    );
}
Dashboards.getLayout = (page) => <ManagerLayout>{page}</ManagerLayout>;

export default Dashboards;
