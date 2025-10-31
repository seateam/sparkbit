import Vue from "vue";
import Router from "vue-router";
import {
  commonRouter,
  personalRouter,
  exRouter,
} from "@/components/BlockChain-ui-privatization/PC/router";
import { setCookie, routerEnv } from "@/utils";
import { isH5Check } from "@/utils/newUtils";

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch((err) => err);
};

const evnConfig = ["ex", "otc", "co"];

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: "/",
  routes: [
    // 创新试验区详情
    {
      path: `${routerEnv}/innovation/:id`,
      name: "innovationView",
      meta: {
        mustLogin: false,
        activeName: "ieo",
        theme: "homeOther",
        navigation: "1", // 国际版中使用横向导航
        hideFooter: "false", // 不隐藏footer
        pageTitle: "innovation",
      },
      component: () => import("@/views/innovation/view.vue"),
    },
    // agent
    {
      path: `${routerEnv}/agent`,
      name: "agentView",
      meta: {
        mustLogin: false,
        theme: "homeOther",
        navigation: "1", // 国际版中使用横向导航
        hideFooter: "false", // 不隐藏footer
        pageTitle: "agent",
      },
      component: () => import("@/views/agent/view.vue"),
    },
    // 借贷
    {
      path: `${routerEnv}/toLoan`,
      name: "lend",
      meta: {
        mustLogin: true,
        theme: "homeOther",
        navigation: "1", // 国际版中使用横向导航
        hideFooter: "false", // 不隐藏footer
        pageTitle: "toLoan",
      },
      component: () => import("@/views/toLoan/toLoan.vue"),
    },
    // 借贷
    {
      path: `${routerEnv}/toLoanHis`,
      name: "lend",
      meta: {
        mustLogin: true,
        theme: "homeOther",
        navigation: "1", // 国际版中使用横向导航
        hideFooter: "false", // 不隐藏footer
        pageTitle: "toLoanHis",
      },
      component: () => import("@/views/toLoan/toLoanHis.vue"),
    },
    {
      path: `${routerEnv}/freeStaking/:id`,
      name: "freeStakingDetail",
      meta: {
        mustLogin: false,
        pageTitle: "freeStakingDetail",
        theme: "homeOther",
        navigation: "1", // 国际版中使用横向导航
        hideFooter: "false", // 不隐藏footer
        activeName: "staking",
      },
      component: () => import("@/views/freeStaking/detail/index.vue"),
    },
    {
      path: `${routerEnv}/myPos`,
      name: "myPos",
      meta: {
        mustLogin: true,
        theme: "homeOther",
        navigation: "1", // 国际版中使用横向导航
        hideFooter: "false", // 不隐藏footer
        activeName: "staking",
        pageTitle: "staking",
      },
      component: () => import("@/views/freeStaking/myPos/index.vue"),
    },
    ...commonRouter,
    // 个人中心
    ...personalRouter,
    ...exRouter,
    {
      path: `${routerEnv}/tradeMore`,
      name: "tradeMore",
      meta: {
        footNotMrgin: true,
        activeName: "exTradeMore",
        pageTitle: "select", // header
        isCoOpen: true,
      },
      component: () => import("@/views/trade/more.vue"),
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  },
});

if (process.env.NODE_ENV === "development") {
  router.beforeEach((to, from, next) => {
    const fromPathArr = from.path.split("/");
    const toPathArr = to.path.split("/");
    let [, fromHostEnv, fromLan] = fromPathArr;
    const [, toHostEnv, toLan] = toPathArr;
    const reg = /^[a-z]{2}_[A-Z]{2}$/;
    if (evnConfig.indexOf(toHostEnv) !== -1 && reg.test(toLan)) {
      setCookie("lan", toLan);
      next();
    } else {
      if (from.path === "/") {
        let ev = "";
        evnConfig.forEach((item) => {
          const fit = `/${item}/`;
          if (to.path.indexOf(item) !== -1) {
            ev = fit;
          }
        });
        const str = `${ev}zh_CN/${to.path.split(ev)[1]}`;
        setCookie("lan", "zh_CN");
        next(str);
        return false;
      }
      let str = "";
      fromHostEnv = evnConfig.indexOf(fromHostEnv) !== -1 ? fromHostEnv : "ex";
      fromLan = reg.test(fromLan) ? fromLan : "zh_CN";
      if (evnConfig.indexOf(toHostEnv) === -1) {
        str += `/${fromHostEnv}`;
      }
      if (!reg.test(toLan)) {
        str += `/${fromLan}`;
      }
      str += to.fullPath;
      setCookie("lan", fromLan);
      next(str);
    }
    return false;
  });
} else {
  const reg = /^[a-z]{2}_[A-Z]{2}$/;
  router.beforeEach((to, from, next) => {
    const notDo = ["register", "appDownload", "innovation", "innovationView", "home"];
    if (isH5Check() && !notDo.includes(to.name) && to.name !== from.name) {
      window.open(`https://www.sparkbit.io/zh_CN/appDownload`, "_self");
      return;
    }
    if (from.path === "/") {
      next();
    } else {
      const fromPathArr = from.path.split("/");
      const fromLan = fromPathArr[1];
      const toPathArr = to.path.split("/");
      const toLan = toPathArr[1];
      if (reg.test(toLan)) {
        next();
      } else {
        const toPath = `/${fromLan}${to.fullPath}`;
        next(toPath);
      }
    }
  });
}

export default router;
