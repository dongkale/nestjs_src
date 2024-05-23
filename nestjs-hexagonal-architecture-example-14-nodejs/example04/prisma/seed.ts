import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: [
    {
      emit: 'stdout',
      level: 'query',
    },
    {
      emit: 'stdout',
      level: 'error',
    },
    {
      emit: 'stdout',
      level: 'info',
    },
    {
      emit: 'stdout',
      level: 'warn',
    },
  ],
});

async function main(): Promise<void> {
  await prisma.routerData.create({
    data: {
      id: 'ca23800e-9b5a-11eb-a8b3-0242ac130003',
      type: 'EDGE',
      networkSwitch: {
        create: {
          id: '922dbcd5-d071-41bd-920b-00f83eb4bb46',
          ip: {
            create: {
              address: '9.0.0.9',
              protocol: 'IPV4',
            },
          },
          type: 'LAYER3',
          networks: {
            create: [
              {
                cidr: 8,
                name: 'HR',
                ip: {
                  create: {
                    address: '10.0.0.0',
                    protocol: 'IPV4',
                  },
                },
              },
              {
                cidr: 8,
                name: 'Marketing',
                ip: {
                  create: {
                    address: '20.0.0.0',
                    protocol: 'IPV4',
                  },
                },
              },
              {
                cidr: 8,
                name: 'Engineering',
                ip: {
                  create: {
                    address: '30.0.0.0',
                    protocol: 'IPV4',
                  },
                },
              },
            ],
          },
        },
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
