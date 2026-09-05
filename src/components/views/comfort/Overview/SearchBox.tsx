import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "components/ui/Icon/Icon";
import FieldObject from "components/Field/edit/FieldObject";

import "./SearchBox.scss";

export interface SearchBoxProps {
  /** Model id */
  entity: string;
  /** Placeholder text */
  placeHolder?: string;
}

const SearchBox = ({ entity, placeHolder }: SearchBoxProps) => {
  const [value, setValue] = useState<string | number | null>(null);
  const navigate = useNavigate();
  const onChange = useCallback(
    (valueObj: { value: string | number }) => {
      const id = valueObj?.value;
      if (id) {
        navigate(`../${entity}/browse/${id}`);
      }
    },
    [entity, navigate],
  );
  const onInputChange = useCallback((value: string) => setValue(value), []);
  const onClick = useCallback(() => {
    if (value) {
      navigate(`../${entity}/list/?search=${value}`);
    }
  }, [entity, value, navigate]);

  return (
    <div className="evo-search-box">
      <div>
        <FieldObject
          id="search"
          entity={entity}
          onChange={onChange}
          onInputChange={onInputChange}
          placeHolder={placeHolder}
        />
        <button className="btn btn-default" onClick={onClick}>
          <Icon name="search" theme="none" />
        </button>
      </div>
    </div>
  );
};

export default SearchBox;
