import React, { memo, useCallback } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  onSelect: (todoId: number) => void;
  selectedTodo: Todo | null;
};

export const TodoList: React.FC<Props> = memo(({
  todos,
  onSelect,
  selectedTodo,
}) => {
  const iconClassName = useCallback((currentTodo: Todo): string => {
    return currentTodo === selectedTodo ? 'far fa-eye-slash' : 'far fa-eye';
  }, [selectedTodo]);

  const textClassName = useCallback((todoCompleted: boolean) => {
    return todoCompleted ? 'has-text-success' : 'has-text-danger';
  }, []);

  return (
    <table className="table is-narrow is-fullwidth">
      <thead>
        <tr>
          <th>#</th>
          <th>
            <span className="icon">
              <i className="fas fa-check" />
            </span>
          </th>
          <th>Title</th>
          <th> </th>
        </tr>
      </thead>

      <tbody>
        {todos.map(todo => (
          <tr
            key={todo.id}
            data-cy="todo"
            className={classNames({
              'has-background-info-light': todo === selectedTodo,
            })}
          >
            <td className="is-vcentered">{todo.id}</td>
            <td className="is-vcentered">
              {todo.completed && (
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              )}
            </td>
            <td className="is-vcentered is-expanded">
              <p className={textClassName(todo.completed)}>
                {todo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => onSelect(todo.id)}
              >
                <span className="icon">
                  <i className={iconClassName(todo)} />
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
});