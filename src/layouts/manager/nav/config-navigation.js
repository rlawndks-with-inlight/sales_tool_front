// routes
import { PATH_MANAGER } from '../../../routes/paths';
// components
import SvgColor from '../../../components/svg-color';
import { useAuthContext } from 'src/auth/useAuthContext';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  user: icon('ic_user'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
};

const navConfig = () => {
  const { user } = useAuthContext();

  const isDeveloper = () => {
    return user?.level >= 50
  }
  return [
    // GENERAL
    // ----------------------------------------------------------------------
    {
      items: [
        { title: '대시보드', path: PATH_MANAGER.dashboards, icon: ICONS.dashboard },
      ],
    },
    // MANAGEMENT
    // ----------------------------------------------------------------------
    {
      items: [
        {
          title: '상품관리',
          path: PATH_MANAGER.product.root,
          icon: ICONS.user,
          children: [
            { title: '상품관리', path: PATH_MANAGER.product.list },
            { title: '상품카테고리관리', path: PATH_MANAGER.product.category.list },
          ],
        },
      ],
    },
    {
      items: [
        {
          title: '고객관리',
          path: PATH_MANAGER.user.root,
          icon: ICONS.user,
          children: [
            { title: '회원관리', path: PATH_MANAGER.user.list },
          ],
        },
      ],
    },

    {
      items: [
        {
          title: '계약관리',
          path: PATH_MANAGER.contract.root,
          icon: ICONS.user,
          children: [
            { title: '계약관리', path: PATH_MANAGER.contract.list },
          ],
        },
      ],
    },
    {
      items: [
        {
          title: '영업자관리',
          path: PATH_MANAGER.salesMan.root,
          icon: ICONS.user,
          children: [
            { title: '영업자관리', path: PATH_MANAGER.salesMan.list },
            { title: '영업자조직도', path: PATH_MANAGER.salesMan.organizationChart },
          ],
        },
      ],
    },
   
    {
      items: [
        {
          title: '설정관리',
          path: PATH_MANAGER.brand.root,
          icon: ICONS.user,
          children: [
            { title: '기본설정', path: PATH_MANAGER.brand.edit },
            { title: '브랜드관리', path: PATH_MANAGER.brand.list },
          ],
        },
      ],
    },
    ...(isDeveloper() ? [
      {
        items: [
          {
            title: '로그관리',
            path: PATH_MANAGER.log.root,
            icon: ICONS.user,
            children: [
              { title: '로그관리', path: PATH_MANAGER.log.list },
            ],
          },
        ],
      },
    ] : [])
  ];
}

export default navConfig;
