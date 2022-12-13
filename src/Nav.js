import 'bootstrap/dist/css/bootstrap.min.css';
import {useState} from 'react';
import Table from './Table';

function Nav() {
  const handleKey = (e) => {

    setsearchbox(e.target.value);

    if ( e.which == 13 ) {
      e.preventDefault();
      //
      if (searchBox.length > 0) {
        pull_from_coingecho(tableData, searchBox);
      }
    }
  };

  const handleEmpty = (e) => {

    setsearchbox(e.target.value);

    if (e.target.value.length == 0) {
      setTableData([]);
      document.getElementById('error_display').innerHTML = '';
    }
  };

  const [searchBox, setsearchbox] = useState("");
  const [tableData, setTableData] = useState([{}]);

  function pull_from_coingecho(table_data, search_box) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', `https://api.coingecko.com/api/v3/search?query=${search_box}`);
    xhr.send();
  
    xhr.onload = function() {
      if (xhr.status != 200) { // analyze HTTP status of the response
        alert(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
        console.log(`Error ${xhr.status}: ${xhr.statusText}`);
      } else { // show the result
        //alert(`Done, got ${xhr.response.length} bytes`); // response is the server response
        table_data = JSON.parse(xhr.response).coins
        if (table_data.length === 0) {
          alert(`Invalid input ${search_box}`); // e.g. 404: Not Found
        }
        //console.log(table_data)
        table_data.forEach((element, index, array) => {
          xhr_loop_func(element, table_data);
          //console.log(element.id); // 100, 200, 300
          
      });
      }
    };
  };
  
  function xhr_loop_func(element, table_data) {
    
    let xhr_loop = new XMLHttpRequest();
    xhr_loop.open('GET', `https://api.coingecko.com/api/v3/simple/price?ids=${element.id}&vs_currencies=usd`);

      xhr_loop.onerror= function() {
          document.getElementById('error_display').innerHTML = 'Error fetching further entries due to API overload ';
          setTableData([]);
        };
      xhr_loop.send();
  
    xhr_loop.onload = function() {
      if (xhr_loop.status != 200) { // analyze HTTP status of the response
        console.log(`Error ${xhr_loop.status}: ${xhr_loop.statusText}`);
      } 

      else { 

        let coin_name = element.id;
        let price_of_coin = JSON.parse(xhr_loop.response)[coin_name].usd // 100, 200, 300
        element.price = price_of_coin;
        //console.log(element);
        delete element.id;
        delete element.api_symbol;
        delete element.large;
        delete element.market_cap_rank;
        
        setTableData(table_data);
        //append_to_coin_table([element]);

      }
    };
  };

  const DisplayData=tableData.map(
    (info)=>{
        //console.log();
        return(
            <tr>
                <td><img src={info.thumb} /></td>
                <td>{info.name} ({info.symbol})</td>
                <td>${info.price}</td>
            </tr>
        )
    }
  )

  return (
    <>
      <nav className="navbar bg-light">
          <div className="container-fluid">
            <a className="navbar-brand">Crypto Tracker</a>
            <form className="d-flex" role="search">
              <input className="form-control me-2" 
              placeholder="Search" aria-label="Search" onKeyDown={handleKey} onChange={handleEmpty} setsearchbox="true"></input>
            </form>
          </div>
      </nav>
      <br />
      <Table tableData={DisplayData}/>
    </>

  );
}

export default Nav;
