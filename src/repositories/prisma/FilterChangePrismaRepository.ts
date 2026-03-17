import { FilterChange }           from "../../../prisma/generated/client";
import { FilterChangeRepository } from "../interfaces/FilterChangeRepository";
import { prisma }                 from "../../shared/prisma";

export class FilterChangePrismaRepository implements FilterChangeRepository {

    public async findLast(waterFountainId: string): Promise<FilterChange | null> {
        return await prisma.filterChange.findFirst({
            where: {
                waterFountainId: waterFountainId
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
    }

}