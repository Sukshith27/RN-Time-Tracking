const {gql} = require('@apollo/client');

export const ADD_TASK = gql`
  mutation AddTask($title: String!) {
    insert_tasks_one(object: {title: $title}) {
      id
      title
    }
  }
`;

export const CREATE_TASK_ADD_TAGS = gql`
  mutation CreateTaskAddTags(
    $title: String!
    $tags: [task_tag_insert_input!]!
  ) {
    insert_tasks_one(object: {title: $title, task_tags: {data: $tags}}) {
      created_at
      end_time
      id
      start_time
      tags {
        name
      }
    }
  }
`;

export const updateTask = (data) => gql`
  mutation UpdateTask(
    $id: Int!
    $endTime: timestamptz
    $startTime: timestamptz
    $title: String
  ) {
    update_tasks_by_pk(_set: ${data}, pk_columns: {id: $id}) {
      end_time
      id
      start_time
      title
    }
  }
`;
