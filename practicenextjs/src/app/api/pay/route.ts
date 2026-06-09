export const runtime = "nodejs";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const store_id = process.env.STORE_ID!;
    const store_passwd = process.env.STORE_PASSWORD!;

    const data = new URLSearchParams();

    data.append("store_id", store_id);
    data.append("store_passwd", store_passwd);
    data.append("total_amount", body.amount);
    data.append("currency", "BDT");
    data.append("tran_id", Date.now().toString());

    data.append("success_url", "http://localhost:3000/success");
    data.append("fail_url", "http://localhost:3000/fail");
    data.append("cancel_url", "http://localhost:3000/cancel");

    data.append("shipping_method", "Courier");
    data.append("product_name", body.productName);
    data.append("product_category", "General");
    data.append("product_profile", "general");

    data.append("cus_name", body.user.name);
    data.append("cus_email", body.user.email);
    data.append("cus_add1", "Dhaka");
    data.append("cus_city", "Dhaka");
    data.append("cus_country", "Bangladesh");
    data.append("cus_phone", "01700000000");

    data.append("ship_name", body.user.name);
data.append("ship_add1", "Dhaka");
data.append("ship_city", "Dhaka");
data.append("ship_postcode", "1200");
data.append("ship_country", "Bangladesh");

    const response = await fetch(
      "https://sandbox.sslcommerz.com/gwprocess/v4/api.php",
      {
        method: "POST",
        body: data,
      }
    );

    const result = await response.json();

    return NextResponse.json({
      url: result?.GatewayPageURL,
    });
  } catch (error: unknown) {
    console.error("PAYMENT ERROR:", error);

    const message = error instanceof Error ? error.message : String(error);

    return NextResponse.json(
      {
        success: false,
        message,
      },
      { status: 500 }
    );
  }
}