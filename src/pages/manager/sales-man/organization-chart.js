// next
import Head from 'next/head';
import { Container, Typography } from '@mui/material';
// layouts
import ManagerLayout from 'src/layouts/manager/ManagerLayout';
// components
import { useSettingsContext } from 'src/components/settings';
import Block from 'src/components/settings/drawer/Block';
import _mock from 'src/_mock/_mock';
import OrganizationalChart from 'src/components/organizational-chart';
// ----------------------------------------------------------------------


// ----------------------------------------------------------------------
const createData = (name, group, role, avatar) => ({
    name,
    group,
    role,
    avatar,
});
const SIMPLE_DATA = {
    ...createData('tasha mcneill', 'root', 'ceo, co-founder', _mock.image.avatar(1)),
    children: [
        {
            ...createData('john stone', 'product design', 'lead', _mock.image.avatar(2)),
            children: [
                {
                    ...createData('rimsha wynn', 'product design', 'senior', _mock.image.avatar(3)),
                    children: null,
                },
            ],
        },
        {
            ...createData('ponnappa priya', 'development', 'lead', _mock.image.avatar(4)),
            children: [
                {
                    ...createData('tyra elliott', 'development', 'senior', _mock.image.avatar(5)),
                    children: [
                        {
                            ...createData(
                                'sheridan mckee',
                                'development',
                                'back end developer',
                                _mock.image.avatar(6)
                            ),
                            children: [
                                {
                                    ...createData(
                                        'ang li',
                                        'development',
                                        'back end developer',
                                        _mock.image.avatar(7)
                                    ),
                                    children: null,
                                },
                            ],
                        },
                        {
                            ...createData('hope ahmad', 'development', 'front end', _mock.image.avatar(8)),
                            children: null,
                        },
                    ],
                },
            ],
        },
        {
            ...createData('peter stanbridge', 'marketing', 'lead', _mock.image.avatar(9)),
            children: [
                {
                    ...createData('madeline harding', 'marketing', 'support', _mock.image.avatar(10)),
                    children: null,
                },
                {
                    ...createData('eoin medrano', 'marketing', 'content writer', _mock.image.avatar(11)),
                    children: null,
                },
            ],
        },
    ],
};
const SalesManOrganizationChart = () => {
    const { themeStretch } = useSettingsContext();

    return (
        <>
            <Block sx={{ overflow: 'auto' }}>
                <OrganizationalChart data={SIMPLE_DATA} variant="standard" lineHeight="40px" />

            </Block>
        </>
    );
}
SalesManOrganizationChart.getLayout = (page) => <ManagerLayout>{page}</ManagerLayout>;

export default SalesManOrganizationChart;
