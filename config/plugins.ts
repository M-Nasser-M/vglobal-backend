module.exports = ({ env }) => ({
  seo: {
    enabled: true,
  },
  ckeditor5: {
    enabled: true,
  },
  publisher: {
    enabled: true,
    config: {
      hooks: {
        beforePublish: async ({ strapi, uid, entity }) => {
          console.log("beforePublish");
        },
        afterPublish: async ({ strapi, uid, entity }) => {
          console.log("afterPublish");
        },
        beforeUnpublish: async ({ strapi, uid, entity }) => {
          console.log("beforeUnpublish");
        },
        afterUnpublish: async ({ strapi, uid, entity }) => {
          console.log("afterUnpublish");
        },
      },
    },
  },
  transformer: {
    enabled: true,
    config: {
      responseTransforms: {
        removeAttributesKey: true,
        removeDataKey: true,
      },
      requestTransforms: {
        wrapBodyWithDataKey: true,
      },
    },
  },
  upload: {
    config: {
      provider: "aws-s3",
      providerOptions: {
        s3Options: {
          accessKeyId: env("AWS_ACCESS_KEY_ID"),
          secretAccessKey: env("AWS_ACCESS_SECRET"),
          region: env("AWS_REGION"),
          params: {
            Bucket: env("AWS_BUCKET_NAME"),
          },
        },
      },
    },
  },
  "local-image-sharp": {
    config: {
      cacheDir: ".image-cache",
      maxAge: 604800,
    },
  },
  placeholder: {
    enabled: true,
    config: {
      size: 10,
    },
  },
  "duplicate-button": true,
  "content-versioning": {
    enabled: true,
  },
  "import-export-entries": {
    enabled: true,
  },
});
