import { Settings as ProSettings } from '@ant-design/pro-layout';

type DefaultSettings = ProSettings & {
  pwa: boolean;
  logo?: string;
};

const proSettings: DefaultSettings = {
  navTheme: 'dark',
  // 拂晓蓝
  primaryColor: '#1890ff',
  layout: 'top',
  contentWidth: 'Fluid',
  fixedHeader: true,
  fixSiderbar: true,
  colorWeak: false,
  footerRender: false,
  // menu: {
  //   locale: true,
  // },
  title: 'Ant Design Pro',
  pwa: false,
  iconfontUrl: '',
  logo: 'https://storage.googleapis.com/onebyus-dev-public/ARTICLE_IMG/71736e766c2b4db0a3c0dc674290659e.png',
};

export type { DefaultSettings };

export default proSettings;
