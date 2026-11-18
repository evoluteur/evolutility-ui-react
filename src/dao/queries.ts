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
  deleteModelDef,
  getChart,
  getCollec,
  getLOVs,
  getMany,
  getObjectSearch,
  getOne,
  getStats,
  getModelDef,
  getModelDefs,
  getModelHistory,
  getModelSchema,
  getModelVersion,
  insertOne,
  saveModelDef,
  updateOne,
} from "./dao";
import { restToModel } from "./mapping";
import { setModel, removeModel } from "utils/moMa";
import { staleTime } from "./queryClient";
import type { RecordData } from "types/model";
import type { ManyQueryOptions, ModelDef } from "types/api";

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
  chart: (entity: string, fieldId: string, options?: ManyQueryOptions) =>
    ["evol", entity, "chart", fieldId, options || {}] as const,
  stats: (entity: string) => ["evol", entity, "stats"] as const,
  // - models stored on the server (Designer)
  modelDefs: () => ["evol-meta", "models"] as const,
  modelDef: (id: string) => ["evol-meta", "models", id] as const,
  modelHistory: (id: string) => ["evol-meta", "models", id, "history"] as const,
  modelSchema: () => ["evol-meta", "schema"] as const,
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
export const useChart = (
  entity: string,
  fieldId: string | undefined,
  options?: ManyQueryOptions,
) =>
  useQuery({
    queryKey: queryKeys.chart(entity, fieldId || "", options),
    queryFn: ({ signal }) =>
      getChart(entity, fieldId as string, options, signal),
    placeholderData: keepPreviousData,
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

//#region  ----- Models (Designer) ----------------------------

// - models are edited: never served from the cache
export const useModelDefs = () =>
  useQuery({
    queryKey: queryKeys.modelDefs(),
    queryFn: ({ signal }) => getModelDefs(signal),
    staleTime: 0,
  });

export const useModelDef = (id: string | undefined) =>
  useQuery({
    queryKey: queryKeys.modelDef(id || ""),
    queryFn: ({ signal }) => getModelDef(id!, signal),
    enabled: !!id,
    staleTime: 0,
  });

export const useModelHistory = (id: string | undefined) =>
  useQuery({
    queryKey: queryKeys.modelHistory(id || ""),
    queryFn: ({ signal }) => getModelHistory(id!, signal),
    enabled: !!id,
    staleTime: 0,
  });

// - JSON Schema of the metamodel (doesn't change while the app runs)
export const useModelSchema = () =>
  useQuery({
    queryKey: queryKeys.modelSchema(),
    queryFn: ({ signal }) => getModelSchema(signal),
    staleTime: Infinity,
    retry: false,
  });

// - get an old version of a model (to load it in the editor)
export const useFetchModelVersion = () => {
  const queryClient = useQueryClient();
  return (id: string, version: number) =>
    queryClient.fetchQuery({
      queryKey: [...queryKeys.modelHistory(id), version],
      queryFn: ({ signal }) => getModelVersion(id, version, signal),
      staleTime: Infinity,
    });
};

// - check or save a model; once saved, the views use it right away
export const useSaveModelDef = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      model,
      isNew = false,
      dryRun = false,
    }: {
      model: ModelDef;
      isNew?: boolean;
      dryRun?: boolean;
    }) => saveModelDef(model, { isNew, dryRun }),
    onSuccess: (result) => {
      if (!result.dryRun) {
        const id = result.model.id;
        setModel(restToModel(result.model));
        queryClient.setQueryData(queryKeys.modelDef(id), result.model);
        queryClient.invalidateQueries({ queryKey: queryKeys.modelDefs() });
        queryClient.invalidateQueries({ queryKey: queryKeys.modelHistory(id) });
        // - the records of the model may have new fields
        queryClient.invalidateQueries({ queryKey: queryKeys.entity(id) });
      }
    },
  });
};

export const useDeleteModelDef = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteModelDef(id),
    onSuccess: (_data, id) => {
      removeModel(id);
      queryClient.removeQueries({ queryKey: queryKeys.modelDef(id) });
      queryClient.removeQueries({ queryKey: queryKeys.entity(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.modelDefs() });
    },
  });
};
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
  useModelDefs,
  useModelDef,
  useModelHistory,
  useModelSchema,
  useFetchModelVersion,
  useSaveModelDef,
  useDeleteModelDef,
};

export default queries;
