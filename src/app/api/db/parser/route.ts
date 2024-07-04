import { logger } from "@/lib/logger/logger";
import { OsuCollectionDB, OsuDB } from "@/lib/types/external";
import { NextRequest, NextResponse } from "next/server";

const OsuDBParser = require("osu-db-parser");

interface RequestType {
  dbType: string;
  data: number[];
}

interface ResponseType {
  success: boolean;
  data: OsuCollectionDB | OsuDB | null;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const data: RequestType = await req.json();
    const osuDBBuffer = new Uint8Array(data.data).buffer;

    if (data.dbType == "collection") {
      const parser = new OsuDBParser(null, osuDBBuffer);
      const osuCollectionData: OsuCollectionDB = parser.getCollectionData();
      logger.api("collection.dbの読み込みに成功", "POST");
      return NextResponse.json({
        success: true,
        data: osuCollectionData,
      });
    } else if (data.dbType == "osu") {
      const parser = new OsuDBParser(osuDBBuffer);
      const osuData: OsuDB = parser.getOsuDBData();
      logger.api("osu!.dbの読み込みに成功", "POST");
      return NextResponse.json({
        success: true,
        data: osuData,
      });
    } else throw new Error();
  } catch (e) {
    logger.apiError(`dbの読み込みに失敗 : ${e}`, "POST");
    return NextResponse.json({
      success: false,
      data: null,
    });
  }
}
