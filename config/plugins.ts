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
      provider: "cloudinary",
      providerOptions: {
        cloud_name: env("CLOUDINARY_NAME"),
        api_key: env("CLOUDINARY_KEY"),
        api_secret: env("CLOUDINARY_SECRET"),
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
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
