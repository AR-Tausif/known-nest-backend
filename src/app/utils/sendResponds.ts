// import { Response } from 'express';
// import httpStatus from 'http-status';

// const sendResponds = (res: Response, msg: string, result) => {
//   res.status(200).json({
//     success: true,
//     massage: msg,
//     data: result,
//   });
// };

// export const sendRespondsDosentExist = (
//   res: Response,
//   message: string,
//   result,
// ) => {
//   res.status(httpStatus.OK).json({
//     success: false,
//     message,
//     data: result,
//   });
// };

// export default sendResponds;

import { Response } from 'express';

type TResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string;
  data: T;
};

const sendResponds = <T>(res: Response, data: TResponse<T>) => {
  res.status(data?.statusCode).json({
    success: data.success,
    message: data.message,
    data: data.data,
  });
};

export default sendResponds;
