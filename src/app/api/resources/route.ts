export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import axios from "axios";
import { AirtableConf } from "@/conf/conf";
import connectDB from "@/db/dbConnect";
import { ResourceModel } from "@/models/airtable.model";

export async function GET() {
  await connectDB();
  const headers = {
    Authorization: `Bearer ${AirtableConf.BEARER_TOKEN}`,
  };

  try {
    let resourceList: ResourceModel[] = [];

    let offset = null;
    do {
      const response: any = await axios.get(
        `${AirtableConf.BASE_URL}/${AirtableConf.RESOURCE_BASE_ID}/${AirtableConf.RESOURCE_TABLE_ID}`,
        {
          headers,
          params: {
            offset,
          },
        }
      );

      if (response.status === 200) {
        const records: ResourceModel[] = (await response.data[
          "records"
        ]) as ResourceModel[];
        resourceList.push(...records);
        offset = response.data.offset;
      }
    } while (offset);
    const statusRecord = resourceList?.filter(
      (item: ResourceModel) => item.fields?.Status?.toLowerCase()==="done"
    );

    return NextResponse.json(
      {
        success: true,
        data: statusRecord,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("ResourceModel api failure ::: ", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
