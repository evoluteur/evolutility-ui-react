// Evolutility-UI-React :: /views/many/shared/FiltersBar/FiltersBar.tsx

// Filters bar for the List and Cards views: search box, one chip per filter,
// and a form to add or edit filters. Filters are kept in the URL.

// https://github.com/evoluteur/evolutility-ui-react
// (c) 2026 Olivier Giulieri

import { useMemo, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { i18n_filters as i18n, i18n_actions } from "i18n/i18n";
import url from "utils/url";
import { fieldTypes as ft } from "utils/dico";
import {
  clearFilters,
  fieldOperators,
  filterableFields,
  filterValueText,
  parseFilters,
  removeFilter,
  setFilter,
  setSearch,
  type Filter,
} from "utils/filters";
import { useLOVs } from "dao/queries";
import Icon from "components/ui/Icon/Icon";
import FilterForm from "./FilterForm";
import type { Field, Model } from "types/model";
import type { ManyQueryOptions } from "types/api";

import "./FiltersBar.scss";

export interface FiltersBarProps {
  entity: string;
  model: Model;
  /** Active view ("list" or "cards") */
  view: string;
  /** Current query (from the URL) */
  query: ManyQueryOptions;
}

const FiltersBar = ({ entity, model, view, query }: FiltersBarProps) => {
  const navigate = useNavigate();
  const fields = useMemo(() => filterableFields(model.fields), [model]);
  const filters = useMemo(() => parseFilters(query, fields), [query, fields]);
  // - filter being edited (fieldId of the original filter, undefined if new)
  const [editing, setEditing] = useState<{
    fieldId?: string;
    filter: Filter;
  } | null>(null);

  // - search text being typed, reset when the URL changes
  const urlSearch = query.search ? String(query.search) : "";
  const [typed, setTyped] = useState<{ source: string; text: string } | null>(
    null,
  );
  const searchText = typed?.source === urlSearch ? typed.text : urlSearch;

  // - lists of values missing from the model (only fetched when needed)
  const lovIds = useMemo(
    () =>
      fields
        .filter((f) => f.type === ft.lov && !f.list?.length)
        .map((f) => f.id),
    [fields],
  );
  const needLovs =
    !!editing ||
    filters.some(
      (flt) => lovIds.includes(flt.fieldId) && flt.operator === "in",
    );
  const lovsQuery = useLOVs(entity, needLovs ? lovIds : undefined);
  const getList = (f: Field) =>
    f.list?.length ? f.list : lovsQuery.data?.[f.id] || [];

  const go = (q: ManyQueryOptions) => {
    setEditing(null);
    navigate(`../${entity}/${view}?` + url.querySearch(q));
  };

  const onSearch = (evt: FormEvent) => {
    evt.preventDefault();
    go(setSearch(query, searchText.trim()));
  };

  const fieldLabel = (fid: string) => {
    const f = model.fieldsH?.[fid];
    return f?.labelShort || f?.label || fid;
  };

  const addFilter = () => {
    const usedIds = filters.map((flt) => flt.fieldId);
    const f = fields.find((f) => !usedIds.includes(f.id)) || fields[0];
    if (f) {
      setEditing({
        filter: { fieldId: f.id, operator: fieldOperators(f)[0], value: "" },
      });
    }
  };

  // - fields available in the form (one filter per field)
  const formFields = editing
    ? fields.filter(
        (f) =>
          f.id === editing.fieldId ||
          !filters.some((flt) => flt.fieldId === f.id),
      )
    : [];

  const hasCriteria = !!filters.length || !!urlSearch;

  return (
    <div className="evo-filters-bar" data-testid="filtersbar">
      <div className="evo-filters-row">
        <form className="evo-filters-search" onSubmit={onSearch} role="search">
          <Icon name="search" theme="none" />
          <input
            type="search"
            className="form-control"
            aria-label={i18n_actions.search}
            placeholder={i18n_actions.searchX.replace(
              "{0}",
              model.namePlural || "",
            )}
            value={searchText}
            onChange={(evt) =>
              setTyped({ source: urlSearch, text: evt.target.value })
            }
          />
          {urlSearch && (
            <button
              type="button"
              className="evo-filters-x"
              aria-label={i18n.clearSearch}
              title={i18n.clearSearch}
              onClick={() => go(setSearch(query, ""))}
            >
              ×
            </button>
          )}
        </form>

        {filters.map((flt) => {
          const f = model.fieldsH?.[flt.fieldId];
          const label = fieldLabel(flt.fieldId);
          const valueText = f ? filterValueText(flt, getList(f)) : flt.value;
          const isEdited = editing?.fieldId === flt.fieldId;
          return (
            <span
              key={flt.fieldId}
              className={"evo-filter-chip" + (isEdited ? " active" : "")}
            >
              <button
                type="button"
                className="evo-filter-chip-txt"
                onClick={() =>
                  setEditing({ fieldId: flt.fieldId, filter: flt })
                }
              >
                <b>{label}</b> {i18n[flt.operator]} {valueText}
              </button>
              <button
                type="button"
                className="evo-filters-x"
                aria-label={i18n.removeFilter.replace("{0}", label)}
                title={i18n.remove}
                onClick={() => go(removeFilter(query, flt.fieldId))}
              >
                ×
              </button>
            </span>
          );
        })}

        {filters.length < fields.length && (
          <button
            type="button"
            className="evo-filters-add"
            onClick={addFilter}
            aria-expanded={!!editing && !editing.fieldId}
          >
            <Icon name="filter" theme="none" />
            {i18n.addFilter}
          </button>
        )}

        {hasCriteria && (
          <button
            type="button"
            className="evo-filters-clear"
            onClick={() => go(clearFilters(query))}
          >
            {i18n.clearAll}
          </button>
        )}
      </div>

      {editing && formFields.length > 0 && (
        <FilterForm
          key={editing.fieldId || "new"}
          fields={formFields}
          filter={editing.filter}
          getList={getList}
          onApply={(flt) => go(setFilter(query, flt, editing.fieldId))}
          onCancel={() => setEditing(null)}
        />
      )}
    </div>
  );
};

export default FiltersBar;
