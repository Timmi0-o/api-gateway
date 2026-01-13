import { IUsersDataResponse } from '@tourgis/contracts/dist/api-gateway/auth/v1/contracts/user/users-data.contract';
import { IQueryAuthUsersDataResponse } from '@tourgis/contracts/dist/auth/v1';

const safePastKeyData = (data: unknown) => {
  return data ? data : null;
};

export const getUsersFormatResultData = (data: IQueryAuthUsersDataResponse): IUsersDataResponse => {
  return {
    meta: {
      hasMore: safePastKeyData(data?.meta?.hasMore),
      limit: safePastKeyData(data?.meta?.limit),
      offset: safePastKeyData(data?.meta?.offset),
      total: safePastKeyData(data?.meta?.total),
    },
    data: data?.data?.map((item) => ({
      id: safePastKeyData(item?.auth?.id),
      name: safePastKeyData(item?.auth?.name),
      patronymic: safePastKeyData(item?.auth?.patronymic),
      phone: safePastKeyData(item?.auth?.phone),
      surname: safePastKeyData(item?.auth?.surname),
      username: safePastKeyData(item?.auth?.username),
      role: safePastKeyData(item?.auth?.role),
      status: safePastKeyData(item?.auth?.status),
      language: safePastKeyData(item?.auth?.language),
      createdAt: safePastKeyData(item?.auth?.createdAt),
      updatedAt: safePastKeyData(item?.auth?.updatedAt),
      email: safePastKeyData(item?.auth?.email),
      orginazation: {
        id: safePastKeyData(item?.organization?.id),
        commonId: safePastKeyData(item?.organization?.commonId),
        createdAt: safePastKeyData(item?.organization?.createdAt),
        updatedAt: safePastKeyData(item?.organization?.updatedAt),
      },
    })),
    success: true,
    timestamp: new Date(),
  };
};
