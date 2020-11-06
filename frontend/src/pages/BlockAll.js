import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
  BlockSearch,
  BlockAllHead,
  BlockAllMain,
  BlockAllLoader,
} from "components";
import axios from "axios";

const BlockAllStyle = styled.section`
  padding-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BlockAll = ({ history }) => {
  const init = useRef(true);
  const [blockList, setBlockList] = useState([]);
  const [blockHeight, setBlockHeight] = useState(0);
  const [page, setPage] = useState(1);
  const [more, setMore] = useState(false);
  const [loading, setLoading] = useState(false);

  const load = async (page) => {
    setLoading(true);
    const list = await axios.get(`/block/list/${page}?type=block`);
    if (list.data.success === 1) {
      setBlockList(list.data.list);
      setBlockHeight(list.data.height);
      setMore(list.data.more);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (init.current) {
      load(1);
      init.current = false;
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <BlockAllStyle>
      <BlockSearch />
      <BlockAllHead
        setPage={setPage}
        blockHeight={blockHeight}
        page={page}
        more={more}
        load={load}
      />
      {loading ? (
        <BlockAllLoader />
      ) : (
        <BlockAllMain blockList={blockList} history={history} />
      )}
    </BlockAllStyle>
  );
};

export default BlockAll;