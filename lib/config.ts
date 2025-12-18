// Production backend on AWS App Runner
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "https://sppue2hk7i.eu-west-1.awsapprunner.com";

// Paystack configuration
export const PAYSTACK_PUBLIC_KEY = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "pk_live_9dc06affe180b3f78184942131356e709c5fbc53";

export default baseUrl;
