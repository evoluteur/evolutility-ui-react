/*
  Evolutility-UI-React :: dao/queries.ts

  TanStack Query hooks for the REST API (see "src/dao/dao.ts").

  https://github.com/evoluteur/evolutility-ui-react
  (c) 2026 Olivier Giulieri
*/

import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  deleteOne,
  getChart,
  getCollec,
  getLOVs,
  getMany,
  getObjectSearch,
  getOne,
  getStats,
  insertOne,
  updateOne,
} from "./dao";
import { staleTime } from "./queryClient";
import type { RecordData } from "types/model";
import type { ManyQueryOptions } from "types/api";

//#region  ----- Query keys ----------------------------

// - all the keys of a model start w/ ["evol", entity] so that
//   a single call invalidates every query of that model
export const queryKeys = {
  entity: (entity: string) => ["evol", entity] as const,
  many: (entity: string, options?: ManyQueryOptions) =>
    ["evol", entity, "many", options || {}] as const,
  one: (entity: string, id: number) => ["evol", entity, "one", id] as const,
  collec: (entity: string, collecId: string, id: number) =>
    ["evol", entity, "collec", collecId, id] as const,
  lovs: (entity: string) => ["evol", entity, "lovs"] as const,
  lovSearch: (entity: string, search: string) =>
    ["evol", entity, "lov-search", search] as const,
  chart: (entity: string, fieldId: string) =>
    ["evol", entity, "chart", fieldId] as const,
  stats: (entity: string) => ["evol", entity, "stats"] as const,
};
//#endregion

//#region  ----- Queries ----------------------------

// - list of records (List and Cards views)
export const useMany = (entity: string, options?: ManyQueryOptions) =>
  useQuery({
    queryKey: queryKeys.many(entity, options),
    queryFn: ({ signal }) => getMany(entity, options, signal),
    enabled: !!entity,
    placeholderData: keepPreviousData,
  });

// - single record (Browse and Edit views)
export const useOne = (entity: string, id: number) =>
  useQuery({
    queryKey: queryKeys.one(entity, id),
    queryFn: ({ signal }) => getOne(entity, id, signal),
    enabled: !!entity && !!id,
  });

// - one sub-collection of a record
export const useCollec = (entity: string, collecId: string, id: number) =>
  useQuery({
    queryKey: queryKeys.collec(entity, collecId, id),
    queryFn: ({ signal }) => getCollec(entity, collecId, id, signal),
    enabled: !!entity && !!collecId && !!id,
  });

// - lists of values of the model fields missing a list (dropdowns)
export const useLOVs = (entity: string, fieldIds: string[] | undefined) =>
  useQuery({
    queryKey: queryKeys.lovs(entity),
    queryFn: ({ signal }) => getLOVs(entity, fieldIds || [], signal),
    enabled: !!entity && !!fieldIds?.length,
    // - lists of values rarely change
    staleTime: Math.max(staleTime, 10 * 60 * 1000),
  });

// - lookup in another object (typeahead of "lov" fields w/ an object)
export const useObjectSearch = (entity: string, search: string) =>
  useQuery({
    queryKey: queryKeys.lovSearch(entity, search),
    queryFn: ({ signal }) => getObjectSearch(entity, search, signal),
    enabled: !!entity && search.length > 1,
    placeholderData: keepPreviousData,
  });

// - data of one chart
export const useChart = (entity: string, fieldId: string | undefined) =>
  useQuery({
    queryKey: queryKeys.chart(entity, fieldId || ""),
    queryFn: ({ signal }) => getChart(entity, fieldId as string, signal),
    enabled: !!entity && !!fieldId,
  });

// - statistics on all the fields of a model
export const useStats = (entity: string) =>
  useQuery({
    queryKey: queryKeys.stats(entity),
    queryFn: ({ signal }) => getStats(entity, signal),
    enabled: !!entity,
  });
//#endregion

//#region  ----- Mutations ----------------------------

// - insert or update a record (then re-fetch the queries of the model)
export const useSaveOne = (entity: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number | null; data: RecordData }) =>
      id ? updateOne(entity, id, data) : insertOne(entity, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.entity(entity) });
    },
  });
};

// - delete a record
export const useDeleteOne = (entity: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteOne(entity, id),
    onSuccess: (_data, id) => {
      queryClient.removeQueries({ queryKey: queryKeys.one(entity, id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.entity(entity) });
    },
  });
};
//#endregion

const queries = {
  queryKeys,
  useMany,
  useOne,
  useCollec,
  useLOVs,
  useObjectSearch,
  useChart,
  useStats,
  useSaveOne,
  useDeleteOne,
};

export default queries;
