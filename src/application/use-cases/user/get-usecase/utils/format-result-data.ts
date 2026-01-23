export const getUsersFormatResultData = ({ data }: { data: any }): any => {
  return {
    meta: {
      totalCount: data?.meta?.totalCount,
      limit: data?.meta?.limit,
      offset: data?.meta?.offset,
      total: data?.meta?.total,
    },
    data: data?.data?.map((item) => ({
      id: item?.auth?.id,
      name: item?.auth?.name,
      patronymic: item?.auth?.patronymic,
      phone: item?.auth?.phone,
      surname: item?.auth?.surname,
      username: item?.auth?.username,
      role: item?.auth?.role,
      status: item?.auth?.status,
      language: item?.auth?.language,
      createdAt: item?.auth?.createdAt,
      updatedAt: item?.auth?.updatedAt,
      email: item?.auth?.email,
      orginazation: {
        id: item?.organization?.id,
        commonId: item?.organization?.commonId,
        createdAt: item?.organization?.createdAt,
        updatedAt: item?.organization?.updatedAt,
        organizationMembers: item?.organization?.organizationMembers,
      },
    })),
    success: true,
    timestamp: new Date(),
  };
};
