import { useQuery } from '@apollo/client';

const usePagination = (...args) => {
  const { data, fetchMore, ...rest } = useQuery(...args);

  const keys = Object.keys(data || {});
  const edges = keys.length ? data[keys[0]].edges : [];
  const cursor = keys.length ? data[keys[0]].pageInfo : {
    startCursor: null,
    endCursor: null,
    hasPreviousPage: false,
    hasNextPage: false,
  };

  const updateQuery = (prev, { fetchMoreResult }) => {
    if (!fetchMoreResult) return prev;
    return fetchMoreResult;
  };

  const loadPrev = () => {
    fetchMore({
      variables: {
        before: cursor.startCursor,
      },
      updateQuery,
    });
  };

  const loadNext = () => {
    fetchMore({
      variables: {
        after: cursor.endCursor,
      },
      updateQuery,
    });
  };

  return { edges, cursor, loadPrev, loadNext, ...rest };
};

export default usePagination;
