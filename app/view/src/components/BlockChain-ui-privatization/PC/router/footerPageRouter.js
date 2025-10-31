import { routerEnv } from '@/utils';

export default [
  /* footer 链接 */
  {
    path: `${routerEnv}/footerPage`,
    name: 'footerPage',
    component: () => import('@/views/footerPage/index.vue'),
    children: [
      {
        path: `about`,
        name: 'about',
        meta: {
          theme: 'homeOther',
          navigation: '1', // 国际版中使用横向导航
          hideFooter: 'false', // 不隐藏footer
          pageTitle: 'about',
        },
        component: () => import('@/views/footerPage/about.vue'),
      },
      {
        path: `amlKycPolicy`,
        name: 'amlKycPolicy',
        meta: {
          theme: 'homeOther',
          navigation: '1', // 国际版中使用横向导航
          hideFooter: 'false', // 不隐藏footer
          pageTitle: 'amlKycPolicy',
        },
        component: () => import('@/views/footerPage/amlKycPolicy.vue'),
      },{
        path: `announcements`,
        name: 'announcements',
        meta: {
          theme: 'homeOther',
          navigation: '1', // 国际版中使用横向导航
          hideFooter: 'false', // 不隐藏footer
          pageTitle: 'announcements',
        },
        component: () => import('@/views/footerPage/announcements.vue'),
      },{
        path: `blog`,
        name: 'blog',
        meta: {
          theme: 'homeOther',
          navigation: '1', // 国际版中使用横向导航
          hideFooter: 'false', // 不隐藏footer
          pageTitle: 'blog',
        },
        component: () => import('@/views/footerPage/blog.vue'),
      },{
        path: `bluesparrowToken`,
        name: 'bluesparrowToken',
        meta: {
          theme: 'homeOther',
          navigation: '1', // 国际版中使用横向导航
          hideFooter: 'false', // 不隐藏footer
          pageTitle: 'bluesparrowToken',
        },
        component: () => import('@/views/footerPage/bluesparrowToken.vue'),
      },{
        path: `blueVinci`,
        name: 'blueVinci',
        meta: {
          theme: 'homeOther',
          navigation: '1', // 国际版中使用横向导航
          hideFooter: 'false', // 不隐藏footer
          pageTitle: 'blueVinci',
        },
        component: () => import('@/views/footerPage/blueVinci.vue'),
      },{
        path: `charity`,
        name: 'charity',
        meta: {
          theme: 'homeOther',
          navigation: '1', // 国际版中使用横向导航
          hideFooter: 'false', // 不隐藏footer
          pageTitle: 'charity',
        },
        component: () => import('@/views/footerPage/charity.vue'),
      },{
        path: `community`,
        name: 'community',
        meta: {
          theme: 'homeOther',
          navigation: '1', // 国际版中使用横向导航
          hideFooter: 'false', // 不隐藏footer
          pageTitle: 'charity',
        },
        component: () => import('@/views/footerPage/community.vue'),
      },{
        path: `contact`,
        name: 'contact',
        meta: {
          theme: 'homeOther',
          navigation: '1', // 国际版中使用横向导航
          hideFooter: 'false', // 不隐藏footer
          pageTitle: 'contact',
        },
        component: () => import('@/views/footerPage/contact.vue'),
      },{
        path: `downoadApp`,
        name: 'downoadApp',
        meta: {
          theme: 'homeOther',
          navigation: '1', // 国际版中使用横向导航
          hideFooter: 'false', // 不隐藏footer
          pageTitle: 'downoadApp',
        },
        component: () => import('@/views/footerPage/downoadApp.vue'),
      },{
        path: `IEO`,
        name: 'IEO',
        meta: {
          theme: 'homeOther',
          navigation: '1', // 国际版中使用横向导航
          hideFooter: 'false', // 不隐藏footer
          pageTitle: 'downoadApp',
        },
        component: () => import('@/views/footerPage/IEO.vue'),
      },{
        path: `marketing`,
        name: 'marketing',
        meta: {
          theme: 'homeOther',
          navigation: '1', // 国际版中使用横向导航
          hideFooter: 'false', // 不隐藏footer
          pageTitle: 'marketing',
        },
        component: () => import('@/views/footerPage/marketing.vue'),
      },{
        path: `press`,
        name: 'press',
        meta: {
          theme: 'homeOther',
          navigation: '1', // 国际版中使用横向导航
          hideFooter: 'false', // 不隐藏footer
          pageTitle: 'press',
        },
        component: () => import('@/views/footerPage/press.vue'),
      },{
        path: `privacyPolicy`,
        name: 'privacyPolicy',
        meta: {
          theme: 'homeOther',
          navigation: '1', // 国际版中使用横向导航
          hideFooter: 'false', // 不隐藏footer
          pageTitle: 'privacyPolicy',
        },
        component: () => import('@/views/footerPage/privacyPolicy.vue'),
      },{
        path: `risk`,
        name: 'risk',
        meta: {
          theme: 'homeOther',
          navigation: '1', // 国际版中使用横向导航
          hideFooter: 'false', // 不隐藏footer
          pageTitle: 'risk',
        },
        component: () => import('@/views/footerPage/risk.vue'),
      },{
        path: `security`,
        name: 'security',
        meta: {
          theme: 'homeOther',
          navigation: '1', // 国际版中使用横向导航
          hideFooter: 'false', // 不隐藏footer
          pageTitle: 'security',
        },
        component: () => import('@/views/footerPage/security.vue'),
      },{
        path: `siteMap`,
        name: 'siteMap',
        meta: {
          theme: 'homeOther',
          navigation: '1', // 国际版中使用横向导航
          hideFooter: 'false', // 不隐藏footer
          pageTitle: 'siteMap',
        },
        component: () => import('@/views/footerPage/siteMap.vue'),
      },{
        path: `staking`,
        name: 'staking',
        meta: {
          theme: 'homeOther',
          navigation: '1', // 国际版中使用横向导航
          hideFooter: 'false', // 不隐藏footer
          pageTitle: 'staking',
        },
        component: () => import('@/views/footerPage/staking.vue'),
      },{
        path: `support`,
        name: 'support',
        meta: {
          theme: 'homeOther',
          navigation: '1', // 国际版中使用横向导航
          hideFooter: 'false', // 不隐藏footer
          pageTitle: 'support',
        },
        component: () => import('@/views/footerPage/support.vue'),
      },{
        path: `termsOfService`,
        name: 'termsOfService',
        meta: {
          theme: 'homeOther',
          navigation: '1', // 国际版中使用横向导航
          hideFooter: 'false', // 不隐藏footer
          pageTitle: 'termsOfService',
        },
        component: () => import('@/views/footerPage/termsOfService.vue'),
      },{
        path: `tokenListing`,
        name: 'tokenListing',
        meta: {
          theme: 'homeOther',
          navigation: '1', // 国际版中使用横向导航
          hideFooter: 'false', // 不隐藏footer
          pageTitle: 'tokenListing',
        },
        component: () => import('@/views/footerPage/tokenListing.vue'),
      },{
        path: `fees`,
        name: 'fees',
        meta: {
          theme: 'homeOther',
          navigation: '1', // 国际版中使用横向导航
          hideFooter: 'false', // 不隐藏footer
          pageTitle: 'fees',
        },
        component: () => import('@/views/footerPage/fees.vue'),
      },{
        path: `apiPage`,
        name: 'apiPage',
        meta: {
          theme: 'homeOther',
          navigation: '1', // 国际版中使用横向导航
          hideFooter: 'false', // 不隐藏footer
          pageTitle: 'apiPage',
        },
        component: () => import('@/views/footerPage/apiPage.vue'),
      },{
        path: `userGuide`,
        name: 'userGuide',
        meta: {
          theme: 'homeOther',
          navigation: '1', // 国际版中使用横向导航
          hideFooter: 'false', // 不隐藏footer
          pageTitle: 'userGuide',
        },
        component: () => import('@/views/footerPage/userGuide.vue'),
      },
    ]
  },
]
