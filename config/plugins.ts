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
  email: {
    config: {
      provider: "nodemailer",
      providerOptions: {
        name: "vglobal.ca", //emails were being discarded because we didn't put name option
        host: env("SMTP_HOST", undefined),
        port: env("SMTP_PORT", undefined),
        auth: {
          user: env("SMTP_USERNAME", undefined),
          pass: env("SMTP_PASSWORD", undefined),
        },
        secure: true,
        // ... any custom nodemailer options
      },
      settings: {
        defaultFrom: "no-reply@vglobal.ca",
        defaultReplyTo: "no-reply@vglobal.ca",
      },
    },
  },
  placeholder: {
    enabled: true,
    config: {
      size: 10,
    },
  },
  "users-permissions": {
    config: {
      register: {
        allowedFields: ["dateOfBirth"],
      },
    },
  },
  "import-export-entries": {
    enabled: true,
  },
  "content-versioning": {
    enabled: true,
  },
});
