export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { AirtableModel } from "@/models/airtable.model";
import axios from "axios";
import { AirtableConf } from "@/conf/conf";
import connectDB from "@/db/dbConnect";

export async function GET() {
  await connectDB();
  const headers = {
    Authorization: `Bearer ${AirtableConf.BEARER_TOKEN}`,
  };

  try {
    let airtableProductList: AirtableModel[] = [];

    let cacheData = null;
    if (cacheData !== null) {
      return NextResponse.json(
        {
          success: true,
          data: cacheData,
        },
        { status: 200 }
      );
    }

    let offset = null;
    do {
      const response: any = await axios.get(
        `${AirtableConf.BASE_URL}/${AirtableConf.BASE_ID}/${AirtableConf.TABLE_ID}`,
        {
          headers,
          params: {
            offset,
          },
        }
      );

      if (response.status === 200) {
        const records: AirtableModel[] = (await response.data[
          "records"
        ]) as AirtableModel[];
        airtableProductList.push(...records);
        offset = response.data.offset;
      }
    } while (offset);
    
    const statusRecord = airtableProductList?.filter(
      (item: AirtableModel) => item.fields.Verified == true
    );

    return NextResponse.json(
      {
        success: true,
        data: statusRecord,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("tools api failure ::: ", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
