import React from "react";
import { Table } from "reactstrap";

const ChallengeTable = props => {
  const tableItems = props.challenges.map((challenge, i) => {
    return (
      <tr key={i}>
        <th scope="row">{i}</th>
        <td onClick={() => props.onClick(challenge._id)} className="title">
          {challenge.title}
        </td>
        <td>{challenge.difficulty}</td>
      </tr>
    );
  });

  return (
    <Table>
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Difficulty</th>
        </tr>
      </thead>
      <tbody>{tableItems}</tbody>
    </Table>
  );
};

export default ChallengeTable;
