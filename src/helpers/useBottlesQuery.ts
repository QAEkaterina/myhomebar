import { useLiveQuery } from 'dexie-react-hooks';
import { useMemo } from 'react';
import { db } from '../db';
import { BottleDisplay } from '../types';

export default function useBottlesQuery(): BottleDisplay[] {
  const queryResult = useLiveQuery(
    async () => {
      const bottleTypes = await db.types.toArray();
      const bottleTypesMap: Record<string, string> = {};

      bottleTypes.forEach(({ id, name }) => {
        bottleTypesMap[id] = name;
      });

      const bottleRecords = await db.bottles.toArray();

      return bottleRecords.map((bottle) => ({
        ...bottle,
        type: bottleTypesMap[bottle.typeId] || `Unknown type: ${bottle.typeId}`,
      }));
    },
  );

  // Dexie's useLiveQuery type is wrong, it should include undefined
  return useMemo(() => queryResult || [], [queryResult]);
}
