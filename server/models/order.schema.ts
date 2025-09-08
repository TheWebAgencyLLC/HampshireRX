import { defineMongooseModel } from "#nuxt/mongoose";
import { Schema } from "mongoose";

export const orderSchema = defineMongooseModel({
  name: "Order",
  schema: {
    items: [
      {
        medication: {
          name: { type: String, required: true },
          count: { type: Number, required: true },
          countUnit: { type: String, required: true },
          price: { type: Number, required: true },
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
          min: 1,
        },
        // medID: {
        //   type: Schema.Types.ObjectId,
        //   ref: "Medication",
        //   required: true,
        // },
      },
    ],
    customer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    //@ts-ignore
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    payment: {
      type: Object,
      default: {},
      properties: {
        status: {
          type: String,
          enum: ["authorized", "captured", "refunded", "failed"],
          default: "authorized",
        },
        method: {
          type: String,
          enum: ["card", "cash", "insurance"],
          default: "card",
        },
        paymentIntentId: String,
        lastFour: String,
        cardBrand: String,
        amountAuthorized: Number,
        amountCaptured: Number,
        capturedAt: Date,
        refundedAt: Date,
      },
    },
    //@ts-ignore
    dateOrdered: {
      type: Date,
      default: Date.now,
      required: true,
    },
    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },
    //@ts-ignore
    taxAmount: {
      type: Number,
      default: 0,
      min: 0,
    },
    //@ts-ignore
    shippingAmount: {
      type: Number,
      default: 0,
      min: 0,
    },
    //@ts-ignore
    discountAmount: {
      type: Number,
      default: 0,
      min: 0,
    },
    total: {
      type: Number,
      required: true,
      min: 0,
    },
    deliveryAddress: {
      type: Object,
      required: true,
      properties: {
        street: {
          type: String,
          required: true,
        },
        city: {
          type: String,
          required: true,
        },
        state: {
          type: String,
          required: true,
        },
        zip: {
          type: String,
          required: true,
        },
        country: {
          type: String,
          default: "US",
        },
      },
    },
    contactInfo: {
      type: Object,
      required: true,
      properties: {
        email: {
          type: String,
          required: true,
        },
        phone: String,
      },
    },
    notes: String,
    trackingNumber: String,
    estimatedDeliveryDate: Date,
    actualDeliveryDate: Date,
  },
  options: {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
});
