import {gql} from '@apollo/client';

export const FETCH_ALL_TASKS = gql`
  query {
    tasks(order_by: {created_at: desc}) {
      id
      title
      start_time
      end_time
      tags {
        id
        name
      }
    }
  }
`;
