import { ApplicationProtocol } from "aws-cdk-lib/aws-elasticloadbalancingv2";
import { Bucket, RDS, Service, StackContext } from "sst/constructs";

export function strapiStack({ stack }: StackContext) {
  const database = new RDS(stack, "Database", {
    engine: "postgresql13.9",
    defaultDatabaseName: "vglobal_sst",
  });

  const bucket = new Bucket(stack, "upload_sst");

  const service = new Service(stack, "strapi_sst_vglobal", {
    path: ".",
    bind: [database, bucket],
    port: 1337,
    scaling: { cpuUtilization: 80, memoryUtilization: 80 },
    cdk: {
      applicationLoadBalancerTargetGroup: {
        port: 1337,
        protocol: ApplicationProtocol.HTTP,
      },

      container: {
        environment: {
          DATABASE_CLIENT: "postgres",
          DATABASE_HOST: database.clusterEndpoint.hostname,
          DATABASE_PORT: `${database.clusterEndpoint.port}`,
          DATABASE_NAME: database.defaultDatabaseName,
          DATABASE_USERNAME: `${database.cdk.cluster.secret.secretValueFromJson(
            "username"
          )}`,
          DATABASE_PASSWORD: `${database.cdk.cluster.secret.secretValueFromJson(
            "password"
          )}`,
          DATABASE_SSL: "false",
          CLOUDINARY_NAME: "dkxklabdn",
          CLOUDINARY_KEY: "672331572631627",
          CLOUDINARY_SECRET: "r90hpXGX4CKlie0V5beDHthXdIo",
          STRAPI_ADMIN_LIVE_STRIPE_SECRET_KEY:
            "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",
          STRAPI_ADMIN_TEST_STRIPE_SECRET_KEY:
            "sk_test_519V5SDFzs9j6lbmR17qUqV9fucZlfRWTUXoUbbmOJaFGZwGEYpWBtjt3RIkNUE3W5q4UBGLL4f2nNmwgu3abaY9y00Ciqct4ev",
          SMTP_USERNAME: "momom_2011@hotmail.com",
          SMTP_PASSWORD: "@081994aA@",
          SMTP_HOST: "smtp-mail.outlook.com",
          SMTP_PORT: "587",
        },
      },
    },
  });

  stack.addOutputs({ ServiceUrl: service.url });
}
