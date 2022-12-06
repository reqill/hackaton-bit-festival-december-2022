export const defaultHandler = ({
  nexusType,
  thisDbType,
  fieldName,
}: {
  nexusType: any;
  thisDbType: string;
  fieldName: string;
}) => {
  return {
    type: nexusType,
    async resolve(_parent: any, _args: any, ctx: any) {
      return await ctx.prisma[thisDbType]
        .findUnique({
          where: {
            id: _parent.id as string | undefined,
          },
        })
        [fieldName]();
    },
  };
};

export const formatDate = (date: Date) => {
  return (
    date.getFullYear().toString() +
    '/' +
    (date.getMonth() + 1).toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false,
    }) +
    '/' +
    date.getDate().toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false,
    }) +
    ' ' +
    date.getHours().toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false,
    }) +
    ':' +
    date.getMinutes().toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false,
    })
  );
};
