import { NextRequest, NextResponse } from "next/server";
import { getResources } from "@/features/resources/service";
import {
  CriticalitySchema,
  EnvironmentSchema,
  ProviderSchema,
  ResourceSchema,
  SortableFieldSchema,
  SortOrderSchema,
} from "@/features/resources/schema";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const search = searchParams.get("search") ?? undefined;
  const provider = ProviderSchema.safeParse(searchParams.get("provider")).data;
  const environment = EnvironmentSchema.safeParse(searchParams.get("environment")).data;
  const criticality = CriticalitySchema.safeParse(searchParams.get("criticality")).data;
  const sortBy = SortableFieldSchema.safeParse(searchParams.get("sortBy")).data;
  const sortOrder = SortOrderSchema.safeParse(searchParams.get("sortOrder")).data;

  const resources = await getResources({ search, provider, environment, criticality, sortBy, sortOrder });
  const data = ResourceSchema.array().parse(resources);

  return NextResponse.json({ data, total: data.length });
}
