import "./App.css";
const axios = require("axios").default;

function App() {
  const btnClick = () => {     
    let producer_msg = [{ key: document.getElementById("emp_id").value, value: document.getElementById("emp_name").value }];
    axios
      .post("../../tshirt", producer_msg, { withCredentials: true })
      .then((res) => {    
        if (res.status === 200 && res.data.localeCompare("success")==0) {          
          alert("Produce a message successfully");
          document.getElementById("emp_id").value='';
          document.getElementById("emp_name").value='';
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="App">
      <label>Employee ID:</label>
      <input  type="text" name="emp_id" id="emp_id"/>
      <label>Employee Name:</label>
      <input  type="text" name="emp_name" id="emp_name"/>
      <button type="button" onClick={btnClick}>
        Produce
      </button>
    </div>
  );
}

export default App;
