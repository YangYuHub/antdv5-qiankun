import { Settings as LayoutSettings } from '@ant-design/pro-layout';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'dark',
  // 拂晓蓝
  primaryColor: '#1890ff',
  layout: 'side',
  contentWidth: 'Fluid',
  fixSiderbar: true,
  colorWeak: false,
  fixedHeader: false,
  splitMenus: false,
  footerRender: false,
  headerRender: false,
  menuHeaderRender: false,
  title: 'Ant Design Pro',
  pwa: false,
  iconfontUrl: '',
  logo: 'https://storage.googleapis.com/onebyus-dev-public/ARTICLE_IMG/71736e766c2b4db0a3c0dc674290659e.png',
};

export default Settings;
