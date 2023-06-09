import defaultSwagger from "./defaultSwagger";
import * as UserSwagger from "../users/swagger";

const Swaggers = {
  ...UserSwagger,
};

const { paths } = Object.values(Swaggers).reduce(
  (acc, apis) => {
    const APIs = Object.values(apis).map((api) => {
      return { ...api };
    });
    APIs.forEach((api) => {
      const key = Object.keys(api)[0];
      if (!acc.paths[key]) {
        acc.paths = {
          ...acc.paths,
          ...api,
        };
      } else {
        acc.paths[key] = {
          ...acc.paths[key],
          ...api[key],
        };
      }
    });
    return acc;
  },
  {
    paths: {},
  }
);

// 스웨거에 등록할 Json
export const swaggerDocs = {
  ...defaultSwagger,
  paths,
};

// 스웨거 등록
export const options = {
  swaggerOptions: {
    url: "/swagger.json",
  },
};
