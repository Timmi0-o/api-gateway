import { IOrganizationsDataResponse } from '@tourgis/contracts/dist/api-gateway/organization/v1/contracts/organization/organizations-data.contract';
import { IQueryOrganizationsDataResponse } from '@tourgis/contracts/dist/organization/v1';

export const getOrganizationsFormatResultData = ({
  data,
}: {
      data: IQueryOrganizationsDataResponse;
}): IOrganizationsDataResponse => {
  return {
    meta: {
      limit: data?.meta?.limit,
      offset: data?.meta?.offset,
      total: data?.meta?.total,
      totalCount: data?.meta?.totalCount,
    },
    data: data?.data?.map((item) => ({
      id: item?.organization?.id,
      name: item?.organization?.name,
      description: item?.organization?.description,
      ownerId: item?.organization?.ownerId,
      isActive: item?.organization?.isActive,
      createdAt: item?.organization?.createdAt,
      updatedAt: item?.organization?.updatedAt,
      owner: {
        id: item?.owner?.id,
        name: item?.owner?.name,
        surname: item?.owner?.surname,
        patronymic: item?.owner?.patronymic,
        email: item?.owner?.email,
        username: item?.owner?.username,
        createdAt: item?.owner?.createdAt,
        updatedAt: item?.owner?.updatedAt,
      },
    })),
    success: true,
    timestamp: new Date(),
  };
};
