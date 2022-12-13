//import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';



function Table(props) {
    //let table = props.tableData;
    console.log(props.tableData);


  return (
        <div className="container">
            <table className="table table-dark">
                <thead>
                <tr>
                    <th scope="col">Icon</th>
                    <th scope="col">Currency</th>
                    <th scope="col">Price</th>
                </tr>
                </thead>
                <tbody>
                    {props.tableData}
                </tbody>
            </table>
        </div>
  );
}

export default Table;
