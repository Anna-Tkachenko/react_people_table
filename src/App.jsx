import React, { useState } from 'react';

import cn from 'classnames';
import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma/css/bulma.css';
import './App.scss';

import peopleFromServer from './people.json';
import { Button } from './components/Button';

function getPeopleToRender(people, { sortKey, filterValue }) {
  let preparedPeople = [...people];

  const normalizedFilterValue = filterValue.trim().toLowerCase();

  if (filterValue !== '') {
    preparedPeople = preparedPeople.filter(person => (
      person.name.toLowerCase().includes(normalizedFilterValue)
    ));
  }

  if (sortKey !== '') {
    preparedPeople.sort((personA, personB) => {
      switch (sortKey) {
        case 'name':
        case 'sex': {
          return personA[sortKey].localeCompare(personB[sortKey]);
        }

        case 'born':
          return personA.born - personB.born;

        default:
          return 0;
      }
    });
  }

  return preparedPeople;
}

export const App = () => {
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [sortKey, setSortKey] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [selectedPeople, setSelectedPeople] = useState([]);

  const peopleToRender = getPeopleToRender(
    peopleFromServer,
    {
      sortKey,
      filterValue: inputValue,
    },
  );

  function isPersonSelected(person) {
    return selectedPeople.some(({ slug }) => slug === person.slug);
  }

  function handlePeopleSelect(person) {
    setSelectedPeople(
      (prevState) => [...prevState, person],
    );

    setSelectedPeople(
      (prevState) => [...prevState, person],
    );
  }

  function handlePeopleRemove(person) {
    setSelectedPeople(
      (prevState) => prevState.filter(
        ({ slug }) => slug !== person.slug,
      ),
    );
  }

  const selectedPersonInfo = `${selectedPerson?.name} is selected`;
  const selectedPersonEmptyInfo = 'No one is selected';

  return (
    <div className="box">
      <h1 className="title">
        {selectedPerson
          ? selectedPersonInfo
          : selectedPersonEmptyInfo}
      </h1>

      <input
        type="text"
        value={inputValue}
        onChange={(event) => {
          setInputValue(event.target.value);
        }}
      />

      <table className="table is-striped is-narrow">
        <thead>
          <tr>
            <th />

            <th
              onClick={() => {
                setSortKey('name');
              }}
            >
              name
            </th>

            <th
              onClick={() => {
                setSortKey('sex');
              }}
            >
              sex
            </th>

            <th
              onClick={() => {
                setSortKey('born');
              }}
            >
              born
            </th>
          </tr>
        </thead>

        <tbody>
          {peopleToRender.map(person => (
            <tr
              key={person.slug}
              className={cn({
                'has-background-warning': isPersonSelected(person),
              })}
            >
              <td>
                {isPersonSelected(person)
                  ? (
                    <Button
                      className="is-danger"
                      onClick={() => handlePeopleRemove(person)}
                    >
                      -
                    </Button>
                  )
                  : (
                    <Button
                      className="is-success"
                      onClick={() => handlePeopleSelect(person)}
                    >
                      +
                    </Button>
                  )}
              </td>
              <td
                className={cn({
                  'has-text-link': person.sex === 'm',
                  'has-text-danger': person.sex === 'f',
                })}
              >
                {person.name}
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
