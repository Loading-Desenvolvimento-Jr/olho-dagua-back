import { FilterChange } from "../../../prisma/generated/client";

export interface FilterChangeRepository {

    findLast(waterFountainId: string): Promise<FilterChange | null>;

}