import { FilterChange }           from "../../../prisma/generated/client";
import { FilterChangeRepository } from "../interfaces/FilterChangeRepository";

export class FilterChangeInMemoryRepository implements FilterChangeRepository {

    private filterChanges: FilterChange[];

    public constructor() {
        this.filterChanges = [];
    }

    public setMockData(filterChanges: FilterChange[]) {
        this.filterChanges = filterChanges;
    }

    public async findLast(waterFountainId: string): Promise<FilterChange | null> {
        
        let last: FilterChange | null = null;

        for (const change of this.filterChanges) {
            if (change.waterFountainId === waterFountainId) {
                if (!last || change.createdAt > last.createdAt) {
                    last = change;
                }
            }
        }

        return last;
    }


}